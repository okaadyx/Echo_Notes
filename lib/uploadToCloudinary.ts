const CLOUDINARY_URL = process.env.EXPO_PUBLIC_CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET =
  process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const uploadToCloudinary = async (imageUri: any) => {
  const data = new FormData();
  data.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: `${Date.now()}.jpg`,
  } as any);
  data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET ?? "echo-notes");

  const response = await fetch(
    CLOUDINARY_URL ?? "https://api.cloudinary.com/v1_1/dskpqdqqg/image/upload",
    {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  const result = await response.json();
  return result.secure_url;
};

export default uploadToCloudinary;
