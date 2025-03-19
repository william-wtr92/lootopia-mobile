import * as Location from "expo-location"
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import MapView, { type Camera } from "react-native-maps"

export default function MapScreen() {
  const [camera, setCamera] = useState<Camera | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    const getCurrentLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied")

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
  }, [])

  if (errorMsg) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{errorMsg}</Text>
      </View>
    )
  }

  if (!camera) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading map...</Text>
      </View>
    )
  }

  return (
    <View className="flex-1">
      <MapView
        style={styles.map}
        camera={camera}
        mapType="satellite"
        showsUserLocation={true}
        showsBuildings={true}
        pitchEnabled={true}
        rotateEnabled={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})
