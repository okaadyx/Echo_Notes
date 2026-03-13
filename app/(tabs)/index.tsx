import FolderComponent from "@/components/core/FolderComponent";
import HeaderComponent from "@/components/core/HeaderComponent";
import SearchComponent from "@/components/core/SearchComponent";
import PinnedCard from "@/components/PinnedCard";
import { StarFull } from "@tamagui/lucide-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, XStack } from "tamagui";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ padding: 16, gap: 20 }}>
      <HeaderComponent />
      <SearchComponent />
      <FolderComponent />
      <XStack gap={10} alignItems="center">
        <StarFull color={"#f43f5e"} />
        <Text fontSize={24} fontWeight={"bold"}>
          Pinned Notes
        </Text>
      </XStack>
      <PinnedCard />
    </SafeAreaView>
  );
}
