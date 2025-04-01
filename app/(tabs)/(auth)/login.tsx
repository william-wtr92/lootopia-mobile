import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Pressable, Text, TextInput, View } from "react-native"

import { SC } from "@/core/constants/status"
import { useToast } from "@/core/providers/ToastProvider"
import { login } from "@/core/services/auth/login"
import { useAuthStore } from "@/core/store/useAuthStore"
import { loginSchema, type LoginSchema } from "@/core/types/auth/login"
import { routes } from "@/core/utils/routes"

export default function LoginScreen() {
  const { t } = useTranslation()

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
    const [status, key] = await login(data)

    if (status !== SC.success.OK) {
      toast({
        type: "error",
        message: t(`Tabs.Auth.Login.errors.${key}`),
      })

      return
    }

    toast({
      type: "success",
      message: t("Tabs.Auth.Login.success"),
    })

    setAuth(true)
    router.push(routes.app.hunts)
  }

  return (
    <View className="flex-1 mx-auto justify-center gap-4 w-3/4 p-4">
      <Text className="font-bold text-3xl text-center">
        {t("Tabs.Auth.Login.title")}
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border-2 rounded-md p-4 w-full"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={t("Tabs.Auth.Login.form.email.placeholder")}
            autoCapitalize="none"
          />
        )}
        name="email"
        rules={{ required: t("Tabs.Auth.Login.form.email.error") }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border-2 rounded-md p-4 w-full"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={t("Tabs.Auth.Login.form.password.placeholder")}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        )}
        name="password"
        rules={{ required: t("Tabs.Auth.Login.form.password.error") }}
      />

      <Pressable
        className="bg-blue-500 rounded-md p-4 w-2/3 items-center active:bg-blue-700 mx-auto"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white font-bold text-lg">
          {t("Tabs.Auth.Login.form.submit")}
        </Text>
      </Pressable>
    </View>
  )
}
