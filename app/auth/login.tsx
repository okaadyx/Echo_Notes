import { LogoIcon } from "@/components/layout";
import { api } from "@/services";
import { AntDesign } from "@expo/vector-icons";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Button, Input, Text, XStack, YStack } from "tamagui";

export default function LoginScreen() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    if (!email?.trim() || !password?.trim()) {
      setError("Both fields are required");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const user = await api.user.login({ email, password });

      if (!user.status && !user.success) {
        setError(user.message || "Login failed");
        return;
      }
      router.replace("/(tabs)/explore");
    } catch (error: any) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack
          flex={1}
          justifyContent="center"
          paddingHorizontal={30}
          paddingVertical={40}
        >
          <Animated.View entering={FadeInDown.duration(800).delay(200)}>
            <LogoIcon tag={"Welcome back, you've been missed!"} />

            <YStack gap={15}>
              <YStack gap={6}>
                <Text
                  fontSize={13}
                  fontWeight="600"
                  color="$gray11"
                  marginLeft={4}
                >
                  Email Address
                </Text>
                <Input
                  value={email || ""}
                  placeholder="name@example.com"
                  placeholderTextColor="$gray8"
                  backgroundColor="$gray2"
                  borderRadius={14}
                  height={52}
                  px={16}
                  borderWidth={1}
                  borderColor="$gray4"
                  focusStyle={{
                    borderColor: "$blue9",
                    backgroundColor: "$gray1",
                  }}
                  onChangeText={setEmail}
                />
              </YStack>

              <YStack gap={6}>
                <Text
                  fontSize={13}
                  fontWeight="600"
                  color="$gray11"
                  marginLeft={4}
                >
                  Password
                </Text>
                <XStack position="relative" alignItems="center">
                  <Input
                    flex={1}
                    value={password || ""}
                    placeholder="••••••••"
                    placeholderTextColor="$gray8"
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                    backgroundColor="$gray2"
                    borderRadius={14}
                    height={52}
                    px={16}
                    paddingRight={50}
                    borderWidth={1}
                    borderColor="$gray4"
                    focusStyle={{
                      borderColor: "$blue9",
                      backgroundColor: "$gray1",
                    }}
                  />
                  <Button
                    position="absolute"
                    right={6}
                    height={40}
                    width={40}
                    backgroundColor="transparent"
                    borderWidth={0}
                    chromeless
                    pressStyle={{ backgroundColor: "$gray3", opacity: 0.7 }}
                    onPress={() => setShowPassword(!showPassword)}
                    icon={
                      showPassword ? (
                        <EyeOff size={20} color="$gray10" />
                      ) : (
                        <Eye size={20} color="$gray10" />
                      )
                    }
                  />
                </XStack>
              </YStack>
              {error && (
                <XStack justifyContent="center">
                  <Text color={"red"}>{error}</Text>
                </XStack>
              )}
              <Button
                marginTop={15}
                height={54}
                borderRadius={16}
                backgroundColor="$blue9"
                pressStyle={{ scale: 0.98, opacity: 0.9 }}
                onPress={handleLogin}
                disabled={isLoading}
                opacity={isLoading ? 0.7 : 1}
              >
                <Text color="white" fontWeight="700" fontSize={16}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Text>
              </Button>

              <XStack
                alignItems="center"
                justifyContent="center"
                marginVertical={20}
              >
                <YStack flex={1} height={1} backgroundColor="$gray5" />
                <Text
                  marginHorizontal={15}
                  fontSize={12}
                  color="$gray9"
                  fontWeight="500"
                >
                  OR CONTINUE WITH
                </Text>
                <YStack flex={1} height={1} backgroundColor="$gray5" />
              </XStack>

              <Button
                height={52}
                borderRadius={14}
                backgroundColor="white"
                borderWidth={1}
                borderColor="$gray4"
                pressStyle={{ scale: 0.98, backgroundColor: "$gray1" }}
                icon={<AntDesign name="google" size={20} color="#EA4335" />}
              >
                <Text color="$gray11" fontWeight="600">
                  Google
                </Text>
              </Button>

              <Text
                textAlign="center"
                fontSize={14}
                color="$gray10"
                marginTop={30}
              >
                {" Don't have an account? "}
                <Text
                  color="$blue9"
                  fontWeight="700"
                  onPress={() => router.push("/auth/signup")}
                >
                  Sign Up
                </Text>
              </Text>
            </YStack>
          </Animated.View>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
