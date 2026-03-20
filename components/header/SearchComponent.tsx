import { setQuery } from "@/store/querySlice";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, XStack } from "tamagui";
const SearchComponent = () => {
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
    <XStack flex={1} alignItems="center">
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
    </XStack>
  );
};

export default SearchComponent;
