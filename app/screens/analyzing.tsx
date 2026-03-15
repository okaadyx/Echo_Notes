import AnalyzingComponent from "@/components/AnalyzingComponent";
import PreviewComponent from "@/components/PreviewComponent";
import { api } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Button, Text, YStack } from "tamagui";

export default function analyzing() {
  const params = useLocalSearchParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["preview"],
    queryFn: () => api.ai.generateNotes(params.uri as string),
    enabled: !!params.uri,
  });

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
      <YStack flex={1} justifyContent="center" alignItems="center" padding={24} backgroundColor="#000">
        <Text color="#ff4d4d" fontSize={20} fontWeight="bold" marginBottom={12}>
          Analysis Failed
        </Text>
        <Text color="gray" textAlign="center" marginBottom={24}>
          {(error as any)?.message || "An unexpected error occurred while analyzing the audio."}
        </Text>
        <Button backgroundColor="#4F46E5" onPress={() => router.back()}>
          <Text color="white">Go Back</Text>
        </Button>
      </YStack>
    );
  }

  if (!data) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" padding={24} backgroundColor="#000">
        <Text color="white" fontSize={18} marginBottom={24}>
          No data was returned from the analysis.
        </Text>
        <Button backgroundColor="#4F46E5" onPress={() => router.back()}>
          <Text color="white">Go Back</Text>
        </Button>
      </YStack>
    );
  }

  return <PreviewComponent note={data} onSave={() => null} />;
}
