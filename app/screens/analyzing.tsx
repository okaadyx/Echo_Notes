import { AnalyzingComponent, PreviewComponent } from "@/components/features/ai";
import { queryClient } from "@/lib/QueryClient";
import { api } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { ToastAndroid } from "react-native";
import { Button, Text, YStack } from "tamagui";

export default function analyzing() {
  const params = useLocalSearchParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["preview", params.uri],
    queryFn: () => api.ai.generateNotes(params.uri as string),
    enabled: !!params.uri,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
  });

  const handleSave = async () => {
    const response = await api.notes.createNotes(data);
    if (response) {
      ToastAndroid.showWithGravity(
        "Notes save Successfully",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    } else {
      ToastAndroid.showWithGravity(
        "Something went Wrong",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  useEffect(() => {
    if (isError) {
      console.error("Failed to generate notes:", error);
    }
  }, [isError, error]);

  if (isLoading) {
    return <AnalyzingComponent />;
  }

  if (isError) {
    return (
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        padding={24}
        backgroundColor="$background"
      >
        <Text color="$red10" fontSize={20} fontWeight="bold" marginBottom={12}>
          Analysis Failed
        </Text>
        <Text color="$color05" textAlign="center" marginBottom={24}>
          {(error as any)?.response?.data?.message ||
            (error as any)?.message ||
            "An unexpected error occurred while analyzing the audio."}
        </Text>
        <Button backgroundColor="$blue10" onPress={() => router.back()}>
          <Text color="white">Go Back</Text>
        </Button>
      </YStack>
    );
  }

  if (!data) {
    return (
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        padding={24}
        backgroundColor="$background"
      >
        <Text color="$color" fontSize={18} marginBottom={24}>
          No data was returned from the analysis.
        </Text>
        <Button backgroundColor="$blue10" onPress={() => router.back()}>
          <Text color="white">Go Back</Text>
        </Button>
      </YStack>
    );
  }

  return (
    <PreviewComponent
      note={data}
      audioUri={params.uri as string}
      onSave={handleSave}
    />
  );
}
