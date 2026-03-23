import { api } from "@/services";
import { User } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { Text, XStack, YStack } from "tamagui";

const HeaderComponent = () => {
  const { data = [] } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.user.getUser(),
  });
  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      marginBottom={25}
    >
      <YStack gap={2}>
        <Text fontSize={22} fontWeight="800" color="$color">
          Hello, {data?.name}
        </Text>
        <Text fontSize={14} color="$gray11" fontWeight="500">
          Ready to capture your thoughts?
        </Text>
      </YStack>
      <YStack
        width={50}
        height={50}
        borderRadius={25}
        backgroundColor="$backgroundFocus"
        alignItems="center"
        justifyContent="center"
        borderWidth={1}
        borderColor="$borderColor"
        onPress={() => router.push("/screens/settings")}
      >
        {data?.avatar_url?.length !== 0 ? (
          <Image
            source={{ uri: data?.avatar_url }}
            style={{ height: 40, width: 40, borderRadius: 50 }}
          />
        ) : (
          <User size={26} color="$blue10" />
        )}
      </YStack>
    </XStack>
  );
};

export default HeaderComponent;
