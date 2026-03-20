import { formatTimeAgo } from "@/lib/dateUtils";
import { Clock } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import React from "react";
import { Text, View, XStack, YStack } from "tamagui";

interface PinnedProps {
  id: string;
  title: string;
  summary: string;
  created_at?: string;
  updated_at?: string;
}

interface Props {
  item: PinnedProps;
}

const PinnedCard = ({ item }: Props) => {
  return (
    <View
      backgroundColor={"$backgroundFocus"}
      minHeight={140}
      padding={16}
      borderRadius={12}
      borderWidth={1}
      borderColor="$borderColor"
      overflow="hidden"
      onPress={() =>
        router.push({
          pathname: "/notes/[id]",
          params: { id: item.id },
        })
      }
    >
      <YStack flex={1} justifyContent="space-between" gap={10}>
        <Text
          fontSize={18}
          fontWeight={"bold"}
          color={"$color"}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text color={"$color05"} numberOfLines={3}>
          {item.summary}
        </Text>
        <XStack gap={10} alignItems="center">
          <Clock size={20} color={"$color05"} />
          <Text color={"$color05"}>{formatTimeAgo(item.updated_at)}</Text>
        </XStack>
      </YStack>
    </View>
  );
};

export default PinnedCard;
