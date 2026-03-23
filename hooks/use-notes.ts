import { useMemo, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services";

export function useNotes(initialFolderId: string | number = "all") {
  const queryClient = useQueryClient();
  const [sortBy, setSortBy] = useState<"date" | "tags" | null>(null);
  const [activeFolderId, setActiveFolderId] = useState<string | number>(initialFolderId);

  const { data: notes = [], isLoading: isLoadingNotes } = useQuery({
    queryKey: ["notes"],
    queryFn: () => api.notes.getNotes(),
  });

  const { data: folders = [], isLoading: isLoadingFolders } = useQuery({
    queryKey: ["folders"],
    queryFn: () => api.notes.getFolders(),
  });

  const categories = useMemo(() => {
    const base = [{ id: "all", name: "All Notes" }];
    const folderCats = folders.map((f: any) => ({ id: f.id, name: f.name }));
    return [...base, ...folderCats];
  }, [folders]);

  const filteredAndSortedNotes = useMemo(() => {
    let result = [...notes];

    // Filter by Folder
    if (activeFolderId !== "all") {
      result = result.filter((note: any) => note.folder_id === activeFolderId);
    }

    if (sortBy === "date") {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === "tags") {
      result.sort((a, b) => (b.tags?.length || 0) - (a.tags?.length || 0));
    }

    return result;
  }, [notes, activeFolderId, sortBy]);

  const toggleSort = (type: "date" | "tags") => {
    setSortBy(prev => prev === type ? null : type);
  };

  const selectFolder = (id: string | number) => {
    setActiveFolderId(id);
    queryClient.invalidateQueries({ queryKey: ["notes"] });
    queryClient.invalidateQueries({ queryKey: ["folders"] });
  };

  const deleteNote = async (id: number) => {
    try {
      await api.notes.deleteNote(id);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    } catch (error: any) {
      console.error("Delete note error:", error);
    }
  };

  return {
    notes: filteredAndSortedNotes,
    folders,
    categories,
    activeFolderId,
    sortBy,
    isLoading: isLoadingNotes || isLoadingFolders,
    toggleSort,
    selectFolder,
    deleteNote,
    setActiveFolderId
  };
}
