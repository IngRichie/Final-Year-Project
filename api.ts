// import axios from 'axios';
// import { GEMINI_API_KEY } from '@env';

// const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// export async function chatWithGemini(userMessage: string): Promise<string> {
//   try {
//     const response = await axios.post(
//       `${API_URL}?key=AIzaSyBLul9jArDlgiX5Aa6vhL2d0ChmlvG7-80`,
//       {
//         contents: [
//           {
//             parts: [
//               {
//                 text: userMessage,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const responseData = response.data;

//     const responseText = responseData.candidates[0]?.content?.parts[0]?.text || '';

//     return responseText;
//   } catch (error) {
//     console.error('Error:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// }

const API_BASE_URL = 'http://localhost:8001';

export async function ingestFile(fileUrl: string) {
  const response = await fetch(`${API_BASE_URL}/ingestion/ingestFile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileUrl }),
  });

  if (!response.ok) {
    throw new Error('Failed to ingest file');
  }

  return await response.json();
}

export async function listIngestedFiles() {
  const response = await fetch(`${API_BASE_URL}/ingestion/listIngested`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to list ingested files');
  }

  return await response.json();
}

export async function deleteIngestedFile(docId: string) {
  const response = await fetch(`${API_BASE_URL}/ingestion/deleteIngested/${docId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete ingested file');
  }

  return await response.json();
}

export async function chatCompletion(messages: Array<{ content: string, role: string }>) {
  const response = await fetch(`${API_BASE_URL}/completion/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages, includeSources: true, useContext: true }),
  });

  if (!response.ok) {
    throw new Error('Failed to get chat completion');
  }

  return await response.json();
}

export async function promptCompletion(prompt: string) {
  const response = await fetch(`${API_BASE_URL}/completion/prompt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, includeSources: true, useContext: true }),
  });

  if (!response.ok) {
    throw new Error('Failed to get prompt completion');
  }

  return await response.json();
}
