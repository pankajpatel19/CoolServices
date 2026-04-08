import Groq from "groq-sdk";
import { ApiResponse } from "../../utils/ApiResponse.js";

const groq = new Groq({ apiKey: process.env.GROQ_API });

export const getAIResponse = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json(new ApiResponse(400, null, "Message required"));
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: data,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    const reply = chatCompletion.choices[0]?.message?.content || "";
    return res.status(200).json(new ApiResponse(200, { text: reply }, "AI Response fetched"));
  } catch (error) {
    console.error("Groq AI Error:", error);
    return res.status(500).json(new ApiResponse(500, null, "AI processing failed"));
  }
};
