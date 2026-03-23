import { Calendar, Clock, Plus } from "@tamagui/lucide-icons";
import { H3, Text, XStack, YStack } from "tamagui";

interface NoteInfoProps {
  title?: string;
  tags?: string[];
}

const NoteInfo = ({ title, tags = [] }: NoteInfoProps) => (
  <YStack gap={24}>
    <YStack gap={8}>
      <H3 fontWeight="800" color="$color" lineHeight={32}>
        {title || "Untitled Note"}
      </H3>
      <XStack gap={16} alignItems="center">
        <XStack alignItems="center" gap={6}>
          <Calendar size={14} color="$color05" />
          <Text color="$color05" fontSize={13}>
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </XStack>
        <XStack alignItems="center" gap={6}>
          <Clock size={14} color="$color05" />
          <Text color="$color05" fontSize={13}>
            {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Text>
        </XStack>
      </XStack>
    </YStack>

    <XStack flexWrap="wrap" gap={8}>
      {tags?.length > 0 ? (
        tags.map((tag: any, index: number) => {
          const tagLabel =
            typeof tag === "string" ? tag : tag?.name || tag?.text || "";
          return (
            <XStack
              key={index}
              backgroundColor="$blue3"
              paddingHorizontal={12}
              paddingVertical={6}
              borderRadius={20}
            >
              <Text fontSize={12} fontWeight="600" color="$blue10">
                #{tagLabel}
              </Text>
            </XStack>
          );
        })
      ) : (
        <Text color="$color05" fontSize={12} fontStyle="italic">
          No tags
        </Text>
      )}
      <XStack
        borderWidth={1}
        borderColor="$borderColor"
        paddingHorizontal={12}
        paddingVertical={6}
        borderRadius={20}
        alignItems="center"
        gap={4}
      >
        <Plus size={12} color="$color05" />
        <Text fontSize={12} color="$color05">
          Add Tag
        </Text>
      </XStack>
    </XStack>
  </YStack>
);

export default NoteInfo;