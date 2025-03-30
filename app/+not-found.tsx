import { Link, Stack } from "expo-router"
import React from "react"
import { useTranslation } from "react-i18next"
import { Text } from "react-native"

import { ThemedText } from "@/core/components/expo/ThemedText"
import { ThemedView } from "@/core/components/expo/ThemedView"

export default function NotFoundScreen() {
  const { t } = useTranslation()

  return (
    <>
      <Stack.Screen options={{ title: t("Tabs.NotFound.title") }} />
      <ThemedView className="">
        <ThemedText type="title">
          <Text>{t("Tabs.NotFound.message")}</Text>
        </ThemedText>
        <Link href="/" className="">
          <ThemedText type="link">
            <Text>{t("Tabs.NotFound.cta.home")}</Text>
          </ThemedText>
        </Link>
      </ThemedView>
    </>
  )
}
