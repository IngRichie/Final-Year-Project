import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';
import { ingestFile as ingestFileApi, listIngestedFiles as listIngestedFilesApi, deleteIngestedFile as deleteIngestedFileApi } from './api';

async function blobToFile(blob: Blob, fileName: string): Promise<File> {
  const b = blob as any;
  b.lastModifiedDate = new Date();
  b.name = fileName;
  return b as File;
}

async function uploadFileToFirebase(file: File) {
  const storageRef = ref(storage, `documents/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

async function ingestFile(filePath: string) {
  const response = await fetch(filePath);
  const blob = await response.blob();
  const file = await blobToFile(blob, 'uploaded-file');
  const fileUrl = await uploadFileToFirebase(file);
  const ingestResponse = await ingestFileApi(fileUrl);
  console.log('File ingested:', ingestResponse);
}

async function listIngestedFiles() {
  const files = await listIngestedFilesApi();
  console.log('Ingested files:', files);
}

async function deleteIngestedFile(docId: string) {
  const response = await deleteIngestedFileApi(docId);
  console.log('File deleted:', docId);
}

export { ingestFile, listIngestedFiles, deleteIngestedFile };
