import FloatingButton from "@/components/core/FloatingButton";
import FolderComponent from "@/components/core/FolderComponent";
import HeaderComponent from "@/components/core/HeaderComponent";
import SearchComponent from "@/components/core/SearchComponent";
import NotesCard from "@/components/NotesCard";
import PinnedCard from "@/components/PinnedCard";
import { api } from "@/services";
import { StarFull } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, XStack, YStack } from "tamagui";

export default function HomeScreen() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: () => api.notes.getNotes(),
  });

  const sortedData = React.useMemo(() => {
    return [...data].sort((a: any, b: any) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });
  }, [data]);

  const pinnedData = React.useMemo(() => {
    return data
      .filter((item: any) => item.is_favorite === true)
      .sort((a: any, b: any) => {
        const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
        const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
        return dateB - dateA;
      });
  }, [data]);

  const hasPinned = pinnedData.length > 0;
  const starColor = hasPinned ? "$violet10" : "$gray8";

  return (
    <YStack flex={1} backgroundColor="$background">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }}>
          <HeaderComponent />
          <SearchComponent />
          <FolderComponent />

          {hasPinned && (
            <YStack gap={20}>
              <XStack gap={10} alignItems="center">
                <StarFull color={starColor} />
                <Text fontSize={24} fontWeight={"bold"} color="$color">
                  Pinned Notes
                </Text>
              </XStack>

              <YStack gap={10}>
                {pinnedData.map((item: any) => (
                  <PinnedCard key={item.id} item={item} />
                ))}
              </YStack>
            </YStack>
          )}

          <XStack gap={10} alignItems="center" marginBottom={10}>
            <Text fontSize={24} fontWeight={"bold"} color="$color">
              Recent Notes
            </Text>
          </XStack>

          {isLoading ? (
            <ActivityIndicator size={"large"} color={"$blue10"} />
          ) : sortedData.length !== 0 ? (
            sortedData.map((item: any) => <NotesCard key={item.id} item={item} />)
          ) : (
            <XStack justifyContent="center" gap={10}>
              <ActivityIndicator size={"small"} color={"$blue10"} />
              <Text color="$color">No Notes Available</Text>
            </XStack>
          )}
        </ScrollView>

        <FloatingButton />
      </SafeAreaView>
    </YStack>
  );
}
