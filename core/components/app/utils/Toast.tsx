import { X } from "lucide-react-native"
import { useCallback, useEffect } from "react"
import { Text, View, Pressable } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"

import { cn } from "@/core/components/app/lib/utils"

type ToastProps = {
  type?: "default" | "success" | "error"
  message: string
  onClose?: () => void
}

export const Toast = ({ type = "default", message, onClose }: ToastProps) => {
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(-20)
  const progressWidth = useSharedValue(0)

  const handleCloseToast = useCallback(() => {
    opacity.value = withTiming(0, { duration: 300 })
    translateY.value = withTiming(-20, { duration: 300 }, () => {
      onClose?.()
    })
  }, [onClose, opacity, translateY])

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 })
    translateY.value = withTiming(0, { duration: 300 })
    progressWidth.value = withTiming(100, { duration: 3000 })

    const timer = setTimeout(() => {
      handleCloseToast()
    }, 3000)

    return () => clearTimeout(timer)
  }, [handleCloseToast, opacity, translateY, progressWidth])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }))

  return (
    <Animated.View
      style={animatedStyle}
      className={cn(
        "z-[9999] absolute top-20 w-3/4 self-center p-3 rounded-md shadow-md",
        type === "success" && "bg-green-500",
        type === "error" && "bg-red-500",
        type === "default" && "bg-gray-700"
      )}
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-white text-center flex-1">{message}</Text>

        <Pressable onPress={handleCloseToast} className="ml-2">
          <X size={20} color="white" />
        </Pressable>
      </View>

      <View className="w-full h-1 mt-2 relative top-2 bg-white/30 rounded-md overflow-hidden">
        <Animated.View
          style={progressStyle}
          className="h-full bg-white rounded-md"
        />
      </View>
    </Animated.View>
  )
}
