import { Map } from "lucide-react-native"
import { Text, View } from "react-native"

import { useHuntStore } from "@/core/store/useHuntStore"

const HuntBadge = () => {
  const { huntName } = useHuntStore()

  if (!huntName) {
    return null
  }

  return (
    <View className="flex-row items-center bg-primaryBg/80 dark:bg-yellow-200/ px-5 py-1 rounded-r-full shadow-sm">
      <Map color="#4A0E4E" size={24} />

      <View className="ml-2">
        <Text
          numberOfLines={1}
          className="text-xl font-semibold text-primary max-w-32"
        >
          {huntName}
        </Text>
      </View>
    </View>
  )
}

export default HuntBadge
