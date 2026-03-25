import { FloatingButton, HeaderComponent, SearchButton } from "@/components/layout";
import { FolderComponent, NotesCard, PinnedCard, Banner, NoteOptionsModal } from "@/components/features/notes";
import { StarFull } from "@tamagui/lucide-icons";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, XStack, YStack } from "tamagui";
import { useNotes } from "@/hooks/use-notes";
import { Note } from "@/types";

export default function HomeScreen() {
  const { pinnedNotes, recentNotes, isLoading, togglePin, deleteNote } = useNotes();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  const hasPinned = pinnedNotes.length > 0;
  const hasNotes = pinnedNotes.length > 0 || recentNotes.length > 0;
  const starColor = hasPinned ? "$violet10" : "$gray8";

  const handleLongPress = (note: Note) => {
    setSelectedNote(note);
    setShowOptions(true);
  };

  return (
    <YStack flex={1} backgroundColor="$background">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={{ padding: 16, gap: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <HeaderComponent />
          <SearchButton />
          <FolderComponent />

          {isLoading ? (
            <YStack padding="$10" alignItems="center" justifyContent="center">
              <ActivityIndicator size="large" color="$blue10" />
            </YStack>
          ) : (
            <>
              {!hasNotes && <Banner />}

              {hasPinned && (
                <YStack gap={20}>
                  <XStack gap={10} alignItems="center">
                    <StarFull color={starColor} />
                    <Text fontSize={24} fontWeight={"bold"} color="$color">
                      Pinned Notes
                    </Text>
                  </XStack>

                  <YStack gap={10}>
                    {pinnedNotes.map((item: Note) => (
                      <PinnedCard 
                        key={item.id} 
                        item={item} 
                        onLongPress={handleLongPress}
                      />
                    ))}
                  </YStack>
                </YStack>
              )}

              {hasNotes && (
                <>
                  <XStack gap={10} alignItems="center" marginBottom={10} marginTop={hasPinned ? 20 : 0}>
                    <Text fontSize={24} fontWeight={"bold"} color="$color">
                      Recent Notes
                    </Text>
                  </XStack>

                  {recentNotes.length !== 0 ? (
                    recentNotes.map((item: Note) => (
                      <NotesCard 
                        key={item.id} 
                        item={item} 
                        onLongPress={handleLongPress}
                      />
                    ))
                  ) : (
                    <XStack justifyContent="center" gap={10}>
                      <Text color="$color">No Recent Notes</Text>
                    </XStack>
                  )}
                </>
              )}
            </>
          )}
        </ScrollView>

        <FloatingButton />
        <NoteOptionsModal
          visible={showOptions}
          onClose={() => setShowOptions(false)}
          note={selectedNote}
          onPin={togglePin}
          onDelete={deleteNote}
        />
      </SafeAreaView>
    </YStack>
  );
}
