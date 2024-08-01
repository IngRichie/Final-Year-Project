import { chatCompletion as chatCompletionApi, promptCompletion as promptCompletionApi } from './api';

async function handleChatCompletion(message: string) {
  const response = await chatCompletionApi([{ content: message, role: 'user' }]);
  return response;
}

async function handlePromptCompletion(prompt: string) {
  const response = await promptCompletionApi(prompt);
  return response;
}

export { handleChatCompletion, handlePromptCompletion };
