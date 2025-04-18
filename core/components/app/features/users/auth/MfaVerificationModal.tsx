import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { X } from "lucide-react-native"
import { useEffect, useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Modal, Pressable, Text, TextInput, View, Animated } from "react-native"

import { SC } from "@/core/constants/status"
import { useToast } from "@/core/providers/ToastProvider"
import { mfa } from "@/core/services/auth/mfa"
import { useAuthStore } from "@/core/store/useAuthStore"
import { mfaSchema, type MfaSchema } from "@/core/types/auth/mfa"
import { routes } from "@/core/utils/routes"

type Props = {
  visible: boolean
  onClose: () => void
  sessionId: string
}

const MfaVerificationModal = ({ visible, onClose, sessionId }: Props) => {
  const { t } = useTranslation()
  const slideAnim = useRef(new Animated.Value(500)).current
  const { toast } = useToast()
  const { setAuth } = useAuthStore()
  const router = useRouter()
  const qc = useQueryClient()

  const { control, handleSubmit, formState } = useForm<MfaSchema>({
    mode: "onChange",
    resolver: zodResolver(mfaSchema),
    defaultValues: {
      token: "",
    },
  })

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : 500,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }, [visible, slideAnim])

  const onSubmit = async (data: MfaSchema) => {
    const [status, key] = await mfa({ token: data.token, sessionId })

    if (status !== SC.success.OK) {
      toast({
        type: "error",
        message: t(`Components.Auth.MfaVerificationModal.errors.${key}`),
      })

      return
    }

    toast({
      type: "success",
      message: t("Components.Auth.MfaVerificationModal.success"),
    })

    setAuth(true)
    qc.invalidateQueries({ queryKey: ["user"] })
    qc.invalidateQueries({ queryKey: ["hunts"] })

    onClose()
    router.push(routes.app.hunts)
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 mb-10 justify-end bg-black/40">
        <Animated.View
          className="bg-white rounded-t-2xl p-6"
          style={{ transform: [{ translateY: slideAnim }] }}
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-primary">
              {t("Components.Auth.MfaVerificationModal.title")}
            </Text>
            <Pressable onPress={onClose}>
              <X size={24} color="#000" />
            </Pressable>
          </View>

          <Text className="text-neutral-600 mb-6">
            {t("Components.Auth.MfaVerificationModal.description")}
          </Text>

          <Controller
            control={control}
            name="token"
            render={({ field }) => (
              <TextInput
                className="border border-gray-300 rounded-lg p-4 text-lg tracking-widest text-center mb-4"
                placeholder="000000"
                keyboardType="number-pad"
                maxLength={6}
                onChangeText={(val) => field.onChange(val.replace(/\D/g, ""))}
                value={field.value}
              />
            )}
          />

          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={!formState.isValid || formState.isSubmitting}
            className={`p-4 rounded-lg ${
              formState.isValid ? "bg-primary" : "bg-gray-300"
            } items-center`}
          >
            <Text className="text-white font-bold">
              {t("Components.Auth.MfaVerificationModal.cta.submit")}
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  )
}

export default MfaVerificationModal
