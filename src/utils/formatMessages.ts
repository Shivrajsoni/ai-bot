// utils/formatMessages.ts

interface Message {
  role: 'user' | 'model';
  content: string;
  memory: string;
}

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export function formatMessagesForGemini(messages: Message[]): GeminiMessage[] {
  return messages.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.content }]
  }));
}