import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Redirect, useRouter } from "expo-router"
import { useTranslation } from "react-i18next"
import { Pressable, Text, View } from "react-native"

import { getUserLoggedIn } from "@/core/services/users/getUserLoggedIn"
import { useAuthStore } from "@/core/store/useAuthStore"
import type { UserSchema } from "@/core/types/users"
import { routes } from "@/core/utils/routes"

export default function ProfileScreen() {
  const { t } = useTranslation()

  const router = useRouter()
  const queryClient = useQueryClient()
  const { logout, isAuthenticated } = useAuthStore()

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserLoggedIn,
    enabled: isAuthenticated,
  })

  const userLoggedIn = user as UserSchema
  const birthdate =
    userLoggedIn?.birthdate &&
    new Date(userLoggedIn.birthdate).toLocaleDateString()

  const handleLogout = async () => {
    await logout()

    queryClient.invalidateQueries({ queryKey: ["user"] })

    router.push(routes.app.login)
  }

  if (!userLoggedIn) {
    return <Redirect href={routes.app.login} />
  }

  return (
    <View className="flex-1 justify-center mx-auto items-center gap-14">
      <Text className="text-3xl font-bold">
        {t("Tabs.Users.Profile.title")}
      </Text>

      <View className="flex flex-col gap-2 justify-center items-center">
        <Text>
          {t("Tabs.Users.Profile.email", { email: userLoggedIn.email })}
        </Text>
        <Text>{t("Tabs.Users.Profile.birthdate", { birthdate })}</Text>
        <Text>
          {t("Tabs.Users.Profile.nickname", {
            nickname: userLoggedIn.nickname,
          })}
        </Text>
        <Text>
          {t("Tabs.Users.Profile.phone", { phone: userLoggedIn.phone })}
        </Text>
      </View>

      <Pressable
        className="bg-blue-500 rounded-md p-4 w-2/3 items-center active:bg-blue-700 mx-auto"
        onPress={handleLogout}
      >
        <Text>{t("Tabs.Users.Profile.cta.logout")}</Text>
      </Pressable>
    </View>
  )
}
