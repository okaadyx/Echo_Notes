import { queryClient } from "@/lib/QueryClient";
import uploadToCloudinary from "@/lib/uploadToCloudinary";
import { api } from "@/services";
import { Camera, Pencil } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, ToastAndroid } from "react-native";
import { Button, Input, Text, XStack, YStack } from "tamagui";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined,
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.user.getUser(),
  });

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
      if (data.avatar_url) {
        setProfileImage(data.avatar_url);
      }
    }
  }, [data]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const takeImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the camera is required.",
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const updateProfile = async () => {
    try {
      if (!data) return;
      setIsUpdating(true);
      let imageUrl = profileImage;
      if (profileImage && profileImage.startsWith("file")) {
        imageUrl = await uploadToCloudinary(profileImage);
      }

      await api.user.update({
        name,
        email,
        avatar_url: imageUrl,
      });

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      ToastAndroid.show("Profile Updated Successfully", ToastAndroid.SHORT);
    } catch (error: any) {
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size={"large"} />
      </YStack>
    );
  }
  return (
    <YStack flex={1} backgroundColor="$background" padding={24}>
      <YStack alignItems="center" marginTop={20}>
        <YStack width={110} height={110} position="relative">
          <Image
            source={{
              uri: profileImage || "https://i.pravatar.cc/300",
            }}
            style={{ width: "90%", height: "98%", borderRadius: 50 }}
          />

          <YStack
            position="absolute"
            bottom={4}
            right={4}
            width={32}
            height={32}
            borderRadius={16}
            backgroundColor="$blue10"
            justifyContent="center"
            alignItems="center"
            borderWidth={2}
            borderColor="$background"
            elevation={4}
            onPress={takeImage}
          >
            <Camera size={16} color="white" />
          </YStack>
        </YStack>
        <Text
          marginTop={12}
          fontSize={14}
          color="$blue10"
          fontWeight="600"
          onPress={pickImage}
        >
          Change Photo
        </Text>
      </YStack>

      <YStack marginTop={32}>
        <Text
          fontSize={12}
          color="$gray10"
          fontWeight="700"
          marginBottom={8}
          letterSpacing={1}
        >
          FULL NAME
        </Text>

        <XStack
          alignItems="center"
          borderWidth={1}
          borderColor="$gray4"
          borderRadius={16}
          paddingHorizontal={16}
          height={54}
          backgroundColor="$gray2"
          focusStyle={{ borderColor: "$blue10", backgroundColor: "$gray1" }}
        >
          <Input
            flex={1}
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
            placeholderTextColor="$gray8"
            backgroundColor="transparent"
            borderWidth={0}
            fontSize={16}
          />

          <Pencil size={18} color="$gray9" />
        </XStack>
      </YStack>

      <YStack marginTop={24}>
        <Text
          fontSize={12}
          color="$gray10"
          fontWeight="700"
          marginBottom={8}
          letterSpacing={1}
        >
          EMAIL ADDRESS
        </Text>

        <XStack
          alignItems="center"
          borderWidth={1}
          borderColor="$gray4"
          borderRadius={16}
          paddingHorizontal={16}
          height={54}
          backgroundColor="$gray2"
          focusStyle={{ borderColor: "$blue10", backgroundColor: "$gray1" }}
        >
          <Input
            flex={1}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            placeholderTextColor="$gray8"
            backgroundColor="transparent"
            borderWidth={0}
            fontSize={16}
          />

          <Pencil size={18} color="$gray9" />
        </XStack>
      </YStack>

      <Button
        marginTop="auto"
        height={56}
        borderRadius={16}
        backgroundColor="$blue10"
        pressStyle={{ scale: 0.98, opacity: 0.9 }}
        onPress={updateProfile}
        elevation={5}
      >
        {isUpdating ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text color="white" fontSize={16} fontWeight="700">
            Save Changes
          </Text>
        )}
      </Button>
    </YStack>
  );
}
