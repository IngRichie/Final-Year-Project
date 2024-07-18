import axios from 'axios';
// import { GEMINI_API_KEY } from '@env';

const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function chatWithGemini(userMessage: string): Promise<string> {
  try {
    const response = await axios.post(
      `${API_URL}?key=AIzaSyBPjKFlK23C3Chn1GJsqKcoYAD-JcY997Y`,
      {
        contents: [
          {
            parts: [
              {
                text: userMessage,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const responseData = response.data;

    const responseText = responseData.candidates[0]?.content?.parts[0]?.text || '';

    return responseText;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }
}
