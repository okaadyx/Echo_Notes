import React from "react";
import { YStack, XStack, Text, H2, Paragraph, Card } from "tamagui";
import { Mic, FileText, CheckCircle, Smartphone } from "@tamagui/lucide-icons";

const Banner = () => {
  return (
    <YStack
      elevation={5}
      borderWidth={1}
      padding="$5"
      borderRadius="$6"
      marginBottom="$5"
      backgroundColor="$blue2"
      borderColor="$blue4"
    >
      <YStack gap="$4">
        <YStack gap="$1">
          <XStack alignItems="center" gap="$2">
            <Smartphone size={24} color="$blue10" />
            <H2 color="$blue11" fontSize={28} fontWeight="900">
              EchoNotes
            </H2>
          </XStack>
          <Text fontSize={16} color="$gray11" fontStyle="italic">
            "Your thoughts, echoed and organized."
          </Text>
        </YStack>

        <YStack gap="$4">
          <Text fontWeight="800" fontSize={18} color="$color" letterSpacing={0.5}>
            How to Use EchoNotes:
          </Text>

          <XStack gap="$4" alignItems="center">
            <YStack
              backgroundColor="$blue4"
              padding="$3"
              borderRadius="$4"
              elevation={2}
            >
              <Mic size={22} color="$blue10" />
            </YStack>
            <YStack flex={1}>
              <Text fontWeight="700" fontSize={16} color="$color">
                1. Record Audio
              </Text>
              <Paragraph size="$2" color="$gray10" lineHeight={18}>
                Tap the microphone to capture meetings, lectures, or random thoughts.
              </Paragraph>
            </YStack>
          </XStack>

          <XStack gap="$4" alignItems="center">
            <YStack
              backgroundColor="$blue4"
              padding="$3"
              borderRadius="$4"
              elevation={2}
            >
              <FileText size={22} color="$blue10" />
            </YStack>
            <YStack flex={1}>
              <Text fontWeight="700" fontSize={16} color="$color">
                2. AI Transcription
              </Text>
              <Paragraph size="$2" color="$gray10" lineHeight={18}>
                Our AI instantly transcribes and summarizes your audio into neat notes.
              </Paragraph>
            </YStack>
          </XStack>

          <XStack gap="$4" alignItems="center">
            <YStack
              backgroundColor="$blue4"
              padding="$3"
              borderRadius="$4"
              elevation={2}
            >
              <CheckCircle size={22} color="$blue10" />
            </YStack>
            <YStack flex={1}>
              <Text fontWeight="700" fontSize={16} color="$color">
                3. Organize & Recall
              </Text>
              <Paragraph size="$2" color="$gray10" lineHeight={18}>
                Tag, folderize, and pin your notes to find exactly what you need, when you need it.
              </Paragraph>
            </YStack>
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  );
};

export default Banner;
