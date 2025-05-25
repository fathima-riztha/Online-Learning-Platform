import { useState } from "react";
import { getGptRecommendations } from "../api/api";

const GptRecommendation = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await getGptRecommendations(prompt);
      setResult(response.data.recommendation);
    } catch (err) {
      setError("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">ChatGpt</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={4}
          className="w-full p-2 border mb-4"
          placeholder="Enter your career goal or prompt, e.g., 'I want to be a software engineer...'"
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
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded whitespace-pre-line">
          {result}
        </div>
      )}
    </div>
  );
};

export default GptRecommendation;
