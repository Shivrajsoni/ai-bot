
import { GoogleGenerativeAI } from "@google/generative-ai";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

const validRoles = ["user", "model"];

function filterValidMessages(messages: { role: string; content: string }[]) {
  return messages.filter((msg) => validRoles.includes(msg.role));
}

 const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
 const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    // Filter only valid roles
    const filteredMessages = filterValidMessages(messages);

    const formattedMessages = filteredMessages.map((msg: { role: string; content: string }) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const result = await model.generateContent({ contents: formattedMessages });

    if (!result || !result.response) {
      console.error("error in llm model ", result);
      return NextResponse.json({ error: "No response Generated from LLM" }, { status: 500 });
    }

    const response = result.response;
    const text = response.text();
    return NextResponse.json({ text });

  } catch (error) {
    console.error(`Error Generating Content`, error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}