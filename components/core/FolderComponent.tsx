import { Folder } from "@tamagui/lucide-icons";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Text, View, XStack, YStack } from "tamagui";

const MOCK_DATA = [
  {
    id: "1",
    name: "Work",
    notes_Count: 12,
  },
  {
    id: "2",
    name: "Personal",
    notes_Count: 4,
  },
  {
    id: "3",
    name: "Ideas",
    notes_Count: 24,
  },
  {
    id: "4",
    name: "College",
    notes_Count: 20,
  },
];
const FolderComponent = () => {
  return (
    <YStack gap={20}>
      <XStack justifyContent="space-between">
        <Text fontSize={24} fontWeight={"bold"}>
          Folders
        </Text>
        <TouchableOpacity>
          <Text fontSize={16} fontWeight={"bold"} color={"#2b67ec"}>
            View All
          </Text>
        </TouchableOpacity>
      </XStack>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={MOCK_DATA}
        renderItem={({ item }) => (
          <View
            height={150}
            width={150}
            backgroundColor={"white"}
            borderRadius={20}
            padding={20}
            gap={10}
            justifyContent="center"
          >
            <XStack
              height={50}
              width={50}
              backgroundColor={"#dbeafe"}
              alignItems="center"
              borderRadius={12}
              justifyContent="center"
            >
              <Folder color={"#2563eb"} scale={1.5} />
            </XStack>
            <YStack>
              <Text fontSize={20} fontWeight={"bold"} color={"black"}>
                {item.name}
              </Text>
              <Text color={"#96a5b9"}>{item.notes_Count} notes</Text>
            </YStack>
          </View>
        )}
        contentContainerStyle={{ gap: 10, marginBottom: 40 }}
      />
    </YStack>
  );
};

export default FolderComponent;
