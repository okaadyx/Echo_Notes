import { Mic, Pause, Play, Square, X } from "@tamagui/lucide-icons";
import { Audio } from "expo-av";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Circle, Text, XStack, YStack } from "tamagui";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function VoiceRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [duration, setDuration] = useState(0);
  const [recordingActive, setRecordingActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef<any>(null);
  const waveRef = useRef<any>(null);

  const glow = useSharedValue(1);
  const waveform = Array.from({ length: 18 }).map(() => useSharedValue(10));

  useEffect(() => {
    Audio.requestPermissionsAsync();

    glow.value = withRepeat(withTiming(1.35, { duration: 1200 }), -1, true);
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glow.value }],
    opacity: 0.6,
  }));

  const startRecording = async () => {
    try {
      if (recording) return;

      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();

      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      await newRecording.startAsync();

      setRecording(newRecording);
      setRecordingActive(true);
      setIsPaused(false);

      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);

      waveRef.current = setInterval(() => {
        waveform.forEach((bar) => {
          bar.value = withTiming(Math.random() * 70 + 10, { duration: 180 });
        });
      }, 200);
    } catch (error) {
      console.log("Start recording error:", error);
    }
  };

  const togglePauseResume = async () => {
    if (!recording) return;

    if (!isPaused) {
      await recording.pauseAsync();
      clearInterval(timerRef.current);
      clearInterval(waveRef.current);
      setIsPaused(true);
      setRecordingActive(false);
    } else {
      await recording.startAsync();

      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);

      waveRef.current = setInterval(() => {
        waveform.forEach((bar) => {
          bar.value = withTiming(Math.random() * 70 + 10, { duration: 180 });
        });
      }, 200);

      setIsPaused(false);
      setRecordingActive(true);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;

      clearInterval(timerRef.current);
      clearInterval(waveRef.current);

      await recording.stopAndUnloadAsync();

      const tempUri = recording.getURI();
      let uri = tempUri;

      if (tempUri) {
        // Copy out of volatile cache to a stable document directory
        const FileSystem = require("expo-file-system/legacy");
        const fileName = `recording-${Date.now()}.m4a`;
        const newUri = `${FileSystem.documentDirectory}${fileName}`;
        await FileSystem.copyAsync({
          from: tempUri,
          to: newUri,
        });
        uri = newUri;
      }

      setRecording(null);
      setRecordingActive(false);
      setIsPaused(false);
      setDuration(0);
      router.push({ pathname: "/screens/analyzing", params: { uri } });
    } catch (error) {
      console.log("Stop recording error:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <YStack
      flex={1}
      backgroundColor="#000"
      justifyContent="space-between"
      alignItems="center"
      padding={24}
    >
      <YStack alignItems="center" marginTop={40}>
        <Text color="white" fontSize={36} letterSpacing={4}>
          {formatTime(duration)}
        </Text>

        <Text color="#ff4d4d" marginTop={6}>
          {recordingActive ? "RECORDING" : isPaused ? "PAUSED" : "READY"}
        </Text>
      </YStack>

      <YStack width="100%" justifyContent="center" alignItems="center">
        <YStack
          width={220}
          height={220}
          justifyContent="center"
          alignItems="center"
        >
          <AnimatedCircle
            size={220}
            backgroundColor="rgba(255,0,0,0.25)"
            position="absolute"
            style={glowStyle}
          />

          <Circle
            size={140}
            backgroundColor="#ff3b3b"
            justifyContent="center"
            alignItems="center"
            pressStyle={{ scale: 0.95 }}
            onPress={startRecording}
          >
            <Mic size={50} color="white" />
          </Circle>
        </YStack>

        <XStack marginTop={40} height={80} alignItems="center" gap={4}>
          {waveform.map((bar, index) => (
            <WaveBar key={index} value={bar} />
          ))}
        </XStack>
      </YStack>

      {/* CONTROLS */}
      <XStack width="100%" justifyContent="space-between" alignItems="center">
        <YStack alignItems="center">
          <Circle
            size={50}
            backgroundColor="#222"
            justifyContent="center"
            alignItems="center"
            onPress={() => router.back()}
          >
            <X size={22} color="white" />
          </Circle>
          <Text color="gray" marginTop={6}>
            CANCEL
          </Text>
        </YStack>

        <YStack alignItems="center">
          <Circle
            size={70}
            backgroundColor="white"
            justifyContent="center"
            alignItems="center"
            onPress={stopRecording}
          >
            <Square size={26} color="red" />
          </Circle>
          <Text color="white" marginTop={6}>
            STOP
          </Text>
        </YStack>

        <YStack alignItems="center">
          <Circle
            size={50}
            backgroundColor="#222"
            justifyContent="center"
            alignItems="center"
            onPress={togglePauseResume}
          >
            {isPaused ? (
              <Play size={22} color="white" />
            ) : (
              <Pause size={22} color="white" />
            )}
          </Circle>

          <Text color="gray" marginTop={6}>
            {isPaused ? "RESUME" : "PAUSE"}
          </Text>
        </YStack>
      </XStack>
    </YStack>
  );
}

function WaveBar({ value }: any) {
  const animatedStyle = useAnimatedStyle(() => ({
    height: value.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width: 5,
          backgroundColor: "#ff4d4d",
          borderRadius: 4,
        },
        animatedStyle,
      ]}
    />
  );
}
