const API_URL = "http://localhost:5000/";
//
const apiSettings = {
  fetchResults: async (searchMention) => {
    const results = await fetch(`${API_URL}`, {
      //mode: "no-cors", //c'è bisogno di fare il controllo del ritorno (result.json())
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchMention),
    });
    const data = await results.json();
    return data;
  },
  submitArticle: async (article) => {   //deve passare un articolo fornendogli un id
    const data = await JSON.parse(JSON.stringify(article)); //prima rende stringa le chiavi dell'oggetto poi trasforma in json
    console.log(data);

  }
};

export default apiSettings;
