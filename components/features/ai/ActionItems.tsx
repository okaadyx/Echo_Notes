import { ClipboardCheck } from "@tamagui/lucide-icons";
import { Card, Text, XStack, YStack } from "tamagui";

interface ActionItemsProps {
  items?: string[];
}

const ActionItems = ({ items = [] }: ActionItemsProps) => {
  return (
    <YStack gap={16}>
      <XStack alignItems="center" gap={8}>
        <ClipboardCheck size={20} color="$green10" />
        <Text fontWeight="700" fontSize={16} color="$color">
          Action Items
        </Text>
      </XStack>
      <YStack gap={12}>
        {items?.length > 0 ? (
          items.map((item: any, index: number) => {
            const itemText =
              typeof item === "string" ? item : item?.text || item?.task || "";
            return (
              <Card
                key={index}
                padding={12}
                borderRadius={12}
                borderWidth={1}
                borderColor="$borderColor"
                backgroundColor="$background"
              >
                <XStack gap={12} alignItems="center">
                  <YStack
                    width={20}
                    height={20}
                    borderRadius={6}
                    borderWidth={2}
                    borderColor="$borderColor"
                    backgroundColor="$background"
                    justifyContent="center"
                    alignItems="center"
                  />
                  <Text fontSize={14} color="$color" flex={1}>
                    {itemText}
                  </Text>
                </XStack>
              </Card>
            );
          })
        ) : (
          <Text color="$color05" fontStyle="italic" fontSize={14}>
            No action items identified.
          </Text>
        )}
      </YStack>
    </YStack>
  );
};

export default ActionItems;