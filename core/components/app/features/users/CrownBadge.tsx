import { useQuery } from "@tanstack/react-query"
import { Crown } from "lucide-react-native"
import { Text, View } from "react-native"

import { getUserLoggedIn } from "@/core/services/users/getUserLoggedIn"
import { formatCrowns } from "@/core/utils/helpers/formatCrowns"

const CrownsBadge = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserLoggedIn,
  })

  if (!user || typeof user === "string") {
    return null
  }

  return (
    <View className="flex-row items-center bg-accent dark:bg-yellow-200/ px-3 py-1 rounded-l-full shadow-sm">
      <Crown size={28} />
      <Text className="ml-2 text-xl font-semibold text-primary">
        {formatCrowns(user.crowns)}
      </Text>
    </View>
  )
}

export default CrownsBadge
