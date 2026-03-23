import { ChevronLeft, MoreVertical, Pin, Share2, Trash2 } from "@tamagui/lucide-icons";
import { Text, XStack } from "tamagui";

interface Props {
  title?: string;
  pinIcon?: boolean;
  isPinned?: boolean;
  handlePinNote?: () => void;
  onDelete?: () => void;
}

const NoteHeader = ({
  title,
  pinIcon,
  handlePinNote,
  isPinned,
  onDelete,
}: Props) => (
  <XStack
    paddingHorizontal={16}
    paddingVertical={12}
    alignItems="center"
    justifyContent="space-between"
    borderBottomWidth={1}
    borderBottomColor="$borderColor"
  >
    <XStack alignItems="center" gap={12}>
      <ChevronLeft size={24} color="$color" />
      <Text fontWeight="600" fontSize={16} color="$color">
        {title}
      </Text>
    </XStack>
    <XStack gap={16}>
      <Share2 size={20} color="$color" />

      {pinIcon ? (
        <Pin
          size={20}
          color={isPinned ? "$blue10" : "$gray8"}
          onPress={handlePinNote}
        />
      ) : (
        <MoreVertical size={20} color="$color" />
      )}
      {onDelete && (
        <Trash2 
          size={20} 
          color="$red10" 
          onPress={onDelete} 
        />
      )}
    </XStack>
  </XStack>
);

export default NoteHeader;