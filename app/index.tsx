import { api } from "@/services";
import { Mic } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Text, YStack } from "tamagui";
export default function SplashScreen() {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.1, { duration: 1200 }), -1, true);
    opacity.value = withRepeat(withTiming(1, { duration: 1200 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (!token) {
          router.replace("/auth/login");
        }
        const user = await api.user.getUser();
        if (!user.status) {
          router.replace("/auth/login");
        }
        router.replace("/(tabs)");
      } catch (error) {
        router.replace("/auth/login");
        //   console.log("Error checking login:", error);
      }
    };
    checkLogin();
  }, []);

  return (
    <YStack
      flex={1}
      backgroundColor="#1e1b4b"
      justifyContent="center"
      alignItems="center"
    >
      {/* Center Content */}
      <YStack justifyContent="center" alignItems="center">
        {/* Icon Container */}
        <Animated.View style={animatedStyle}>
          <YStack
            width={80}
            height={80}
            borderRadius={20}
            backgroundColor="#4f46e5"
            justifyContent="center"
            alignItems="center"
            elevation={10}
          >
            <Mic size={34} color="white" />
          </YStack>
        </Animated.View>

        {/* App Name */}
        <Text marginTop={20} fontSize={26} fontWeight="700" color="white">
          EchoNotes
        </Text>

        {/* Subtitle */}
        <Text marginTop={6} fontSize={14} color="#c7d2fe">
          Turn voice into knowledge.
        </Text>

        {/* Loading Indicator */}
        <YStack
          marginTop={30}
          width={40}
          height={4}
          borderRadius={2}
          backgroundColor="#6366f1"
          opacity={0.5}
        />
      </YStack>
    </YStack>
  );
}
