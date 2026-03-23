import React from "react";
import { ScrollView, Button, XStack, Text } from "tamagui";

interface Category {
  id: string | number;
  name: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategoryId: string | number;
  onSelectCategory: (id: string | number) => void;
}

const CategoryTabs = ({ categories, activeCategoryId, onSelectCategory }: CategoryTabsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      paddingHorizontal={20}
      marginBottom={20}
    >
      <XStack gap={10}>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            size="$3"
            borderRadius={20}
            backgroundColor={activeCategoryId === cat.id ? "$blue10" : "$backgroundFocus"}
            onPress={() => onSelectCategory(cat.id)}
            pressStyle={{ opacity: 0.8 }}
          >
            <Text
              color={activeCategoryId === cat.id ? "white" : "$color"}
              fontWeight="bold"
            >
              {cat.name}
            </Text>
          </Button>
        ))}
      </XStack>
    </ScrollView>
  );
};

export default CategoryTabs;
