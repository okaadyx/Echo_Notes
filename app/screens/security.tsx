import {
  AlertTriangle,
  Eye,
  Lock,
  Mail,
  Shield,
  Smartphone,
} from "@tamagui/lucide-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  Circle,
  ScrollView,
  Switch,
  Text,
  XStack,
  YStack,
} from "tamagui";

export default function SecurityScreen() {
  const [twoFA, setTwoFA] = useState(false);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "$background" }}>
      <YStack flex={1} padding={16} marginBottom={80}>
        <Text fontSize={13} color="$gray10">
          Manage your account protection and privacy preferences
        </Text>
        <YStack
          marginTop={20}
          padding={16}
          borderRadius={16}
          backgroundColor="$background"
          borderWidth={1}
          borderColor="$borderColor"
        >
          <Circle size={40} backgroundColor="$blue3">
            <Lock size={20} color="$blue9" />
          </Circle>

          <Text marginTop={12} fontWeight="600" color="$color">
            Password Management
          </Text>

          <Text fontSize={12} color="$gray10" marginTop={4}>
            Keep your access secure with a strong password.
          </Text>

          <Button
            marginTop={12}
            backgroundColor="$blue9"
            color="white"
            borderRadius={10}
            onPress={() => router.push("/screens/password")}
          >
            Change Password
          </Button>
        </YStack>

        <YStack
          marginTop={14}
          padding={16}
          borderRadius={16}
          backgroundColor="$background"
          borderWidth={1}
          borderColor="$borderColor"
        >
          <XStack justifyContent="space-between" alignItems="center">
            <Circle size={40} backgroundColor="$blue3">
              <Shield size={20} color="$blue9" />
            </Circle>

            <Switch
              checked={twoFA}
              onCheckedChange={setTwoFA}
              size="$2"
              activeStyle={{
                backgroundColor: "$blue3",
              }}
            >
              <Switch.Thumb transition="bouncy" backgroundColor={"$blue10"} />
            </Switch>
          </XStack>

          <Text marginTop={12} fontWeight="600" color="$color">
            Two-Factor Authentication
          </Text>

          <Text fontSize={12} color="$gray10" marginTop={4}>
            Currently turned off. Add an extra layer of security to your
            account.
          </Text>
        </YStack>

        <Text marginTop={20} fontSize={14} fontWeight="600" color="$color">
          Security Alerts
        </Text>
        <YStack
          marginTop={10}
          borderRadius={16}
          borderWidth={1}
          borderColor="$borderColor"
        >
          <SettingRow icon={Mail} label="Email Notifications" active />
          <SettingRow icon={Smartphone} label="Trusted Devices" />
          <SettingRow icon={Eye} label="Privacy Mode" />
        </YStack>

        <YStack
          marginTop={20}
          padding={16}
          borderRadius={16}
          backgroundColor="$red2"
          onPress={() => router.push("/screens/delete-account")}
        >
          <XStack alignItems="center" gap={10}>
            <AlertTriangle color="$red9" />
            <Text fontWeight="600" color="$red9">
              Danger Zone
            </Text>
          </XStack>

          <Text fontSize={12} marginTop={6} color="$red9">
            Once you delete your account, there is no going back. All your voice
            transcriptions and notes will be permanently removed from our cloud.
          </Text>

          <Text marginTop={10} color="$red9" fontWeight="600">
            Account Deletion
          </Text>
        </YStack>
      </YStack>
    </ScrollView>
  );
}

function SettingRow({ icon: Icon, label, active }: any) {
  return (
    <XStack
      padding={14}
      justifyContent="space-between"
      alignItems="center"
      borderBottomWidth={1}
      borderColor="$borderColor"
    >
      <XStack alignItems="center" gap={10}>
        <Circle size={36} backgroundColor="$blue3">
          <Icon size={18} color="$blue9" />
        </Circle>
        <Text color="$color">{label}</Text>
      </XStack>

      {active ? (
        <Circle size={20} backgroundColor="$blue9" />
      ) : (
        <Text color="$gray9">›</Text>
      )}
    </XStack>
  );
}
