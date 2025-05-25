const OpenAI = require("openai");

const openai = new OpenAI.OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getGptRecommendations = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ message: "Prompt is required" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that recommends courses." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const recommendation = completion.choices[0].message.content;
    res.json({ recommendation });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ message: "Failed to fetch course recommendations" });
  }
};
