import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { Pressable, Text, TextInput, View } from "react-native"

import { SC } from "@/core/constants/status"
import { useToast } from "@/core/providers/ToastProvider"
import { login } from "@/core/services/auth/login"
import { useAuthStore } from "@/core/store/useAuthStore"
import { loginSchema, type LoginSchema } from "@/core/types/auth/login"
import { routes } from "@/core/utils/routes"

export default function LoginScreen() {
  const { toast } = useToast()
  const { setAuth } = useAuthStore()
  const router = useRouter()

  const { control, handleSubmit } = useForm<LoginSchema>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginSchema) => {
    const [status] = await login(data)

    if (status !== SC.success.OK) {
      toast({ type: "error", message: "Invalid credentials" })

      return
    }

    toast({ type: "success", message: "You are now logged in" })
    setAuth(true)
    router.push(routes.app.hunts)
  }

  return (
    <View className="flex-1 mx-auto justify-center gap-4 w-3/4 p-4">
      <Text className="font-bold text-3xl text-center">
        Bienvenue sur Lootpia !
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border-2 rounded-md p-4 w-full"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Email"
            autoCapitalize="none"
          />
        )}
        name="email"
        rules={{ required: "You must enter your email" }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border-2 rounded-md p-4 w-full"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
          />
        )}
        name="password"
        rules={{ required: "You must enter your password" }}
      />

      <Pressable
        className="bg-blue-500 rounded-md p-4 w-2/3 items-center active:bg-blue-700 mx-auto"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white font-bold text-lg">Se connecter</Text>
      </Pressable>
    </View>
  )
}
