import { Mic } from "@tamagui/lucide-icons";
import { Text, YStack } from "tamagui";

interface Props {
  tag: string;
}

const LogoIcon = ({ tag }: Props) => {
  return (
    <YStack alignItems="center" marginBottom={30}>
      <YStack
        width={80}
        height={80}
        borderRadius={24}
        backgroundColor="#4f46e5"
        justifyContent="center"
        alignItems="center"
        elevation={12}
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 8 }}
        shadowOpacity={0.2}
        shadowRadius={15}
      >
        <Mic size={38} color="white" />
      </YStack>

      <Text fontSize={28} fontWeight="800" marginTop={16} color="$color">
        EchoNotes
      </Text>

      <Text
        fontSize={14}
        color="$gray10"
        marginTop={6}
        textAlign="center"
        opacity={0.8}
        maxWidth={250}
      >
        {tag}
      </Text>
    </YStack>
  );
};

export default LogoIcon;