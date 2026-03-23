import { api } from "@/services";
import { Eye, EyeOff, Shield } from "@tamagui/lucide-icons";
import React, { useState } from "react";
import { ActivityIndicator, Alert, ToastAndroid } from "react-native";
import { Button, Circle, Input, Text, XStack, YStack } from "tamagui";

export default function ChangePasswordScreen() {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdatePassword = async () => {
    try {
      if (!password.trim() || !confirmPassword.trim()) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
      }

      if (password.length < 8) {
        Alert.alert("Error", "Password must be at least 8 characters long.");
        return;
      }

      setIsUpdating(true);

      await api.user.update({
        password,
      });

      ToastAndroid.show("Password Updated Successfully", ToastAndroid.SHORT);
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      Alert.alert("Error", "Failed to update password.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <YStack flex={1} backgroundColor="$background" padding={16}>
      <Text marginTop={6} fontSize={13} color="$gray10">
        Secure your account by updating your password regularly.
      </Text>

      <YStack marginTop={16}>
        <Text fontSize={12} color="$gray10" marginBottom={6}>
          New Password
        </Text>

        <InputField
          secure={!showNew}
          onToggle={() => setShowNew(!showNew)}
          value={password}
          setValue={setPassword}
        />

        <Text fontSize={11} color="$gray9" marginTop={4}>
          Must be at least 8 characters long.
        </Text>
      </YStack>

      <YStack marginTop={16}>
        <Text
          fontSize={12}
          color="$gray10"
          marginBottom={6}
        >
          Confirm New Password
        </Text>

        <InputField
          secure={!showConfirm}
          onToggle={() => setShowConfirm(!showConfirm)}
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
      </YStack>

      <Button
        marginTop={24}
        height={50}
        borderRadius={12}
        backgroundColor="$blue9"
        pressStyle={{ scale: 0.97 }}
        onPress={handleUpdatePassword}
        disabled={isUpdating}
      >
        {isUpdating ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text color="white" fontWeight="600">
            Update Password
          </Text>
        )}
      </Button>

      <Text textAlign="center" marginTop={12} color="$blue9" fontWeight="500">
        Cancel
      </Text>

      <YStack
        marginTop={30}
        padding={16}
        borderRadius={16}
        backgroundColor="$blue2"
      >
        <XStack alignItems="center" gap={10}>
          <Circle size={36} backgroundColor="$blue3">
            <Shield size={18} color="$blue9" />
          </Circle>

          <YStack>
            <Text fontWeight="600" color="$color">
              Security Recommendation
            </Text>

            <Text fontSize={12} color="$gray10">
              Avoid using common words and include a mix of symbols, numbers,
              and uppercase letters.
            </Text>
          </YStack>
        </XStack>
      </YStack>
    </YStack>
  );
}

function InputField({ secure, onToggle, value, setValue }: any) {
  return (
    <XStack
      alignItems="center"
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius={10}
      paddingHorizontal={12}
      height={48}
      backgroundColor="$background"
    >
      <Input
        flex={1}
        value={value}
        secureTextEntry={secure}
        placeholder="••••••••"
        placeholderTextColor="$placeholderColor"
        borderWidth={0}
        onChangeText={setValue}
        backgroundColor="transparent"
      />

      <Text onPress={onToggle}>
        {secure ? (
          <Eye size={18} color="#888" />
        ) : (
          <EyeOff size={18} color="#888" />
        )}
      </Text>
    </XStack>
  );
}
