import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Camera } from 'react-native-maps';
import * as Location from 'expo-location';

export default function HomeScreen() {
  const [camera, setCamera] = useState<Camera | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCamera({
        center: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        pitch: 70,
        heading: 0,
        altitude: 200, 
        zoom: 18, 
      });
    }

    getCurrentLocation();
  }, []);

  if (errorMsg) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{errorMsg}</Text>
      </View>
    );
  }

  if (!camera) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <MapView
        style={{ flex: 1 }}
        camera={camera}
        mapType="satellite" 
        showsUserLocation={true}
        showsBuildings={true}
        pitchEnabled={true}
        rotateEnabled={true}
      />
    </View>
  );
}
