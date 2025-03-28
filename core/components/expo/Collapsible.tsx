import { type PropsWithChildren, useState } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"

import { ThemedText } from "@/core/components/expo/ThemedText"
import { ThemedView } from "@/core/components/expo/ThemedView"
import { IconSymbol } from "@/core/components/expo/ui/IconSymbol"
import { Colors } from "@/core/constants/Colors"
import { useColorScheme } from "@/core/hooks/useColorScheme"

export const Collapsible = ({
  children,
  title,
}: PropsWithChildren & { title: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useColorScheme() ?? "light"

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
        />

        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  content: {
    marginLeft: 24,
    marginTop: 6,
  },
  heading: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
})
