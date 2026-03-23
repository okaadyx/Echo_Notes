import { Folder as FolderIcon, Plus, Check, X } from "@tamagui/lucide-icons";
import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Button, XStack, Text, YStack, Spinner, Input, View } from "tamagui";
import { api } from "@/services";
import { useQueryClient } from "@tanstack/react-query";

interface FolderSelectorProps {
  activeFolderId: number | string | null;
  onSelectFolder: (folderId: number) => void;
  label?: string;
}

const FolderSelector = ({ activeFolderId, onSelectFolder, label = "Select Folder" }: FolderSelectorProps) => {
  const queryClient = useQueryClient();
  const [folders, setFolders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      const data = await api.notes.getFolders();
      setFolders(data || []);
    } catch (error) {
      console.error("Error fetching folders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim() || createLoading) return;
    try {
      setCreateLoading(true);
      const newFolder = await api.notes.createFolder(newFolderName);
      setFolders((prev: any[]) => [...prev, newFolder]);
      onSelectFolder(newFolder.id);
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      setIsCreating(false);
      setNewFolderName("");
    } catch (error) {
      console.error("Error creating folder:", error);
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <YStack gap={12}>
      <XStack alignItems="center" gap={8} paddingHorizontal={4}>
        <FolderIcon size={16} color="$color10" />
        <Text color="$color10" fontSize={14} fontWeight="600">
          {label}
        </Text>
      </XStack>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4, paddingBottom: 5 }}
      >
        <XStack gap={10} alignItems="center">
          {/* New Folder Button/Input */}
          {isCreating ? (
            <XStack 
              gap={8} 
              alignItems="center" 
              backgroundColor="$backgroundFocus" 
              paddingHorizontal={12} 
              paddingVertical={6} 
              borderRadius={20}
              borderWidth={1}
              borderColor="$blue8"
            >
              <Input
                size="$2"
                width={130}
                placeholder="Folder name"
                borderWidth={0}
                backgroundColor="transparent"
                value={newFolderName}
                onChangeText={setNewFolderName}
                autoFocus
                padding={0}
                fontSize={14}
                onSubmitEditing={handleCreateFolder}
                returnKeyType="done"
              />
              <XStack gap={6} alignItems="center">
                {createLoading ? (
                  <Spinner size="small" color="$blue10" />
                ) : (
                  <>
                    <TouchableOpacity onPress={handleCreateFolder} disabled={!newFolderName.trim()}>
                      <View backgroundColor={newFolderName.trim() ? "$blue10" : "$gray8"} padding={6} borderRadius={15}>
                        <Check size={14} color="white" />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setIsCreating(false); setNewFolderName(""); }}>
                      <View backgroundColor="$red3" padding={6} borderRadius={15}>
                        <X size={14} color="$red10" />
                      </View>
                    </TouchableOpacity>
                  </>
                )}
              </XStack>
            </XStack>
          ) : (
            <Button
              size="$3"
              borderRadius={20}
              backgroundColor="$blue3"
              onPress={() => setIsCreating(true)}
              icon={<Plus size={16} color="$blue10" />}
              pressStyle={{ opacity: 0.8 }}
              borderWidth={1}
              borderColor="$blue6"
              borderStyle="dashed"
            >
              <Text color="$blue10" fontWeight="bold" fontSize={13}>New</Text>
            </Button>
          )}

          {loading ? (
            <Spinner size="small" color="$blue10" />
          ) : (
            folders.map((folder: any) => (
              <Button
                key={folder.id}
                size="$3"
                borderRadius={20}
                backgroundColor={activeFolderId === folder.id ? "$blue10" : "$backgroundFocus"}
                onPress={() => onSelectFolder(folder.id)}
                pressStyle={{ opacity: 0.8 }}
                paddingHorizontal={15}
                borderWidth={1}
                borderColor={activeFolderId === folder.id ? "$blue11" : "transparent"}
              >
                <Text
                  color={activeFolderId === folder.id ? "white" : "$color"}
                  fontWeight="600"
                  fontSize={13}
                >
                  {folder.name}
                </Text>
              </Button>
            ))
          )}
        </XStack>
      </ScrollView>
    </YStack>
  );
};

export default FolderSelector;
