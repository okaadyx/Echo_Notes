import { api } from "@/services";
import { User } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Text, XStack, YStack } from "tamagui";

const HeaderComponent = () => {
  const { data } = useQuery({
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
        <Text fontSize={26} fontWeight="800" color="$color">
          Hello, {data?.name}
        </Text>
        <Text fontSize={15} color="$gray11" fontWeight="500">
          Ready to capture your thoughts?
        </Text>
      </YStack>
      <YStack
        width={50}
        height={50}
        borderRadius={25}
        backgroundColor="$gray3"
        alignItems="center"
        justifyContent="center"
        borderWidth={1}
        borderColor="$gray5"
      >
        <User size={26} color="$blue9" />
      </YStack>
    </XStack>
  );
};

export default HeaderComponent;
