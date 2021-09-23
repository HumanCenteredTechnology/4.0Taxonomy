const API_URL = "http://localhost:5000/";
//
const apiSettings = {
  fetchResults: async (searchMention) => {
    const results = await fetch(`${API_URL}`, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchMention),
    });
    const data = await results.json();
    return data;
  },
};

export default apiSettings;
