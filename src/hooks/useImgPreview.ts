import { useState, ChangeEvent, useEffect } from "react";

const useImgPreview = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const getPreviewImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files?.length != undefined &&
      event.target.files?.length > 0
    ) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }
    const IMAGE = URL.createObjectURL(selectedFile);
    setPreview(IMAGE);

    return () => URL.revokeObjectURL(IMAGE);
  }, [selectedFile]);

  return { preview, getPreviewImage, selectedFile };
};

export default useImgPreview;
