const API_URL = "http://localhost:5000/";
//
const apiSettings = {
  fetchResults: async (searchMention) => {
    /*     const api_call = await fetch(`${API_URL}`, {
      'method' : 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      searchMention: JSON.stringify(searchMention)
    });
    const data = await api_call.json();
    return await data; */
    const results = await fetch(`${API_URL}`, {
      //mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchMention),
    });
    return results;
  },
};

export default apiSettings;
