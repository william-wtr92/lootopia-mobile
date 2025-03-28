import * as SecureStore from "expo-secure-store"

export const getSecuredValue = async (key: string) => {
  const value = await SecureStore.getItemAsync(key)

  return value
}

export const setSecuredValue = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value)
}

export const deleteSecuredValue = async (key: string) => {
  await SecureStore.deleteItemAsync(key)
}
