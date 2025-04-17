import { useQueryClient } from "@tanstack/react-query"
import { GLView } from "expo-gl"
import React, { useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native"
import ConfettiCannon from "react-native-confetti-cannon"
import MapView from "react-native-maps"

import ArtifactModal from "@/core/components/app/features/artifacts/ArtifactModal"
import HuntActions from "@/core/components/app/features/hunts/HuntActions"
import HuntBadge from "@/core/components/app/features/hunts/HuntBadge"
import CrownsBadge from "@/core/components/app/features/users/CrownBadge"
import { SC } from "@/core/constants/status"
import { useCurrentLocation } from "@/core/hooks/app/useCurrentLocation"
import { useHintCountdown } from "@/core/hooks/app/useHintCountdown"
import { useToast } from "@/core/providers/ToastProvider"
import { dig } from "@/core/services/hunts/dig"
import { hint } from "@/core/services/hunts/hint"
import { useHuntStore } from "@/core/store/useHuntStore"
import type { Reward } from "@/core/types/hunts/dig"
import { onContextCreateChest } from "@/core/utils/helpers/createChest"

export default function MapScreen() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const { camera, errorMsg } = useCurrentLocation()
  const { huntId } = useHuntStore()
  const { refreshHintStatus } = useHintCountdown({ huntId: huntId! })
  const qc = useQueryClient()

  const [chestVisible, setChestVisible] = useState(false)
  const [confettiShots, setConfettiShots] = useState<number[]>([])
  const [showArtifactModal, setShowArtifactModal] = useState(false)

  const [pendingReward, setPendingReward] = useState<Reward | null>(null)
  const [reward, setReward] = useState<Reward | null>(null)

  const glViewRef = useRef<GLView>(null)

  const handleDig = async () => {
    if (!huntId || !camera) {
      toast({
        type: "error",
        message: t("Tabs.Map.errors.notInHunt"),
      })

      return
    }

    const [status, key, rewards] = await dig(
      { huntId },
      {
        lng: camera?.center.longitude.toString() ?? "",
        lat: camera?.center.latitude.toString() ?? "",
      }
    )

    if (status !== SC.success.OK) {
      toast({
        type: "error",
        message: t(`Tabs.Map.errors.digging.${key}`),
      })

      return
    }

    setChestVisible(true)

    if (rewards) {
      setPendingReward(rewards)
    }

    qc.invalidateQueries({ queryKey: ["user"] })
  }

  const handleHint = async () => {
    if (!huntId || !camera) {
      toast({
        type: "error",
        message: t("Tabs.Map.errors.notInHunt"),
      })

      return
    }

    const [status, key, distance] = await hint(
      { huntId },
      {
        lng: camera?.center.longitude.toString() ?? "",
        lat: camera?.center.latitude.toString() ?? "",
      }
    )

    if (status !== SC.success.OK || !distance) {
      toast({
        type: "error",
        message: t(`Tabs.Map.errors.hint.${key}`),
      })

      return
    }

    refreshHintStatus()

    toast({
      type: "default",
      message: t("Tabs.Map.success.hint", {
        minDistance: distance.minDistance,
        maxDistance: distance.maxDistance,
      }),
    })

    qc.invalidateQueries({ queryKey: ["hintCount"] })
  }

  const handleChestClick = () => {
    setConfettiShots((prev) => [...prev, Date.now()])

    if (pendingReward) {
      setReward(pendingReward)
      setPendingReward(null)

      if (
        pendingReward.rewardType === "crown" &&
        pendingReward.reward != null
      ) {
        toast({
          type: "success",
          message: t("Tabs.Map.success.crowns", {
            amount: pendingReward.reward,
          }),
        })
      } else if (
        pendingReward.rewardType === "artifact" &&
        pendingReward.artifactId
      ) {
        toast({
          type: "success",
          message: t("Tabs.Map.success.artifact"),
        })

        const WAIT_TIME = 2000
        setTimeout(() => setShowArtifactModal(true), WAIT_TIME)
      }
    }

    setChestVisible(false)
  }

  const handleShowArtifactModal = () => {
    setShowArtifactModal((prev) => !prev)
  }

  if (errorMsg) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-error">{errorMsg}</Text>
      </View>
    )
  }

  if (!camera) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{t("Tabs.Map.loading")}</Text>
      </View>
    )
  }

  return (
    <View className="flex-1">
      {confettiShots.map((shot) => (
        <View
          key={shot}
          className="absolute top-0 left-0 right-0 bottom-0 z-[9999] pointer-events-none"
        >
          <ConfettiCannon
            count={100}
            origin={{ x: 200, y: 0 }}
            fadeOut
            explosionSpeed={350}
            fallSpeed={3000}
          />
        </View>
      ))}

      <View className="absolute top-20 right-0 z-50">
        <CrownsBadge />
      </View>

      <View className="absolute top-20 left-0 z-50">
        <HuntBadge />
      </View>

      <MapView
        style={styles.map}
        camera={camera}
        mapType="satellite"
        showsUserLocation
        showsBuildings
        pitchEnabled
        rotateEnabled
      />

      {chestVisible && (
        <TouchableWithoutFeedback onPress={handleChestClick}>
          <View className="absolute w-full h-96 top-[20%] z-50 bg-transparent">
            <GLView
              ref={glViewRef}
              style={styles.gl}
              onContextCreate={(context) => {
                onContextCreateChest(context)
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      )}

      <HuntActions onDig={handleDig} onHint={handleHint} />

      {reward?.rewardType === "artifact" && reward.artifactId && (
        <ArtifactModal
          visible={showArtifactModal}
          artifactId={reward.artifactId}
          onClose={handleShowArtifactModal}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  gl: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
})
