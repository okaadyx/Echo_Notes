import { Folder, MoreVertical, Plus, Pencil, Trash2, X } from "@tamagui/lucide-icons";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, Alert, Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Text, View, XStack, YStack, Spinner, Button, Input } from "tamagui";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services";
import { useRouter } from "expo-router";

const getFolderStyles = (name: string) => {
  switch (name.toLowerCase()) {
    case "work":
      return { color: "$blue10", bg: "$blue3" };
    case "personal":
      return { color: "$purple10", bg: "$purple3" };
    case "ideas":
      return { color: "$orange10", bg: "$yellow3" };
    case "college":
      return { color: "$green10", bg: "$green3" };
    default:
      return { color: "$gray10", bg: "$backgroundFocus" };
  }
};

const FolderComponent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: folders = [], isLoading, isError } = useQuery({
    queryKey: ["folders"],
    queryFn: () => api.notes.getFolders(),
  });

  const handleFolderPress = (folderId: number) => {
    router.push({
      pathname: "/(tabs)/explore",
      params: { folderId }
    });
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      setLoading(true);
      await api.notes.createFolder(newName);
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      setShowCreate(false);
      setNewName("");
    } catch (error) {
      console.error("Error creating folder:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!newName.trim()) return;
    try {
      setLoading(true);
      await api.notes.updateFolder(selectedFolder.id, newName);
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      setShowRename(false);
      setShowOptions(false);
      setNewName("");
    } catch (error) {
      console.error("Error renaming folder:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Delete Folder",
      `Are you sure you want to delete "${selectedFolder.name}"? The notes will NOT be deleted.`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              await api.notes.deleteFolder(selectedFolder.id);
              queryClient.invalidateQueries({ queryKey: ["folders"] });
              setShowOptions(false);
            } catch (error) {
              console.error("Error deleting folder:", error);
            }
          }
        }
      ]
    );
  };

  return (
    <YStack gap={20}>
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize={24} fontWeight={"bold"} color="$color">
          Folders
        </Text>
        <TouchableOpacity onPress={() => { setNewName(""); setShowCreate(true); }}>
          <XStack alignItems="center" gap={4}>
            <Plus size={16} color="$blue10" />
            <Text fontSize={16} fontWeight={"bold"} color={"$blue10"}>
              New Folder
            </Text>
          </XStack>
        </TouchableOpacity>
      </XStack>

      {isLoading ? (
        <XStack padding={20} justifyContent="center" alignItems="center">
          <Spinner size="large" color="$blue10" />
        </XStack>
      ) : isError ? (
        <Text color="$red10" padding={20}>Error loading folders</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingBottom: 10 }}
        >
          {folders.map((folder: any) => {
            const styles = getFolderStyles(folder.name);
            return (
              <TouchableOpacity 
                key={folder.id} 
                onPress={() => handleFolderPress(folder.id)}
                onLongPress={() => {
                  setSelectedFolder(folder);
                  setShowOptions(true);
                }}
              >
                <View
                  height={150}
                  width={150}
                  backgroundColor={"$backgroundFocus"}
                  borderRadius={20}
                  padding={20}
                  gap={15}
                  justifyContent="center"
                  position="relative"
                >
                  <TouchableOpacity 
                    style={{ position: 'absolute', top: 10, right: 10 }}
                    onPress={() => {
                      setSelectedFolder(folder);
                      setShowOptions(true);
                    }}
                  >
                    <MoreVertical size={16} color="$color8" />
                  </TouchableOpacity>

                  <XStack
                    height={50}
                    width={50}
                    backgroundColor={styles.bg as any}
                    alignItems="center"
                    borderRadius={12}
                    justifyContent="center"
                  >
                    <Folder color={styles.color as any} scale={1.5} />
                  </XStack>
                  <YStack>
                    <Text fontSize={20} fontWeight={"bold"} color={"$color"} numberOfLines={1}>
                      {folder.name}
                    </Text>
                    <Text color={"$color10"} fontSize={14}>
                      {folder._count?.notes || 0} notes
                    </Text>
                  </YStack>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      {/* Options Modal */}
      <Modal
        visible={showOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowOptions(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowOptions(false)}>
          <View flex={1} backgroundColor="rgba(0,0,0,0.5)" justifyContent="flex-end">
            <TouchableWithoutFeedback>
              <YStack 
                backgroundColor="$background" 
                padding={25} 
                borderTopLeftRadius={30} 
                borderTopRightRadius={30} 
                gap={20}
                paddingBottom={50}
              >
                <XStack justifyContent="space-between" alignItems="center">
                  <Text fontSize={20} fontWeight="bold">
                    {selectedFolder?.name}
                  </Text>
                  <TouchableOpacity onPress={() => setShowOptions(false)}>
                    <X size={24} color="$color10" />
                  </TouchableOpacity>
                </XStack>

                <TouchableOpacity 
                  onPress={() => { 
                    setNewName(selectedFolder.name); 
                    setShowRename(true); 
                  }}
                  style={styles.optionButton}
                >
                  <XStack gap={15} alignItems="center">
                    <View backgroundColor="$blue3" padding={10} borderRadius={12}>
                      <Pencil size={20} color="$blue10" />
                    </View>
                    <Text fontSize={18} fontWeight="600">Rename Folder</Text>
                  </XStack>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={handleDelete}
                  style={styles.optionButton}
                >
                  <XStack gap={15} alignItems="center">
                    <View backgroundColor="$red3" padding={10} borderRadius={12}>
                      <Trash2 size={20} color="$red10" />
                    </View>
                    <Text fontSize={18} fontWeight="600" color="$red10">Delete Folder</Text>
                  </XStack>
                </TouchableOpacity>

                <Button size="$5" borderRadius={15} onPress={() => setShowOptions(false)} marginTop={10}>
                  Cancel
                </Button>
              </YStack>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Rename Dialog Modal */}
      <Modal
        visible={showRename}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowRename(false)}
      >
        <View flex={1} backgroundColor="rgba(0,0,0,0.5)" justifyContent="center" padding={20}>
          <YStack backgroundColor="$background" padding={25} borderRadius={25} gap={20} elevation={10}>
            <Text fontSize={22} fontWeight="bold">Rename Folder</Text>
            <Input 
              value={newName} 
              onChangeText={setNewName} 
              autoFocus 
              size="$5"
              placeholder="Enter new name"
              borderRadius={12}
            />
            <XStack gap={12} justifyContent="flex-end" marginTop={10}>
              <Button size="$4" borderRadius={12} onPress={() => setShowRename(false)}>Cancel</Button>
              <Button 
                size="$4" 
                borderRadius={12} 
                backgroundColor="$color" 
                onPress={handleRename} 
                disabled={loading}
              >
                <Text color="$background" fontWeight="bold">{loading ? <Spinner /> : "Save"}</Text>
              </Button>
            </XStack>
          </YStack>
        </View>
      </Modal>

      {/* Create Dialog Modal */}
      <Modal
        visible={showCreate}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCreate(false)}
      >
        <View flex={1} backgroundColor="rgba(0,0,0,0.5)" justifyContent="center" padding={20}>
          <YStack backgroundColor="$background" padding={25} borderRadius={25} gap={20} elevation={10}>
            <Text fontSize={22} fontWeight="bold">New Folder</Text>
            <Input 
              value={newName} 
              onChangeText={setNewName} 
              autoFocus 
              size="$5"
              placeholder="Folder name"
              borderRadius={12}
            />
            <XStack gap={12} justifyContent="flex-end" marginTop={10}>
              <Button size="$4" borderRadius={12} onPress={() => setShowCreate(false)}>Cancel</Button>
              <Button 
                size="$4" 
                borderRadius={12} 
                backgroundColor="$color" 
                onPress={handleCreate} 
                disabled={loading}
              >
                <Text color="$background" fontWeight="bold">{loading ? <Spinner /> : "Create"}</Text>
              </Button>
            </XStack>
          </YStack>
        </View>
      </Modal>
    </YStack>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    paddingVertical: 5,
  }
});

export default FolderComponent;
