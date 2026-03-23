import { Mic, Pause, Play, SkipBack, SkipForward } from "@tamagui/lucide-icons";
import { Button, Card, Text, XStack, YStack } from "tamagui";
import { useAudioPlayer } from "@/hooks/use-audio-player";

interface AudioPlayerProps {
  uri?: string;
}

const AudioPlayer = ({ uri }: AudioPlayerProps) => {
  const {
    isPlaying,
    position,
    duration,
    playbackProgress,
    handlePlayPause,
    handleSkip,
    formatTime,
  } = useAudioPlayer(uri);

  return (
    <YStack gap={16}>
      <XStack alignItems="center" justifyContent="space-between">
        <XStack alignItems="center" gap={8}>
          <Mic size={20} color="$blue10" />
          <Text fontWeight="700" fontSize={16} color="$color">
            Recording Audio
          </Text>
        </XStack>
      </XStack>

      <Card
        padding={20}
        borderRadius={20}
        backgroundColor="$backgroundFocus"
        borderWidth={0}
      >
        <YStack gap={20}>
          <YStack gap={8}>
            <XStack
              height={6}
              backgroundColor="$borderColor"
              borderRadius={3}
              width="100%"
              overflow="hidden"
            >
              <YStack
                height="100%"
                backgroundColor="$blue10"
                width={`${playbackProgress}%`}
              />
            </XStack>
            <XStack justifyContent="space-between">
              <Text fontSize={12} color="$color05">
                {formatTime(position)}
              </Text>
              <Text fontSize={12} color="$color05">
                {formatTime(duration)}
              </Text>
            </XStack>
          </YStack>

          <XStack justifyContent="center" alignItems="center" gap={32}>
            <Button
              circular
              size="$3"
              backgroundColor="transparent"
              onPress={() => handleSkip(-10000)}
              pressStyle={{ backgroundColor: "$background" }}
            >
              <SkipBack size={24} color="$blue10" />
            </Button>

            <Button
              circular
              size="$6"
              backgroundColor="$blue10"
              onPress={handlePlayPause}
              pressStyle={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <Pause size={32} color="white" />
              ) : (
                <Play size={32} color="white" marginLeft={4} />
              )}
            </Button>

            <Button
              circular
              size="$3"
              backgroundColor="transparent"
              onPress={() => handleSkip(10000)}
              pressStyle={{ backgroundColor: "$background" }}
            >
              <SkipForward size={24} color="$blue10" />
            </Button>
          </XStack>
        </YStack>
      </Card>
    </YStack>
  );
};

export default AudioPlayer;