import {
  AlertTriangle,
  Check as CheckIcon,
  MicOff,
  Sparkles,
} from "@tamagui/lucide-icons";
import React, { useState } from "react";
import { Button, Checkbox, Circle, Text, XStack, YStack } from "tamagui";

export default function DeleteAccountScreen() {
  const [checked, setChecked] = useState(false);

  return (
    <YStack flex={1} backgroundColor="$background" padding={16}>
      <YStack alignItems="center" marginTop={30}>
        <Circle size={70} backgroundColor="$gray3">
          <AlertTriangle size={30} color="$red9" />
        </Circle>
      </YStack>

      <Text marginTop={20} fontSize={24} fontWeight="700" color="$color">
        Delete Account
      </Text>

      <YStack
        marginTop={16}
        padding={16}
        borderRadius={16}
        backgroundColor="$blue2"
        borderLeftWidth={4}
        borderColor="$red9"
      >
        <Text fontWeight="600" color="$color">
          This action is permanent and cannot be undone.
        </Text>

        <Text fontSize={12} marginTop={6} color="$gray10">
          All your notes, recordings, and AI insights will be permanently
          deleted from our servers.
        </Text>
      </YStack>

      <XStack gap={10} marginTop={16}>
        <YStack
          flex={1}
          padding={12}
          borderRadius={12}
          backgroundColor="$gray2"
          alignItems="center"
        >
          <MicOff size={18} color="$gray10" />
          <Text fontSize={12} marginTop={6} color="$gray10">
            Audio Files
          </Text>
        </YStack>

        <YStack
          flex={1}
          padding={12}
          borderRadius={12}
          backgroundColor="$gray2"
          alignItems="center"
        >
          <Sparkles size={18} color="$gray10" />
          <Text fontSize={12} marginTop={6} color="$gray10">
            AI Summaries
          </Text>
        </YStack>
      </XStack>

      <XStack alignItems="center" gap={10} marginTop={20}>
        <Checkbox
          checked={checked}
          onCheckedChange={(val) => setChecked(!!val)}
        >
          <Checkbox.Indicator>
            <CheckIcon color={"$white"} />
          </Checkbox.Indicator>
        </Checkbox>

        <Text flex={1} fontSize={13} color="$gray10">
          I understand that my data will be permanently removed.
        </Text>
      </XStack>

      <Button
        marginTop={20}
        height={50}
        borderRadius={12}
        backgroundColor="$red9"
        disabled={!checked}
        opacity={checked ? 1 : 0.5}
      >
        <Text color="white" fontWeight="600">
          Delete My Account
        </Text>
      </Button>

      <Button
        marginTop={10}
        height={50}
        borderRadius={12}
        backgroundColor="$gray4"
      >
        <Text color="$color" fontWeight="600">
          Keep My Account
        </Text>
      </Button>

      <Text marginTop={16} fontSize={11} color="$gray9" textAlign="center">
        By deleting your account, you also forfeit any remaining subscription
        time. This request will be processed immediately.
      </Text>
    </YStack>
  );
}
