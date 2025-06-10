
import { useState } from "react";
import { getGptRecommendations } from "../api/api";

const GptRecommendation = () => {
  const [prompt, setPrompt] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setKeywords([]);
    setCourses([]);

    try {
      const response = await getGptRecommendations(prompt);
      setKeywords(response.data.keywords || []);
      setCourses(response.data.courses || []);
    } catch (err) {
      setError("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">Course Recommendations Based on Your Goal</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          rows={4}
          className="w-full p-3 border mb-4"
          placeholder="Enter your goal, e.g., 'I want to be a software engineer'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {keywords.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">GPT Suggested Keywords:</h3>
          <p className="text-gray-700">{keywords.join(", ")}</p>
        </div>
      )}

      {courses.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Matched Courses from Our Platform:</h3>
          <ul className="space-y-4">
            {courses.map((course) => (
              <li key={course._id} className="p-4 border rounded shadow-sm bg-gray-50">
                <h4 className="text-xl font-bold">{course.title}</h4>
                <p className="text-gray-700">{course.description}</p>
                {course.instructor && (
                  <p className="text-sm text-gray-600 mt-1">Instructor: {course.instructor.name}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && !error && keywords.length === 0 && courses.length === 0 && (
        <p className="mt-6 text-gray-500">No results yet. Enter a goal above to get started.</p>
      )}
    </div>
  );
};

export default GptRecommendation;
