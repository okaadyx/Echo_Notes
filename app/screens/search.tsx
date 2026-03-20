import { useSelector } from "react-redux";
import { Text, YStack } from "tamagui";

export default function SearchScreen() {
  const query = useSelector((state: any) => state.query.query);
  return (
    <YStack>
      <Text>{query}</Text>
    </YStack>
  );
}
