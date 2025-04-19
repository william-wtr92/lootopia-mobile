import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native"
import { WebView } from "react-native-webview"

import { config } from "@/core/utils/config"
import { routes } from "@/core/utils/routes"

type Props = {
  visible: boolean
  onClose: () => void
  artifactId: string
}

const ArtifactModal = ({ visible, onClose, artifactId }: Props) => {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const [isLoading, setIsLoading] = useState(true)

  const handleTriggerLoading = (bool: boolean) => {
    setIsLoading(bool)
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View className="flex-1">
        <View className="p-4 bg-white border-b border-gray-300 flex-row justify-between items-center mt-14">
          <Text className="text-lg font-bold">
            {t("Components.Artifacts.ArtifactModal.title")}
          </Text>
          <Pressable
            onPress={onClose}
            className="bg-error px-3 py-1 rounded-md"
          >
            <Text className="text-white font-semibold">
              {t("Components.Artifacts.ArtifactModal.cta.close")}
            </Text>
          </Pressable>
        </View>

        <View className="flex-1 relative">
          {isLoading && (
            <View className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
              <ActivityIndicator size="large" color="#000" />
            </View>
          )}

          <WebView
            source={{
              uri: `${config.webviewUrl}/${locale}/${routes.webview.artifactsViewer(artifactId)}`,
            }}
            onLoadStart={() => handleTriggerLoading(true)}
            onLoadEnd={() => handleTriggerLoading(false)}
          />
        </View>
      </View>
    </Modal>
  )
}

export default ArtifactModal
