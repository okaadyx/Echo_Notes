import { Link } from 'expo-router';
import { YStack, Text } from 'tamagui';

export default function ModalScreen() {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center" padding={20} backgroundColor="$background">
      <Text fontSize={24} fontWeight="bold" color="$color">This is a modal</Text>
      <Link href="/" dismissTo style={{ marginTop: 15, paddingVertical: 15 }}>
        <Text color="$blue10" fontSize={16}>Go to home screen</Text>
      </Link>
    </YStack>
  );
}
