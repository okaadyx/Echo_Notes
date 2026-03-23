import { FloatingButton, HeaderComponent, SearchButton } from "@/components/layout";
import { FolderComponent, NotesCard, PinnedCard } from "@/components/features/notes";
import { StarFull } from "@tamagui/lucide-icons";
import React from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, XStack, YStack } from "tamagui";
import { useNotes } from "@/hooks/use-notes";

export default function HomeScreen() {
  const { notes, isLoading } = useNotes();

  const sortedData = React.useMemo(() => {
    return [...notes].sort((a: any, b: any) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });
  }, [notes]);

  const pinnedData = React.useMemo(() => {
    return notes
      .filter((item: any) => item.is_favorite === true)
      .sort((a: any, b: any) => {
        const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
        const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
        return dateB - dateA;
      });
  }, [notes]);

  const hasPinned = pinnedData.length > 0;
  const starColor = hasPinned ? "$violet10" : "$gray8";

  return (
    <YStack flex={1} backgroundColor="$background">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }}>
          <HeaderComponent />
          <SearchButton />
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
