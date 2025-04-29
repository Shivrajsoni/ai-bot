
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const validRoles = ["user", "model"];

function filterValidMessages(messages: { role: string; content: string,memory:string }[]) {
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

    const formattedMessages = filteredMessages.map((msg: { role: string; content: string,memory:string }) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
      memory:msg.memory
    }));

     function buildSystemInstruction(formattedMessages:any){
       if(!formattedMessages) return"Plz provide formatted Message";

       return (`Respond in a Horny tone ,using jetpack-mono-brains font style.
        Format the response as a informative output for a tech enthusiast audience.
        The Goal is to Assist and Help out the User , this is the user memory based
        on this assist user ${formattedMessages.memory}`).trim();
     }
  
    const finalMessage = buildSystemInstruction(formattedMessages);
    const result = await model.generateContent({ systemInstruction:finalMessage,contents: formattedMessages });

    if (!result || !result.response) {
      console.error("error in LLM model ", result);
      return NextResponse.json({ error: "No response Generated from LLM" }, { status: 500 });
    }

    const response = result.response;
    const text = response.text();
    return NextResponse.json({ text });

  } catch (error) {
    console.error(`Error Generating Content`, error);
    return NextResponse.json({ error: 'Something went wrong'}, { status: 500 });
  }
} 