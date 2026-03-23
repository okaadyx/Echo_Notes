import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, ScrollView, Text, YStack } from "tamagui";
import AISummary from "./AISummary";
import ActionItems from "./ActionItems";
import AudioPlayer from "./AudioPlayer";
import KeyPoints from "./KeyPoints";
import { NoteHeader, NoteInfo } from "@/components/layout";

type Props = {
  note: {
    title?: string;
    summary?: string;
    tags?: string[];
    action_items?: string[];
    key_points?: string[];
  };
  audioUri?: string;
  onSave?: () => void;
};

export default function PreviewComponent({ note, audioUri, onSave }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <YStack flex={1} backgroundColor="$background" paddingTop={insets.top}>
      <NoteHeader />

      <ScrollView flex={1}>
        <YStack padding={20} gap={24}>
          <NoteInfo title={note.title} tags={note.tags} />

          <AISummary summary={note.summary} />

          <ActionItems items={note.action_items} />

          <KeyPoints points={note.key_points} />

          <AudioPlayer uri={audioUri} />

          <Button
            backgroundColor="$blue10"
            borderRadius={16}
            height={56}
            onPress={onSave}
            pressStyle={{ opacity: 0.8 }}
            marginTop={8}
            marginBottom={32}
          >
            <Text fontWeight="700" fontSize={16} color="white">
              Save Note
            </Text>
          </Button>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
