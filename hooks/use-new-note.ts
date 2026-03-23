import { useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/services";

export function useNewNote() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [folderId, setFolderId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  // Enrichment States
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [actionItems, setActionItems] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  
  // Input helpers
  const [newKeyPoint, setNewKeyPoint] = useState("");
  const [newActionItem, setNewActionItem] = useState("");
  const [newTag, setNewTag] = useState("");

  const addKeyPoint = () => {
    if (newKeyPoint.trim()) {
      setKeyPoints([...keyPoints, newKeyPoint.trim()]);
      setNewKeyPoint("");
    }
  };

  const removeKeyPoint = (index: number) => {
    setKeyPoints(keyPoints.filter((_, i) => i !== index));
  };

  const addActionItem = () => {
    if (newActionItem.trim()) {
      setActionItems([...actionItems, newActionItem.trim()]);
      setNewActionItem("");
    }
  };

  const removeActionItem = (index: number) => {
    setActionItems(actionItems.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim().replace("#", "")]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      Alert.alert("Empty Note", "Please add a title or some content before saving.");
      return;
    }
    
    if (saving) return;
    
    try {
      setSaving(true);
      await api.notes.createNotes({
        title: title || "Untitled Note",
        summary: content.slice(0, 150) + (content.length > 150 ? "..." : ""),
        transcript: content,
        key_points: keyPoints,
        action_items: actionItems,
        tags: tags,
        folder_id: folderId,
      });
      
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      router.replace("/(tabs)/explore");
    } catch (error) {
      console.error("Error saving note:", error);
      Alert.alert("Error", "Failed to save note.");
    } finally {
      setSaving(false);
    }
  };

  return {
    state: {
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
    },
    handleSave,
  };
}
