import { Clock } from "@tamagui/lucide-icons";
import React from "react";
import { Text, View, XStack, YStack } from "tamagui";

const PinnedCard = () => {
  return (
    <View
      backgroundColor={"#eff6ff"}
      height={150}
      padding={16}
      borderRadius={12}
    >
      <YStack justifyContent="space-between" gap={10}>
        <Text fontSize={24} fontWeight={"bold"} color={"black"}>
          Strategy Meeting
        </Text>
        <Text fontSize={18} color={"black"}>
          Key takeways from the session: focus on user retention and
          mobile-first experience
        </Text>
        <XStack gap={10} alignItems="center">
          <Clock size={20} color={"#a2b0c3"} />
          <Text color={"#a2b0c3"}>2 hour ago</Text>
        </XStack>
      </YStack>
    </View>
  );
};

export default PinnedCard;
