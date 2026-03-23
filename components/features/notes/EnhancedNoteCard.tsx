import { MoreVertical, Sparkles, Star } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import React from "react";
import { Alert, View } from "react-native";
import { Button, Card, H4, Paragraph, Text, XStack, YStack } from "tamagui";

interface NoteCardProps {
  id: number;
  title: string;
  summary: string;
  date: string;
  tags: any[];
  isPinned?: boolean;
  accentColor?: string;
  icon?: any;
  onDelete?: () => void;
}

const EnhancedNoteCard = ({
  id,
  title,
  summary,
  date,
  tags,
  isPinned,
  accentColor,
  icon: IconComponent,
  onDelete,
}: NoteCardProps) => {
  return (
    <Card
      elevation={4}
      size="$4"
      marginHorizontal={20}
      marginBottom={15}
      backgroundColor="$background"
      borderRadius={20}
      padding={15}
      borderLeftWidth={accentColor ? 4 : 1}
      borderLeftColor={accentColor || "$borderColor"}
      pressStyle={{ scale: 0.98 }}
      onPress={() =>
        router.push({
          pathname: "/notes/[id]",
          params: { id: id },
        })
      }
    >
      <YStack gap={10}>
        <XStack justifyContent="space-between" alignItems="center">
          <View />
          <Text fontSize={12} color="$color10">
            {date}
          </Text>
        </XStack>

        <YStack gap={5}>
          <H4 fontWeight="700" color="$color">
            {String(title)}
          </H4>
          <Paragraph size="$3" color="$color11" numberOfLines={3} lineHeight={18}>
            {String(summary)}
          </Paragraph>
        </YStack>

        <XStack
          marginTop={10}
          gap={10}
          alignItems="flex-end"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <XStack gap={8} flexWrap="wrap" flex={1} minWidth={100}>
            {(tags || []).map((tag: any, index) => {
              const tagName = typeof tag === "string" ? tag : (tag?.name || "Tag");
              const tagId = typeof tag === "string" ? tag : (tag?.id || index);

              return (
                <XStack
                  key={tagId}
                  backgroundColor="$backgroundFocus"
                  paddingHorizontal={10}
                  paddingVertical={4}
                  borderRadius={10}
                >
                  <Text fontSize={10} fontWeight="600" color="$blue11">
                    #{tagName}
                  </Text>
                </XStack>
              );
            })}
          </XStack>

          <XStack gap={8} alignItems="center" flexShrink={0} marginLeft="auto">
            {isPinned && <Star size={16} color="$blue10" fill="$blue10" />}
            {IconComponent && <IconComponent size={16} color="$blue10" />}
            <Button
              size="$2"
              circular
              icon={<MoreVertical size={18} color="$color10" />}
              backgroundColor="transparent"
              padding={0}
              width={24}
              height={24}
              pressStyle={{ backgroundColor: "$backgroundFocus" }}
              onPress={(e) => {
                e.stopPropagation();
                if (onDelete) {
                  Alert.alert(
                    "Delete Note",
                    "Are you sure you want to delete this note?",
                    [
                      { text: "Cancel", style: "cancel" },
                      { text: "Delete", style: "destructive", onPress: onDelete }
                    ]
                  );
                }
              }}
            />
          </XStack>
        </XStack>
      </YStack>
    </Card>
  );
};

export default EnhancedNoteCard;
