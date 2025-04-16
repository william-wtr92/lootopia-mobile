import { Redirect } from "expo-router"
import { useEffect, useState } from "react"

import { useAuthStore } from "@/core/store/useAuthStore"

const Index = () => {
  const { isAuthenticated, checkAuth } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAuth = async () => {
      await checkAuth()
      setLoading(false)
    }

    fetchAuth()
  }, [checkAuth])

  if (loading) {
    return
  }

  return (
    <Redirect
      href={isAuthenticated ? "/(tabs)/(hunts)/list" : "/(tabs)/(auth)/login"}
    />
  )
}
export default Index
