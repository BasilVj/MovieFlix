import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "./globals.css";
export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" hidden/>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
