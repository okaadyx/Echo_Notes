import { Settings2, Calendar } from "@tamagui/lucide-icons";
import React from "react";
import { Button, H2, XStack, Text } from "tamagui";

interface ExploreHeaderProps {
  sortBy: "date" | "tags" | null;
  onSort: (type: "date" | "tags") => void;
}

const ExploreHeader = ({ sortBy, onSort }: ExploreHeaderProps) => {
  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal={20}
      paddingVertical={15}
    >
      <H2 fontWeight="800" color="$color">
        All{"\n"}Notes
      </H2>
      <XStack gap={10}>
        <Button
          size="$3"
          backgroundColor={sortBy === "date" ? "$blue10" : "$backgroundFocus"}
          borderRadius={20}
          icon={<Calendar size={16} color={sortBy === "date" ? "white" : "$color"} />}
          onPress={() => onSort("date")}
          pressStyle={{ opacity: 0.7 }}
        >
          <Text
            color={sortBy === "date" ? "white" : "$color"}
            fontWeight="600"
          >
            Date
          </Text>
        </Button>
        <Button
          size="$3"
          backgroundColor={sortBy === "tags" ? "$blue10" : "$backgroundFocus"}
          borderRadius={20}
          icon={<Settings2 size={16} color={sortBy === "tags" ? "white" : "$color"} />}
          onPress={() => onSort("tags")}
          pressStyle={{ opacity: 0.7 }}
        >
          <Text
            color={sortBy === "tags" ? "white" : "$color"}
            fontWeight="600"
          >
            Tags
          </Text>
        </Button>
      </XStack>
    </XStack>
  );
};

export default ExploreHeader;
