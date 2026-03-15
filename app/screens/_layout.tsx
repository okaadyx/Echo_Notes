import { Stack } from "expo-router";

export default function ScreenLayout() {
  return (
    <Stack>
      <Stack.Screen name="recording" options={{ headerShown: false }} />
      <Stack.Screen name="analyzing" options={{ headerShown: false }} />
    </Stack>
  );
}
