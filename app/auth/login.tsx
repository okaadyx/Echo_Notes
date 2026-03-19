import { AntDesign } from "@expo/vector-icons";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { LogoIcon } from "@/components/core/LogoIcon";
import { router } from "expo-router";
import React, { useState } from "react";
import { Button, Input, Text, XStack, YStack } from "tamagui";

export default function LoginScreen() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      justifyContent="center"
      padding={20}
    >
      <YStack
        width="100%"
        maxWidth={360}
        padding={20}
        borderRadius={20}
        backgroundColor="$background"
      >
        <LogoIcon tag={"Welcome back, you've been missed!"} />

        <YStack gap={12}>
          <Text fontSize={12} color="$gray10">
            Full Name
          </Text>
          <Input
            placeholder="John Doe"
            placeholderTextColor="$placeholderColor"
            backgroundColor="$gray2"
            borderRadius={12}
            onChangeText={setEmail}
            height={45}
            borderWidth={1}
            borderColor="$borderColor"
            focusStyle={{
              borderColor: "$blue8",
            }}
          />

          <Text fontSize={12} color="$gray10">
            Email Address
          </Text>
          <Input
            value={email || ""}
            placeholder="name@example.com"
            placeholderTextColor="$placeholderColor"
            backgroundColor="$gray2"
            borderRadius={12}
            height={45}
            borderWidth={1}
            borderColor="$borderColor"
            focusStyle={{
              borderColor: "$blue8",
            }}
          />

          <Text fontSize={12} color="$gray10">
            Password
          </Text>
          <XStack position="relative" alignItems="center">
            <Input
              flex={1}
              value={password || ""}
              placeholder="••••••••"
              placeholderTextColor="$placeholderColor"
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              backgroundColor="$gray2"
              borderRadius={12}
              height={45}
              paddingRight={45}
              borderWidth={1}
              borderColor="$borderColor"
              focusStyle={{
                borderColor: "$blue8",
              }}
            />
            <Button
              position="absolute"
              right={0}
              height={45}
              width={45}
              backgroundColor="transparent"
              borderWidth={0}
              chromeless
              pressStyle={{ backgroundColor: "transparent", opacity: 0.7 }}
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

          <Button
            marginTop={10}
            height={48}
            borderRadius={14}
            backgroundColor="$blue9"
            pressStyle={{ scale: 0.97 }}
          >
            <Text color="white" fontWeight="600">
              Sign In
            </Text>
          </Button>

          <XStack
            alignItems="center"
            justifyContent="center"
            marginVertical={10}
          >
            <YStack flex={1} height={1} backgroundColor="$gray6" />
            <Text marginHorizontal={10} fontSize={12} color="$gray9">
              OR CONTINUE WITH
            </Text>
            <YStack flex={1} height={1} backgroundColor="$gray6" />
          </XStack>

          <Button
            height={45}
            borderRadius={12}
            backgroundColor="$background"
            borderWidth={1}
            borderColor="$borderColor"
            pressStyle={{ scale: 0.97 }}
            icon={<AntDesign name="google" size={18} color="$color" />}
          >
            <Text color="$color">Google</Text>
          </Button>

          <Text textAlign="center" fontSize={12} color="$gray10" marginTop={10}>
            {" Don't have an account? "}
            <Text
              color="$blue9"
              fontWeight="600"
              onPress={() => router.push("/auth/signup")}
            >
              Sign Up
            </Text>
          </Text>
        </YStack>
      </YStack>
    </YStack>
  );
}
