import { Button, Card, Text, XStack, YStack } from "tamagui";

type Props = {
  note: any;
  onSave?: () => void;
};

export default function PreviewComponent({ note, onSave }: Props) {
  if (!note) return null;

  return (
    <YStack padding={16} gap={16}>
      {/* Title */}
      <Text fontSize={22} fontWeight="700">
        {note.title}
      </Text>

      {/* Tags */}
      <XStack flexWrap="wrap" gap={8}>
        {note.tags?.map((tag: string, index: number) => (
          <Card
            key={index}
            padding={6}
            borderRadius={12}
            borderWidth={1}
            borderColor="#ddd"
          >
            <Text fontSize={12}>#{tag}</Text>
          </Card>
        ))}
      </XStack>

      {/* Summary */}
      <Card
        padding={16}
        borderRadius={14}
        borderWidth={1}
        borderColor="#e5e5e5"
      >
        <YStack gap={8}>
          <Text fontWeight="700">AI Summary</Text>
          <Text>{note.summary}</Text>
        </YStack>
      </Card>

      {/* Action Items */}
      <Card
        padding={16}
        borderRadius={14}
        borderWidth={1}
        borderColor="#e5e5e5"
      >
        <YStack gap={6}>
          <Text fontWeight="700">Action Items</Text>

          {note.action_items?.map((item: string, index: number) => (
            <Text key={index}>☐ {item}</Text>
          ))}
        </YStack>
      </Card>

      {/* Key Points */}
      <Card
        padding={16}
        borderRadius={14}
        borderWidth={1}
        borderColor="#e5e5e5"
      >
        <YStack gap={6}>
          <Text fontWeight="700">Key Points</Text>

          {note.key_points?.map((point: string, index: number) => (
            <Text key={index}>• {point}</Text>
          ))}
        </YStack>
      </Card>

      {/* Save Button */}
      <Button
        backgroundColor="#4F46E5"
        color="white"
        borderRadius={12}
        onPress={onSave}
      >
        Save Note
      </Button>
    </YStack>
  );
}
