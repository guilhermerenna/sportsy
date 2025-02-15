import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack>
    <Stack.Screen name="index" options={{ title: 'Home' }} />
    <Stack.Screen name="exercises" options={{ title: 'Exercise' }} />
    <Stack.Screen name="sessiontemplates" options={{ title: 'Session Templates' }} />
    <Stack.Screen name="newsession" options={{ title: 'New Session' }} />
    <Stack.Screen name="sessionhistory" options={{ title: 'Session History' }} />
  </Stack>
  );
}
