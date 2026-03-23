import React, { useEffect } from "react";
import { ScrollView, YStack, Spinner, Text } from "tamagui";
import { ExploreHeader, FloatingButton as ExploreFAB } from "@/components/layout";
import { CategoryTabs, EnhancedNoteCard } from "@/components/features/notes";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mic } from "@tamagui/lucide-icons";
import { formatTimeAgo } from "@/lib/dateUtils";
import { useLocalSearchParams } from "expo-router";
import { useNotes } from "@/hooks/use-notes";

export default function TabTwoScreen() {
  const params = useLocalSearchParams();
  const {
    notes,
    categories,
    activeFolderId,
    sortBy,
    isLoading,
    toggleSort,
    selectFolder,
    deleteNote,
    setActiveFolderId,
  } = useNotes(params.folderId ? Number(params.folderId) : "all");

  useEffect(() => {
    if (params.folderId) {
      setActiveFolderId(Number(params.folderId));
    } else {
      setActiveFolderId("all");
    }
  }, [params.folderId]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <YStack flex={1} backgroundColor="$background">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          <ExploreHeader sortBy={sortBy} onSort={toggleSort} />
          <CategoryTabs 
            categories={categories} 
            activeCategoryId={activeFolderId} 
            onSelectCategory={selectFolder} 
          />
          
          {isLoading ? (
            <YStack padding={50} alignItems="center" justifyContent="center">
              <Spinner size="large" color="$blue10" />
            </YStack>
          ) : (
            <YStack gap={5}>
              {notes.map((note: any) => (
                <EnhancedNoteCard 
                  key={note.id} 
                  id={note.id}
                  title={note.title || "Untitled"}
                  summary={note.summary || note.transcript || "No content available"}
                  date={formatTimeAgo(note.created_at)}
                  tags={note.tags || []}
                  isPinned={note.is_favorite}
                  accentColor={note.is_favorite ? "$blue10" : undefined}
                  icon={note.transcript ? Mic : undefined}
                  onDelete={() => deleteNote(note.id)}
                />
              ))}
              {notes.length === 0 && (
                <Text textAlign="center" color="$color10" padding={40}>
                  No notes found in this folder.
                </Text>
              )}
            </YStack>
          )}
        </ScrollView>
        <ExploreFAB />
      </YStack>
    </SafeAreaView>
  );
}
