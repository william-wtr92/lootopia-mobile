import {
  type SymbolViewProps,
  type SymbolWeight,
  SymbolView,
} from "expo-symbols"
import type { StyleProp, ViewStyle } from "react-native"

export const IconSymbol = ({
  name,
  size = 24,
  color,
  style,
  weight = "regular",
}: {
  name: SymbolViewProps["name"]
  size?: number
  color: string
  style?: StyleProp<ViewStyle>
  weight?: SymbolWeight
}) => {
  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  )
}
