import NotesCard from "@/components/features/notes/NotesCard";
import { api } from "@/services";
import { Search } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { Text, YStack } from "tamagui";

export default function SearchScreen() {
  const query = useSelector((state: any) => state.query.query);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", query],
    queryFn: () => api.notes.searchNotes(query),
    enabled: !!query?.trim(),
  });

  if (!query?.trim()) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" gap={10}>
        <Search size={80} color="$gray11" />
        <Text color="$gray11">Search notes, ideas, and memories</Text>
      </YStack>
    );
  }

  if (isLoading) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" gap={10}>
        <ActivityIndicator size="large" />
      </YStack>
    );
  }

  if (isError) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" gap={10}>
        <Text color="$red10">Error fetching search results</Text>
      </YStack>
    );
  }

  const notes = data || [];

  if (notes.length === 0) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" gap={10}>
        <Text color="$gray11">{`No notes found for "${query}"`}</Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1} padding={10}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NotesCard item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </YStack>
  );
}
