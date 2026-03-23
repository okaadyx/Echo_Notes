import { Sparkles } from "@tamagui/lucide-icons";
import { Card, Paragraph, Text, XStack, YStack } from "tamagui";

interface AISummaryProps {
  summary?: string;
}

const AISummary = ({ summary }: AISummaryProps) => (
  <Card backgroundColor="$blue2" padding={16} borderRadius={20} borderWidth={0}>
    <YStack gap={12}>
      <XStack alignItems="center" gap={8}>
        <YStack backgroundColor="$blue10" padding={6} borderRadius={8}>
          <Sparkles size={16} color="white" />
        </YStack>
        <Text fontSize={14} fontWeight="800" color="$blue10" letterSpacing={1}>
          AI SUMMARY
        </Text>
      </XStack>
      <Paragraph fontSize={14} color="$color" lineHeight={22}>
        {summary || "No summary available for this note."}
      </Paragraph>
    </YStack>
  </Card>
);
export default AISummary;