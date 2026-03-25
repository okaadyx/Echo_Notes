import { NoteOptionsModal, NotesCard } from "@/components/features/notes";
import { api } from "@/services";
import { Search } from "@tamagui/lucide-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { Text, YStack } from "tamagui";
import { Note } from "@/types";

export default function SearchScreen() {
  const query = useSelector((state: any) => state.query.query);
  const queryClient = useQueryClient();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", query],
    queryFn: () => api.notes.searchNotes(query),
    enabled: !!query?.trim(),
  });

  const handleLongPress = (note: Note) => {
    setSelectedNote(note);
    setShowOptions(true);
  };

  const handlePin = async (id: number) => {
    try {
      await api.notes.pinToggle(id);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["search"] });
    } catch (error) {
      console.error("Error pinning note:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.notes.deleteNote(id);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      queryClient.invalidateQueries({ queryKey: ["search"] });
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  if (!query?.trim()) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" gap={10}>
        <Search size={80} color="$gray11" />
        <Text color="$gray11">Search notes, ideas, and memories</Text>
      </YStack>
    );
  }

  if (isLoading) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" gap={10}>
        <ActivityIndicator size="large" />
      </YStack>
    );
  }

  if (isError) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" gap={10}>
        <Text color="$red10">Error fetching search results</Text>
      </YStack>
    );
  }

  const notes = data || [];

  if (notes.length === 0) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" gap={10}>
        <Text color="$gray11">{`No notes found for "${query}"`}</Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1} padding={10}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NotesCard 
            item={item} 
            onLongPress={handleLongPress}
          />
        )}
        contentContainerStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={false}
      />
      <NoteOptionsModal
        visible={showOptions}
        onClose={() => setShowOptions(false)}
        note={selectedNote}
        onPin={handlePin}
        onDelete={handleDelete}
      />
    </YStack>
  );
}
