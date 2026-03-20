import { queryClient } from "@/lib/QueryClient";
import { api } from "@/services";
import {
  Bell,
  ChevronRight,
  Download,
  Lock,
  LogOut,
  User,
} from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Circle, Separator, Switch, Text, XStack, YStack } from "tamagui";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const insets = useSafeAreaInsets();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.user.getUser(),
  });

  const Logout = async () => {
    await SecureStore.deleteItemAsync("token");
    queryClient.invalidateQueries({
      queryKey: ["token"],
    });
    router.replace("/auth/login");
  };

  if (isLoading) {
    return (
      <YStack justifyContent="center" alignItems="center">
        <ActivityIndicator size={"large"} />
      </YStack>
    );
  }

  if (isError) {
    return (
      <YStack justifyContent="center" alignItems="center">
        <Text color={"red"}>Something Went Wrong</Text>
      </YStack>
    );
  }

  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      paddingHorizontal={16}
      paddingTop={insets.top || 16}
      paddingBottom={insets.bottom || 16}
    >
      {/* Header */}
      <XStack
        justifyContent="space-between"
        alignItems="center"
        marginBottom={20}
      >
        <Text fontSize={18} fontWeight="600" color="$color">
          Settings
        </Text>
        <Text color="$blue9" fontWeight="500">
          Edit
        </Text>
      </XStack>

      {/* Profile */}
      <YStack alignItems="center" marginBottom={30}>
        <YStack position="relative">
          {/* Avatar */}
          <Circle size={80} backgroundColor="$blue9">
            <Text color="white" fontSize={24} fontWeight="700">
              JD
            </Text>
          </Circle>

          {/* Online Indicator */}
          <Circle
            size={14}
            backgroundColor="$green9"
            position="absolute"
            bottom={4}
            right={4}
            borderWidth={2}
            borderColor="$background"
          />
        </YStack>

        <Text marginTop={10} fontSize={18} fontWeight="600" color="$color">
          {data?.name}
        </Text>

        <Text marginTop={4} fontSize={13} color="$gray10">
          {data?.email}
        </Text>

        <YStack
          marginTop={10}
          paddingHorizontal={12}
          paddingVertical={4}
          borderRadius={999}
          backgroundColor="$blue3"
        >
          <Text color="$blue9" fontSize={12} fontWeight="600">
            PREMIUM PLAN
          </Text>
        </YStack>
      </YStack>

      {/* ACCOUNT */}
      <Text color="$gray9" fontSize={12} marginBottom={8}>
        ACCOUNT
      </Text>

      <YStack
        backgroundColor="$background"
        borderRadius={16}
        padding={10}
        borderWidth={1}
        borderColor="$borderColor"
      >
        <SettingItem icon={User} label="Personal Info" />
        <SettingItem icon={Lock} label="Security" />
      </YStack>

      {/* PREFERENCES */}
      <Text color="$gray9" fontSize={12} marginTop={20} marginBottom={8}>
        PREFERENCES
      </Text>

      <YStack
        backgroundColor="$background"
        borderRadius={16}
        padding={10}
        borderWidth={1}
        borderColor="$borderColor"
      >
        <XStack
          justifyContent="space-between"
          alignItems="center"
          paddingVertical={12}
        >
          <XStack alignItems="center" gap={10}>
            <Circle size={36} backgroundColor="$orange3">
              <Bell size={18} color="$orange9" />
            </Circle>
            <Text color="$color">Notifications</Text>
          </XStack>

          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </XStack>

        <Separator />

        <XStack
          justifyContent="space-between"
          alignItems="center"
          paddingVertical={12}
        >
          <XStack alignItems="center" gap={10}>
            <Circle size={36} backgroundColor="$green3">
              <Download size={18} color="$green9" />
            </Circle>
            <Text color="$color">Export Data</Text>
          </XStack>

          <Text color="$gray9" fontSize={12}>
            PDF, CSV
          </Text>
        </XStack>
      </YStack>

      {/* Logout */}
      <YStack marginTop={20}>
        <XStack
          alignItems="center"
          gap={10}
          paddingVertical={12}
          onPress={Logout}
        >
          <Circle size={36} backgroundColor="$red3">
            <LogOut size={18} color="$red9" />
          </Circle>
          <Text color="$red9">Logout</Text>
        </XStack>
      </YStack>

      {/* Footer */}
      <YStack marginTop="auto" alignItems="center">
        <Text fontSize={12} color="$gray9">
          EchoNotes v2.4.1
        </Text>
        <Text fontSize={10} color="$gray8">
          DESIGNED FOR PRODUCTIVITY
        </Text>
      </YStack>
    </YStack>
  );
}

function SettingItem({ icon: Icon, label }: any) {
  return (
    <>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingVertical={12}
      >
        <XStack alignItems="center" gap={10}>
          <Circle size={36} backgroundColor="$blue3">
            <Icon size={18} color="$blue9" />
          </Circle>
          <Text color="$color">{label}</Text>
        </XStack>

        <ChevronRight size={18} color="#9ca3af" />
      </XStack>
      <Separator />
    </>
  );
}
