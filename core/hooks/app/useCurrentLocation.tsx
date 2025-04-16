import * as Location from "expo-location"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { type Camera } from "react-native-maps"

export const useCurrentLocation = () => {
  const { t } = useTranslation()

  const [camera, setCamera] = useState<Camera | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    const getCurrentLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== "granted") {
        setErrorMsg(t("Hooks.useLocation.denied"))

        return
      }

      const location = await Location.getCurrentPositionAsync({})

      setCamera({
        center: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        pitch: 70,
        heading: 0,
        altitude: 200,
        zoom: 18,
      })
    }

    getCurrentLocation()
  }, [t])

  return { camera, errorMsg }
}
