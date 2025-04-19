import { useState } from "react"
import { useTranslation } from "react-i18next"
import { View, Text, TouchableOpacity } from "react-native"

import {
  huntParticipationStatus,
  type HuntParticipationStatus,
} from "@/core/types/hunts/participations"

type Props = {
  value: HuntParticipationStatus
  onChange: (status: HuntParticipationStatus) => void
}

const HuntStatusSelect = ({ value, onChange }: Props) => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  return (
    <View className="relative w-28">
      <TouchableOpacity
        onPress={() => setOpen((prev) => !prev)}
        className="px-3 py-2.5 rounded-md border border-gray-300 bg-white"
      >
        <Text className="text-xs text-center">
          {value === huntParticipationStatus.started
            ? t("Components.Hunts.HuntStatusSelect.options.started")
            : t("Components.Hunts.HuntStatusSelect.options.upcoming")}
        </Text>
      </TouchableOpacity>

      {open && (
        <View className="absolute right-0 top-[110%] w-32 bg-white rounded-md border shadow-md z-50">
          <TouchableOpacity
            onPress={() => {
              onChange(huntParticipationStatus.started)
              setOpen(false)
            }}
            className="px-3 py-2"
          >
            <Text>
              {t("Components.Hunts.HuntStatusSelect.options.started")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onChange(huntParticipationStatus.upcoming)
              setOpen(false)
            }}
            className="px-3 py-2"
          >
            <Text>
              {t("Components.Hunts.HuntStatusSelect.options.upcoming")}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default HuntStatusSelect
