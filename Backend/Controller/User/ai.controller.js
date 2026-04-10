import Groq from "groq-sdk";
import { ApiResponse } from "../../utils/ApiResponse.js";

const groq = new Groq({ apiKey: process.env.GROQ_API });

export const getAIResponse = async (req, res, next) => {
  try {
    const { data } = req.body;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are the AI assistant for Cool Service Store, a premium home appliance repair and maintenance service. You help customers with AC repair, plumbing, electrical issues, and general appliance maintenance. Be professional, direct, and empathetic. If asked about booking, guide them to the booking page.",
        },
        {
          role: "user",
          content: data,
        },
      ],
      model: "llama-3.3-70b-versatile", // Upgraded to more capable model
    });

    const reply =
      chatCompletion.choices[0]?.message?.content ||
      "I'm sorry, I couldn't process that request.";
    return res
      .status(200)
      .json(new ApiResponse(200, { text: reply }, "AI Response fetched"));
  } catch (error) {
    console.error("[AI-Controller] Error:", error);
    next(error);
  }
};
