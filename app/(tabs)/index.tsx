import FolderComponent from "@/components/core/FolderComponent";
import HeaderComponent from "@/components/core/HeaderComponent";
import SearchComponent from "@/components/core/SearchComponent";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ padding: 16, gap: 20 }}>
      <HeaderComponent />
      <SearchComponent />
      <FolderComponent />
    </SafeAreaView>
  );
}
