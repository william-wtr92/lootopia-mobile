import { Text } from "react-native"

import ParallaxScrollView from "@/core/components/expo/ParallaxScrollView"
import { IconSymbol } from "@/core/components/expo/ui/IconSymbol"

export default function HuntListScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
        />
      }
    >
      <Text className="font-bold">Hunt List</Text>
    </ParallaxScrollView>
  )
}
