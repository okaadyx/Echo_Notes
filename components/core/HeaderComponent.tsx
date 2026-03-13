import { User } from "@tamagui/lucide-icons";
import React from "react";
import { Text, View, XStack, YStack } from "tamagui";

const HeaderComponent = () => {
  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      marginBottom={20}
    >
      <YStack>
        <Text fontSize={20} fontWeight={"bold"}>
          Hello, Aady
        </Text>
        <Text>Ready to capture your thoughts?</Text>
      </YStack>
      <View
        height={50}
        width={50}
        borderRadius={50}
        backgroundColor={"gray"}
        alignItems="center"
        justifyContent="center"
      >
        <User size={30} />
      </View>
    </XStack>
  );
};

export default HeaderComponent;
