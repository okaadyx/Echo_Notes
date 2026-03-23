import { Mic } from "@tamagui/lucide-icons";
import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Text, YStack } from "tamagui";

const AnimatedView = Animated.createAnimatedComponent(YStack);

export default function AnalyzingComponent() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, []);

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      justifyContent="space-between"
      alignItems="center"
      padding={30}
    >
      {/* Center Content */}
      <YStack flex={1} justifyContent="center" alignItems="center">
        {/* Fixed Center Container */}
        <YStack
          width={160}
          height={160}
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          {/* Outer Ring */}
          <YStack
            position="absolute"
            width={160}
            height={160}
            borderRadius={80}
            borderWidth={1}
            borderColor="$borderColor"
          />

          {/* Inner Ring */}
          <YStack
            position="absolute"
            width={120}
            height={120}
            borderRadius={60}
            borderWidth={1}
            borderColor="$borderColor"
            opacity={0.5}
          />

          {/* Rotating Progress Ring */}
          <AnimatedView
            position="absolute"
            width={140}
            height={140}
            borderRadius={70}
            borderWidth={3}
            borderColor="$blue10"
            borderTopColor="transparent"
            borderRightColor="transparent"
            style={rotateStyle}
          />

          {/* Mic Icon (centered layer) */}
          <Mic size={28} color="$blue10" />
        </YStack>

        {/* Title */}
        <Text marginTop={30} fontSize={18} fontWeight="600" color="$color">
          Analyzing your voice...
        </Text>

        {/* Subtitle */}
        <Text
          marginTop={8}
          fontSize={14}
          color="$color05"
          textAlign="center"
          maxWidth={240}
        >
          Our AI is processing the nuances of your recording
        </Text>
      </YStack>

      {/* Footer */}
      <Text marginBottom={10} fontSize={14} fontWeight="600" color="$blue10">
        EchoNotes
      </Text>
    </YStack>
  );
}
