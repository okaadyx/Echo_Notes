import { X, Save, Trash2, ChevronLeft, Plus, List, Zap, Hash } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  Button, H3, Input, TextArea, XStack, YStack, Text, 
  Spinner, View, Card, Separator, ScrollView
} from "tamagui";
import { FolderSelector } from "@/components/features/notes";
import { 
  KeyboardAvoidingView, Platform, Alert, TouchableOpacity
} from "react-native";
import { useNewNote } from "@/hooks/use-new-note";

export default function NewNoteScreen() {
  const { state, handleSave } = useNewNote();
  const {
    title, setTitle,
    content, setContent,
    folderId, setFolderId,
    saving,
    keyPoints, removeKeyPoint,
    actionItems, removeActionItem,
    tags, removeTag,
    newKeyPoint, setNewKeyPoint, addKeyPoint,
    newActionItem, setNewActionItem, addActionItem,
    newTag, setNewTag, addTag
  } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "$background" }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <YStack flex={1} padding={20} gap={20}>
          {/* Header */}
          <XStack justifyContent="space-between" alignItems="center">
            <Button
              size="$3"
              circular
              icon={ChevronLeft}
              backgroundColor="$backgroundFocus"
              onPress={() => router.back()}
            />
            <H3 fontWeight="bold">New Note</H3>
            <Button 
                size="$3"
                circular
                icon={Trash2}
                backgroundColor="$red3"
                onPress={() => {
                    if (title || content) {
                        Alert.alert("Discard Changes?", "Are you sure you want to discard this note?", [
                            { text: "Cancel", style: "cancel" },
                            { text: "Discard", style: "destructive", onPress: () => router.back() }
                        ]);
                    } else {
                        router.back();
                    }
                }}
            />
          </XStack>

          <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            <YStack gap={20} paddingBottom={40}>
              <Card elevation={2} backgroundColor="$backgroundFocus" padding={20} borderRadius={20} gap={15}>
                <YStack gap={5}>
                  <Text fontSize={12} color="$blue10" fontWeight="bold" letterSpacing={1}>TITLE</Text>
                  <Input 
                    placeholder="Enter note title..."
                    placeholderTextColor="$color9"
                    value={title} 
                    onChangeText={setTitle}
                    backgroundColor="transparent"
                    borderWidth={0}
                    fontSize={24}
                    fontWeight="bold"
                    padding={0}
                    color="$color"
                  />
                </YStack>

                <Separator />

                <YStack gap={5}>
                  <Text fontSize={12} color="$blue10" fontWeight="bold" letterSpacing={1}>CONTENT</Text>
                  <TextArea 
                    placeholder="Start typing your thoughts here..."
                    placeholderTextColor="$color9"
                    value={content} 
                    onChangeText={setContent}
                    backgroundColor="transparent"
                    borderWidth={0}
                    padding={0}
                    fontSize={16}
                    color="$color11"
                    minHeight={150}
                    textAlignVertical="top"
                  />
                </YStack>
              </Card>

              {/* Enrichment Sections */}
              <YStack gap={15}>
                {/* Tags */}
                <Card elevation={2} backgroundColor="$backgroundFocus" padding={20} borderRadius={20} gap={10}>
                  <XStack gap={8} alignItems="center">
                    <Hash size={16} color="$blue10" />
                    <Text fontSize={12} color="$blue10" fontWeight="bold" letterSpacing={1}>TAGS</Text>
                  </XStack>
                  <XStack gap={10} flexWrap="wrap">
                    {tags.map((tag) => (
                      <XStack 
                        key={tag} 
                        backgroundColor="$blue3" 
                        paddingHorizontal={12} 
                        paddingVertical={6} 
                        borderRadius={15}
                        alignItems="center"
                        gap={5}
                      >
                        <Text color="$blue11" fontSize={14}>#{tag}</Text>
                        <TouchableOpacity onPress={() => removeTag(tag)}>
                          <X size={14} color="$blue11" />
                        </TouchableOpacity>
                      </XStack>
                    ))}
                  </XStack>
                  <XStack gap={10} alignItems="center">
                    <Input 
                      flex={1}
                      placeholder="Add tag..."
                      backgroundColor="transparent"
                      borderWidth={0}
                      borderBottomWidth={1}
                      borderBottomColor="$borderColor"
                      padding={0}
                      value={newTag}
                      onChangeText={setNewTag}
                      onSubmitEditing={addTag}
                    />
                    <Button size="$3" circular icon={Plus} backgroundColor="$blue10" onPress={addTag} disabled={!newTag.trim()} />
                  </XStack>
                </Card>

                {/* Key Points */}
                <Card elevation={2} backgroundColor="$backgroundFocus" padding={20} borderRadius={20} gap={15}>
                  <XStack gap={8} alignItems="center">
                    <List size={16} color="$blue10" />
                    <Text fontSize={12} color="$blue10" fontWeight="bold" letterSpacing={1}>KEY POINTS</Text>
                  </XStack>
                  <YStack gap={10}>
                    {keyPoints.map((point, i) => (
                      <XStack key={i} gap={10} alignItems="flex-start">
                        <View width={6} height={6} borderRadius={3} backgroundColor="$blue10" marginTop={8} />
                        <Text flex={1} fontSize={15} color="$color11">{point}</Text>
                        <TouchableOpacity onPress={() => removeKeyPoint(i)}>
                          <Trash2 size={16} color="$red9" />
                        </TouchableOpacity>
                      </XStack>
                    ))}
                  </YStack>
                  <XStack gap={10} alignItems="center">
                    <Input 
                      flex={1}
                      placeholder="Add a key point..."
                      backgroundColor="transparent"
                      borderWidth={0}
                      borderBottomWidth={1}
                      borderBottomColor="$borderColor"
                      padding={0}
                      value={newKeyPoint}
                      onChangeText={setNewKeyPoint}
                      onSubmitEditing={addKeyPoint}
                    />
                    <Button size="$3" circular icon={Plus} backgroundColor="$blue10" onPress={addKeyPoint} disabled={!newKeyPoint.trim()} />
                  </XStack>
                </Card>

                {/* Action Items */}
                <Card elevation={2} backgroundColor="$backgroundFocus" padding={20} borderRadius={20} gap={15}>
                  <XStack gap={8} alignItems="center">
                    <Zap size={16} color="$blue10" />
                    <Text fontSize={12} color="$blue10" fontWeight="bold" letterSpacing={1}>ACTION ITEMS</Text>
                  </XStack>
                  <YStack gap={10}>
                    {actionItems.map((item, i) => (
                      <XStack key={i} gap={10} alignItems="flex-start">
                        <View width={14} height={14} borderRadius={4} borderWidth={1.5} borderColor="$blue10" marginTop={4} />
                        <Text flex={1} fontSize={15} color="$color11">{item}</Text>
                        <TouchableOpacity onPress={() => removeActionItem(i)}>
                          <Trash2 size={16} color="$red9" />
                        </TouchableOpacity>
                      </XStack>
                    ))}
                  </YStack>
                  <XStack gap={10} alignItems="center">
                    <Input 
                      flex={1}
                      placeholder="Add an action item..."
                      backgroundColor="transparent"
                      borderWidth={0}
                      borderBottomWidth={1}
                      borderBottomColor="$borderColor"
                      padding={0}
                      value={newActionItem}
                      onChangeText={setNewActionItem}
                      onSubmitEditing={addActionItem}
                    />
                    <Button size="$3" circular icon={Plus} backgroundColor="$blue10" onPress={addActionItem} disabled={!newActionItem.trim()} />
                  </XStack>
                </Card>
              </YStack>

              <FolderSelector 
                label="SELECT FOLDER"
                activeFolderId={folderId} 
                onSelectFolder={setFolderId} 
              />
            </YStack>
          </ScrollView>

          {/* Action Footer */}
          <XStack paddingVertical={10}>
            <Button 
              size="$5" 
              flex={1} 
              icon={saving ? <Spinner color="white" /> : Save} 
              backgroundColor="$blue10" 
              onPress={handleSave}
              disabled={saving}
              borderRadius={30}
              shadowColor="#000"
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.2}
              shadowRadius={8}
              elevation={5}
            >
              <Text color="white" fontWeight="bold" fontSize={16}>Save Note</Text>
            </Button>
          </XStack>
        </YStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
