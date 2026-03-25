import { X } from "@tamagui/lucide-icons";
import { setQuery } from "@/store/querySlice";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, XStack } from "tamagui";
const SearchInput = () => {
  const inputRef = useRef<any>(null);
  const dispatch = useDispatch();
  const query = useSelector((state: any) => state.query.query);
  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <XStack flex={1} alignItems="center" gap={10}>
      <Input
        ref={inputRef}
        value={query}
        flex={1}
        onChangeText={(text) => dispatch(setQuery(text))}
        placeholder="Search notes, ideas, and memories"
        placeholderTextColor="$gray11"
        backgroundColor="transparent"
        borderWidth={0}
        color="$color"
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        fontWeight="400"
      />
      {query?.trim()?.length > 0 && (
        <Button
          size="$2"
          circular
          chromeless
          icon={<X size={18} color="$gray10" />}
          onPress={() => dispatch(setQuery(""))}
          pressStyle={{ opacity: 0.5, backgroundColor: "$gray4" }}
        />
      )}
    </XStack>
  );
};

export default SearchInput;
