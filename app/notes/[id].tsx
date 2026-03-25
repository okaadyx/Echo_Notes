import { AISummary, ActionItems, KeyPoints } from "@/components/features/ai";
import { NoteHeader, NoteInfo } from "@/components/layout";
import { api } from "@/services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, router } from "expo-router";
import React from "react";
import { ActivityIndicator, Platform, ToastAndroid, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, Text, YStack } from "tamagui";
import FolderSelector from "@/components/features/notes/FolderSelector";

import { Note } from "@/types";

export default function PreviewComponent() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => api.notes.getNote(Number(id)),
  });

  const handlePinnedNotes = async () => {
    try {
      const response = await api.notes.pinToggle(Number(id));
      queryClient.invalidateQueries({ queryKey: ["note", id] });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });

      if (Platform.OS === "android") {
        ToastAndroid.show(response?.message || "Success", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error toggling pin:", error);
    }
  };

  const handleFolderUpdate = async (folderId: number) => {
    try {
      await api.notes.updateNote(Number(id), {
        folder_id: folderId,
      });

      queryClient.invalidateQueries({ queryKey: ["note", id] });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });

      if (Platform.OS === "android") {
        ToastAndroid.show("Moved successfully", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error updating folder:", error);
    }
  };

  const handleDeleteNote = async () => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await api.notes.deleteNote(Number(id));
              queryClient.invalidateQueries({ queryKey: ["notes"] });
              queryClient.invalidateQueries({ queryKey: ["folders"] });
              router.back();
            } catch (error) {
              console.error("Error deleting note:", error);
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator size={"large"} color="#4f46e5" />
      </YStack>
    );
  }

  if (isError || !data) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center">
        <Text color="$red10">Error loading note</Text>
      </YStack>
    );
  }

  const activeFolderId = data.folder?.id || null;

  return (
    <YStack flex={1} backgroundColor="$background" paddingTop={insets.top}>
      <NoteHeader
        title="Note Detail"
        pinIcon={true}
        handlePinNote={handlePinnedNotes}
        isPinned={!!data.is_favorite}
        onDelete={handleDeleteNote}
      />

      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack padding={20} gap={24} paddingBottom={40}>
          <NoteInfo title={data.title} tags={data.tags} />

          <FolderSelector
            label="Location (Folder)"
            activeFolderId={activeFolderId}
            onSelectFolder={handleFolderUpdate}
          />

          <AISummary summary={data.summary} />

          <ActionItems items={data.action_items} />

          <KeyPoints points={data.key_points} />
        </YStack>
      </ScrollView>
    </YStack>
  );
}
