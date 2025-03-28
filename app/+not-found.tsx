import { Link, Stack } from "expo-router"
import React from "react"
import { Text } from "react-native"

import { ThemedText } from "@/core/components/expo/ThemedText"
import { ThemedView } from "@/core/components/expo/ThemedView"

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView className="">
        <ThemedText type="title">
          <Text>This screen doesn't exist.</Text>
        </ThemedText>
        <Link href="/" className="">
          <ThemedText type="link">
            <Text>Go to home screen</Text>
          </ThemedText>
        </Link>
      </ThemedView>
    </>
  )
}
