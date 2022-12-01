import axios from "axios";

const fetchImageUpload = async (image: File, folder: string) => {
  const formData = new FormData();
  const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const cloud_preset = process.env.NEXT_PUBLIC_CLOUD_PRESET;
  const cloud_key = process.env.NEXT_PUBLIC_CLOUD_KEY;

  formData.append("file", image);
  formData.append("api_key", cloud_key as string);
  formData.append("upload_preset", cloud_preset as string);
  formData.append("folder", folder)

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    formData
  );

  return res;
};

export default fetchImageUpload;
