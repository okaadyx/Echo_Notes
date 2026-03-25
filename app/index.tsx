import { useNetInfo } from "@react-native-community/netinfo";
import { queryClient } from "@/lib/QueryClient";
import { api } from "@/services";
import { Mic, WifiOff } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useCallback, useState } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Text, YStack, XStack } from "tamagui";

export default function SplashScreen() {
  const { isConnected } = useNetInfo();
  const [isVerifying, setIsVerifying] = useState(false);
  
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);

  useEffect(() => {
    // Icon animation: fade in and scale up, then pulse
    opacity.value = withTiming(1, { duration: 800 });
    scale.value = withSequence(
      withTiming(1, { duration: 800, easing: Easing.out(Easing.back(1.5)) }),
      withRepeat(
        withTiming(1.1, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
        -1,
        true,
      ),
    );

    // Text animation: fade in and slide up with delay
    textOpacity.value = withDelay(500, withTiming(1, { duration: 800 }));
    textTranslateY.value = withDelay(
      500,
      withTiming(0, { duration: 800, easing: Easing.out(Easing.quad) }),
    );
  }, []);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  const checkLogin = useCallback(async () => {
    if (isVerifying) return;
    setIsVerifying(true);

    try {
      const token = await SecureStore.getItemAsync("token");

      if (!token) {
        router.replace("/auth/login");
        return;
      }

      // If we are offline, we just wait for connectivity listener to trigger this again
      if (isConnected === false) {
        setIsVerifying(false);
        return;
      }

      const user = await api.user.getUser();
      if (!user) {
        await SecureStore.deleteItemAsync("token");
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        router.replace("/auth/login");
        return;
      }
      router.replace("/(tabs)");
    } catch (error: any) {
      // Handle explicit 401 Unauthorized errors
      if (error.response?.status === 401) {
        await SecureStore.deleteItemAsync("token");
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        router.replace("/auth/login");
        return;
      }
      
      // If network error occurred during fetch, we'll let the isConnected listener handle it
      console.log("Check login failed, likely network issue or server down", error.message);
    } finally {
      setIsVerifying(false);
    }
  }, [isConnected, isVerifying]);

  useEffect(() => {
    // Wait for splash animation minimum time
    const timer = setTimeout(() => {
      if (isConnected !== null) {
        checkLogin();
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [isConnected, checkLogin]);

  const loadingIndicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withRepeat(
          withTiming(40, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
          -1,
          true,
        ),
      },
    ],
  }));

  return (
    <YStack
      flex={1}
      backgroundColor="#1e1b4b"
      justifyContent="center"
      alignItems="center"
    >
      <YStack justifyContent="center" alignItems="center">
        <Animated.View style={animatedIconStyle}>
          <YStack
            width={100}
            height={100}
            borderRadius={24}
            backgroundColor="#4f46e5"
            justifyContent="center"
            alignItems="center"
            elevation={15}
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 10 }}
            shadowOpacity={0.3}
            shadowRadius={20}
          >
            <Mic size={42} color="white" />
          </YStack>
        </Animated.View>

        <Animated.View style={animatedTextStyle}>
          <YStack alignItems="center" marginTop={30}>
            <Text
              fontSize={32}
              fontWeight="800"
              color="white"
              letterSpacing={1}
            >
              EchoNotes
            </Text>
            <Text marginTop={8} fontSize={16} color="#c7d2fe" fontWeight="400">
              Turn voice into knowledge.
            </Text>
          </YStack>
        </Animated.View>

        <YStack marginTop={50} alignItems="center">
          {isConnected === false ? (
            <XStack
              backgroundColor="rgba(239, 68, 68, 0.1)"
              paddingHorizontal={16}
              paddingVertical={10}
              borderRadius={12}
              alignItems="center"
              gap={10}
              borderWidth={1}
              borderColor="rgba(239, 68, 68, 0.2)"
            >
              <WifiOff size={18} color="#ef4444" />
              <YStack>
                <Text color="white" fontWeight="600" fontSize={14}>
                  No Internet Connection
                </Text>
                <Text color="#94a3b8" fontSize={11}>
                  Reconnecting automatically...
                </Text>
              </YStack>
            </XStack>
          ) : (
            <YStack
              width={60}
              height={4}
              borderRadius={2}
              backgroundColor="#6366f1"
              overflow="hidden"
            >
              <Animated.View
                style={[
                  {
                    width: "40%",
                    height: "100%",
                    backgroundColor: "white",
                    borderRadius: 2,
                  },
                  loadingIndicatorStyle,
                ]}
              />
            </YStack>
          )}
        </YStack>
      </YStack>
    </YStack>
  );
}
