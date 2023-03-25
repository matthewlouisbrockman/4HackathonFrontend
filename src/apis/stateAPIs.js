//set API_ENDPOINT to the env for API_ENDPOINT
const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || "http://localhost:5000";

export const setupGame = async () => {
  const response = await fetch(`${API_ENDPOINT}/startGame`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
