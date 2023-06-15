import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

export default function useFirebaseImage(getValues, setValue, nameValue) {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  if (!getValues || !setValue) return;
  const handleUploadImage = (file, nameInput) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          default:
            console.log("not");
        }
      },
      (error) => {
        console.log("err");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (nameInput === "imageBg") {
            setValue(nameValue, {
              ...getValues("imageUser"),
              imageBg: downloadURL,
            });
          }
          if (nameInput === "imageAvt") {
            setValue(nameValue, {
              ...getValues("imageUser"),
              imageAvt: downloadURL,
            });
          }
          setImage(downloadURL);
        });
      }
    );
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    const nameInput = e.target.name;
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file, nameInput);
  };

  const handleDeleteImage = () => {
    const storage = getStorage();

    const imageRef = ref(storage, "images/" + getValues("image_name"));

    deleteObject(imageRef)
      .then(() => {
        setImage("");
        setProgress(0);
        console.log("successfully");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return {
    setImage,
    image,
    progress,
    setProgress,
    handleSelectImage,
    handleDeleteImage,
  };
}
