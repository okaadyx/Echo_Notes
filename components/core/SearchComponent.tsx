import { Search } from "@tamagui/lucide-icons";
import React from "react";
import { Input, XStack } from "tamagui";

const SearchComponent = () => {
  return (
    <XStack
      borderWidth={1}
      borderColor={"white"}
      borderRadius={12}
      justifyContent="center"
      alignItems="center"
      backgroundColor={"#f1f5f9"}
    >
      <Search color={"#95a3b8"} />
      <Input
        color={"black"}
        placeholder="Search here.."
        backgroundColor={"#f1f5f9"}
        borderWidth={0}
        width={"90%"}
      />
    </XStack>
  );
};

export default SearchComponent;
