import { Lightbulb } from "@tamagui/lucide-icons";
import { Text, XStack, YStack } from "tamagui";

interface KeyPointsProps {
  points?: string[];
}

const KeyPoints = ({ points = [] }: KeyPointsProps) => {
  return (
    <YStack gap={16}>
      <XStack alignItems="center" gap={8}>
        <Lightbulb size={20} color="$orange10" />
        <Text fontWeight="700" fontSize={16} color="$color">
          Key Points
        </Text>
      </XStack>
      <YStack gap={12}>
        {points?.length > 0 ? (
          points.map((point: any, index: number) => {
            const pointText =
              typeof point === "string" ? point : point?.text || point?.content || "";
            return (
              <XStack key={index} gap={8} alignItems="flex-start">
                <Text color="$orange10" fontSize={18} marginTop={-4}>
                  •
                </Text>
                <Text fontSize={14} color="$color" lineHeight={20} flex={1}>
                  {pointText}
                </Text>
              </XStack>
            );
          })
        ) : (
          <Text color="$color05" fontStyle="italic" fontSize={14}>
            No key points identified.
          </Text>
        )}
      </YStack>
    </YStack>
  );
};

export default KeyPoints;