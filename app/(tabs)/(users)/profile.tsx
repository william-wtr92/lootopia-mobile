import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { Pressable, Text, View } from "react-native"

import {
  getUserLoggedIn,
  type User,
} from "@/core/services/users/getUserLoggedIn"
import { useAuthStore } from "@/core/store/useAuthStore"
import { routes } from "@/core/utils/routes"

export default function ProfileScreen() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { logout, isAuthenticated } = useAuthStore()

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserLoggedIn,
    enabled: isAuthenticated,
  })

  const userLoggedIn = user as User

  const handleLogout = async () => {
    await logout()

    queryClient.invalidateQueries({ queryKey: ["user"] })

    router.push(routes.app.login)
  }

  return (
    <View className="flex-1 justify-center mx-auto items-center gap-14">
      <Text className="text-3xl font-bold">Profile</Text>

      <View className="flex flex-col gap-2 justify-center items-center">
        <Text>Email: {userLoggedIn.email}</Text>
        <Text>Birthdate: {userLoggedIn.birthdate}</Text>
        <Text>Nickname: {userLoggedIn.nickname}</Text>
        <Text>Phone: {userLoggedIn.phone}</Text>
      </View>

      <Pressable
        className="bg-blue-500 rounded-md p-4 w-2/3 items-center active:bg-blue-700 mx-auto"
        onPress={handleLogout}
      >
        <Text>Logout</Text>
      </Pressable>
    </View>
  )
}
