import { Crown, Lightbulb, Pickaxe } from "lucide-react-native"
import { useTranslation } from "react-i18next"
import { View, Text, TouchableOpacity } from "react-native"

import { useHintCountdown } from "@/core/hooks/app/useHintCountdown"
import { useHuntStore } from "@/core/store/useHuntStore"

type Props = {
  onDig: () => void
  onHint: () => void
}

const HuntActions = ({ onDig, onHint }: Props) => {
  const { t } = useTranslation()
  const { huntId } = useHuntStore()
  const { cooldown, count } = useHintCountdown({ huntId: huntId! })

  if (!huntId) {
    return null
  }

  const disabled = !!cooldown && cooldown > 0

  return (
    <View className="absolute bottom-32 w-full opacity-90 z-10 px-4">
      <View className="flex-row justify-between items-end gap-4">
        <TouchableOpacity
          onPress={onDig}
          className="flex-1 bg-accent px-6 py-2 rounded-full flex-col items-center justify-center gap-1"
        >
          <Pickaxe color="white" size={20} />
          <Text className="text-white font-semibold text-md">
            {t("Components.Hunts.HuntActions.actions.dig")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onHint}
          className={`flex-1 px-6 py-2 rounded-full flex-col items-center justify-center gap-1 ${
            disabled ? "bg-primaryBg/70" : "bg-primaryBg"
          }`}
          disabled={disabled}
        >
          <Lightbulb color="purple" size={20} />
          {disabled ? (
            <Text className="text-primary font-semibold text-md">
              {t("Components.Hunts.HuntActions.cooldown", {
                time: cooldown,
              })}
            </Text>
          ) : count >= 3 ? (
            <View className="flex-row items-center gap-1">
              <Crown color="gold" size={14} />
              <Text className="text-primary font-semibold text-md">
                {t("Components.Hunts.HuntActions.cost")}
              </Text>
            </View>
          ) : (
            <Text className="text-primary font-semibold text-md">
              {t("Components.Hunts.HuntActions.hintCount", {
                count: count,
              })}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HuntActions
