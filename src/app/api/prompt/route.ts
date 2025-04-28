
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;



const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
  try {
    const { prompt } =await req.json() ;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return NextResponse.json({ text });  // <<=== **YOU MUST RETURN IT**
    
  } catch (error) {
    console.error(`Error Generating Content`, error);
    return NextResponse.json({ error: 'Something went wrong' });  // <<=== RETURN this too
  }
}