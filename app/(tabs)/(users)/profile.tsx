import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Redirect, useRouter } from "expo-router"
import { useTranslation } from "react-i18next"
import { Image, Pressable, Text, View } from "react-native"

import { getUserLoggedIn } from "@/core/services/users/getUserLoggedIn"
import { useAuthStore } from "@/core/store/useAuthStore"
import type { UserSchema } from "@/core/types/users"
import { config } from "@/core/utils/config"
import {
  defaultLevel,
  defaultXP,
  nextLevelXP,
  xpProgress,
} from "@/core/utils/helpers/levels"
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

  const userLoggedIn = user as UserSchema | undefined
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

  const currentLevel = userLoggedIn.progression.level ?? defaultLevel
  const currentXP = userLoggedIn.progression.experience ?? defaultXP
  const nextXP = nextLevelXP(currentLevel)
  const progressValue = xpProgress(currentXP, currentLevel)

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900 px-6">
      <View className="flex-1 justify-center">
        <View className="items-center mb-8">
          {userLoggedIn.avatar ? (
            <Image
              source={{ uri: config.blobUrl + userLoggedIn.avatar }}
              alt="Avatar"
              className="w-32 h-32 rounded-full mb-4"
              resizeMode="contain"
            />
          ) : (
            <View className="w-32 h-32 rounded-full bg-primary/Z0 dark:bg-primary mb-4 justify-center items-center">
              <Text className="text-3xl font-bold text-white">
                {userLoggedIn.nickname.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}

          <Text className="text-2xl font-bold text-neutral-900 dark:text-white">
            {userLoggedIn.nickname}
          </Text>
          <Text className="text-neutral-500 dark:text-neutral-300 text-sm mt-1">
            {userLoggedIn.email}
          </Text>
        </View>

        {userLoggedIn.progression && (
          <View className="bg-secondary/20 dark:bg-primary p-4 rounded-xl mb-6">
            <Text className="text-sm text-secondary dark:text-primaryBg font-semibold mb-1">
              {t("Tabs.Users.Profile.progression.level", {
                level: userLoggedIn.progression.level,
              })}
            </Text>
            <View className="w-full h-3 bg-secondary/30 dark:bg-primary/90 rounded-full overflow-hidden mb-1">
              <View
                className="h-full bg-secondary"
                style={{
                  width: `${progressValue}%`,
                }}
              />
            </View>
            <Text className="text-xs text-secondary dark:text-secondary/40 text-right">
              {t("Tabs.Users.Profile.progression.experience", {
                xp: userLoggedIn.progression.experience,
                nextLevel: nextXP,
              })}
            </Text>
          </View>
        )}

        <View className="gap-4 mb-10">
          <ProfileField
            label={t("Tabs.Users.Profile.birthdate")}
            value={birthdate}
          />
          <ProfileField
            label={t("Tabs.Users.Profile.phone")}
            value={userLoggedIn.phone}
          />
          <ProfileField
            label="Role"
            value={
              userLoggedIn.role === "admin"
                ? t("Tabs.Users.Profile.role.admin")
                : t("Tabs.Users.Profile.role.user")
            }
          />
        </View>

        <Pressable
          onPress={handleLogout}
          className="bg-error p-4 rounded-xl items-center"
        >
          <Text className="text-white font-semibold">
            {t("Tabs.Users.Profile.cta.logout")}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const ProfileField = ({
  label,
  value,
}: {
  label: string
  value?: string | null
}) => {
  return (
    <View>
      <Text className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
        {label}
      </Text>
      <Text className="text-base text-neutral-900 dark:text-white font-medium">
        {value || "—"}
      </Text>
    </View>
  )
}
