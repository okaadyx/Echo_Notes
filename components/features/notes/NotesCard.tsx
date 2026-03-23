import { formatTimeAgo } from "@/lib/dateUtils";
import { Mic } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import React from "react";
import { Text, View, XStack, YStack } from "tamagui";

interface Note {
  id: string;
  title: string;
  type?: string;
  created_at?: string;
}

interface NotesCardProps {
  item: Note;
}

const NotesCard = ({ item }: NotesCardProps) => {
  return (
    <XStack
      backgroundColor="$background"
      padding={16}
      borderRadius={12}
      borderWidth={1}
      borderColor="$borderColor"
      justifyContent="space-between"
      alignItems="center"
      onPress={() =>
        router.push({
          pathname: "/notes/[id]",
          params: { id: item.id },
        })
      }
    >
      <XStack flex={1} alignItems="center" gap={20}>
        <View
          height={50}
          width={50}
          borderRadius={16}
          backgroundColor="$orange3"
          alignItems="center"
          justifyContent="center"
        >
          <Mic color="$blue10" />
        </View>

        <YStack width={"70%"}>
          <Text
            fontSize={16}
            color="$color"
            fontWeight="bold"
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text color="$color05">{item.type ?? "Text note"}</Text>
        </YStack>
      </XStack>

      <Text color="$color05">{formatTimeAgo(item.created_at)}</Text>
    </XStack>
  );
};

export default React.memo(NotesCard);
