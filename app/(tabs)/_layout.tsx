import { useQuery } from "@tanstack/react-query"
import { Tabs } from "expo-router"
import { LogIn, Map, Swords, User } from "lucide-react-native"
import React, { useEffect } from "react"
import { Platform } from "react-native"

import { HapticTab } from "@/core/components/expo/HapticTab"
import TabBarBackground from "@/core/components/expo/ui/TabBarBackground"
import { Colors } from "@/core/constants/Colors"
import { useColorScheme } from "@/core/hooks/useColorScheme"
import { getUserLoggedIn } from "@/core/services/users/getUserLoggedIn"
import { useAuthStore } from "@/core/store/useAuthStore"
import { routes } from "@/core/utils/routes"

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const { isAuthenticated, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserLoggedIn,
    enabled: isAuthenticated,
  })

  const isUserLoggedIn = user != null

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="(map)/index"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => <Map size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(hunts)/list"
        options={{
          title: "Hunts",
          tabBarIcon: ({ color }) => <Swords size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="(auth)/login"
        options={{
          href: !isAuthenticated ? routes.app.login : null,
          title: "Login",
          tabBarIcon: ({ color }) => <LogIn size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="(users)/profile"
        options={{
          href:
            isAuthenticated && isUserLoggedIn ? routes.app.users.profile : null,
          title: "Profile",
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
        }}
      />
    </Tabs>
  )
}
