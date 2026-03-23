import { Mic } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import React from "react";
import { YStack } from "tamagui";

const FloatingButton = () => {
  return (
    <YStack
      position="absolute"
      bottom={90}
      right={25}
      backgroundColor="$blue10"
      width={60}
      height={60}
      borderRadius={30}
      justifyContent="center"
      alignItems="center"
      elevation={6}
      pressStyle={{ scale: 0.95 }}
      onPress={() => router.push("/screens/recording")}
    >
      <Mic color="white" />
    </YStack>
  );
};

export default FloatingButton;
