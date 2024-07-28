import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

export const uploadImageAsync = async (uri: string): Promise<string> => {
  if (!uri) {
    throw new Error("Cannot load an empty URL");
  }

  try {
    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const storage = getStorage();
    const user = getAuth().currentUser;
    if (!user) throw new Error("No user is currently signed in");

    const fileRef = ref(storage, `profileImages/${user.uid}`);
    await uploadBytes(fileRef, blob);

    blob.close();

    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  }
};
