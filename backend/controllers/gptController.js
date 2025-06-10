const OpenAI = require("openai");
const Course = require("../models/Course"); 

const openai = new OpenAI.OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getGptRecommendations = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant. Given a career goal, respond ONLY with 5 related course topics (not sentences), separated by commas." },
        { role: "user", content: prompt }
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    const raw = completion.choices[0].message.content;
    const keywords = raw.split(',').map(word => word.trim().toLowerCase());

    const matchingCourses = await Course.find({
      $or: [
        { title: { $regex: keywords.join("|"), $options: "i" } },
        { description: { $regex: keywords.join("|"), $options: "i" } }
      ]
    }).populate("instructor", "name");

    res.json({ keywords, courses: matchingCourses });

  } catch (error) {
    console.error("GPT Course Recommendation Error:", error);
    res.status(500).json({ message: "Failed to fetch recommendations" });
  }
};
