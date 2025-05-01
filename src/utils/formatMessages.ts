// utils/formatMessages.ts
export function formatMessagesForGemini(messages: any[]): any[] {
    return messages.map((msg) => ({
      role: msg.role, // 'user' | 'model'
      parts: [{ text: msg.content }] // rename 'content' or 'message' to 'parts'
    }));
  }