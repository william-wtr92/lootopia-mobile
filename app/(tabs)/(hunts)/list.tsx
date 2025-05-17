import {
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { router } from "expo-router"
import { Map } from "lucide-react-native"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native"

import HuntStatusSelect from "@/core/components/app/features/hunts/HuntStatusSelect"
import { getParticipatedHunts } from "@/core/services/hunts/getParticipatedHunts"
import { useHuntStore } from "@/core/store/useHuntStore"
import { defaultPage } from "@/core/types/global/pagination"
import {
  type HuntParticipationStatus,
  huntParticipationStatus,
  type Hunt,
} from "@/core/types/hunts/participations"
import { routes } from "@/core/utils/routes"

export default function HuntListScreen() {
  const { t } = useTranslation()
  const { setHuntId, setHuntName } = useHuntStore()
  const queryClient = useQueryClient()

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<HuntParticipationStatus>(
    huntParticipationStatus.started
  )

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["participatedHunts"],
    queryFn: async ({ pageParam = defaultPage }) => {
      return await getParticipatedHunts({
        page: pageParam,
        search,
        status: statusFilter,
      })
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.result.length === defaultPage) {
        return undefined
      }

      const isLastPage = lastPage.lastPage <= allPages.length - 1

      return isLastPage ? undefined : allPages.length
    },
    initialPageParam: defaultPage,
    enabled: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["participatedHunts"] })
  }, [search, statusFilter, queryClient])

  const hunts = data?.pages.flatMap((page) => page?.result ?? []) ?? []

  const handleSetHunt = (hunt: Hunt) => {
    setHuntId(hunt.id)
    setHuntName(hunt.name)
    router.push(routes.app.map)
  }

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  const handleSearch = () => {
    refetch()
  }

  const isStarted = (date: string) => new Date(date) < new Date()

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{t("Tabs.Hunts.loading")}</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <View className="px-4 pt-24 pb-4 bg-white dark:bg-neutral-900 z-10">
        <View className="flex-row items-center justify-center mb-4 gap-4">
          <Map size={24} color="#4A0E4E" />
          <Text className="font-bold text-primary italic text-xl">
            {t("Tabs.Hunts.title")}
          </Text>
        </View>
        <View className="mb-4 flex-row items-center gap-2">
          <View className="flex-1 mr-2">
            <TextInput
              className="bg-white px-4 py-2 rounded-md border border-gray-300 shadow-sm"
              placeholder={t("Tabs.Hunts.search")}
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
          </View>

          <HuntStatusSelect value={statusFilter} onChange={setStatusFilter} />
        </View>
      </View>

      <FlatList
        data={hunts}
        keyExtractor={(item) => item.hunts.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        renderItem={({ item }) => {
          const started = isStarted(item.hunts.startDate)

          const containerStyle = started ? "bg-violet-100" : "bg-gray-100"

          const textColor = started ? "text-violet-800" : "text-gray-500"

          const badgeColor = started ? "bg-violet-200" : "bg-gray-200"

          const content = (
            <View
              className={`${containerStyle} m-2 p-4 rounded-2xl shadow-sm opacity-${started ? "100" : "60"}`}
            >
              <View className="flex-row items-center justify-between">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className={`text-xl font-bold ${textColor} max-w-[70%]`}
                >
                  {item.hunts.name}
                </Text>

                <Text
                  className={`text-xs text-primary/80 font-semibold ${badgeColor} rounded-full px-2 py-1`}
                >
                  {started
                    ? t("Tabs.Hunts.info.started")
                    : t("Tabs.Hunts.info.commingSoon")}
                </Text>
              </View>

              <Text className="text-gray-600 text-sm mt-1">
                {item.hunts.city} •{" "}
                {new Date(item.hunts.startDate).toLocaleDateString()} -{" "}
                {new Date(item.hunts.endDate).toLocaleDateString()}
              </Text>

              <Text className="text-gray-800 mt-2" numberOfLines={2}>
                {item.hunts.description}
              </Text>
            </View>
          )

          return started ? (
            <TouchableOpacity onPress={() => handleSetHunt(item.hunts)}>
              {content}
            </TouchableOpacity>
          ) : (
            content
          )
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="flex-1"
      />
    </View>
  )
}
