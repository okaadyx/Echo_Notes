import SearchInput from "@/components/layout/SearchInput";
import { Stack } from "expo-router";

export default function ScreenLayout() {
  return (
    <Stack>
      <Stack.Screen name="recording" options={{ headerShown: false }} />
      <Stack.Screen name="analyzing" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{ title: "Personal Information" }}
      />
      <Stack.Screen name="security" options={{ title: "Security" }} />
      <Stack.Screen name="password" options={{ title: "Change Password" }} />
      <Stack.Screen name="new-note" options={{ title: "New Note", headerShown: false }} />
      <Stack.Screen
        name="delete-account"
        options={{ title: "Account Deletion" }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerTitle: () => <SearchInput />,
        }}
      />
    </Stack>
  );
}
