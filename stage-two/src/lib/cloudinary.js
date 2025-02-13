export const uploadProfileImage = async (imageBase64) => {
  if (!imageBase64) return null;

  const formData = new FormData();
  formData.append("file", imageBase64); // ✅ Base64 goes here
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );
  formData.append("folder", "profile");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: formData, // ✅ Correct format (multipart/form-data)
      }
    );

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};
