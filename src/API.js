const API_URL = "http://localhost:5000/";
//
const apiSettings = {
  fetchResults: async (searchMention) => {
    //dovrà inviare solo la stringa searchMention e non un json
    const results = await fetch(`${API_URL}`, {
      //mode: "no-cors", //c'è bisogno di fare il controllo del ritorno (result.json())
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchMention),  //
    });
    //const data = await results.json();
    const data =
    {
      "topics":
        [
          ["Amazon Web Services", "Technology", "Link Wikipedia"],
          ["Predictive Maintenance", "Problems", "Link Wikipedia"]
        ],
      "related_elements":
        [
          ["Smart warehouse", "Supply Chain", ["Link to Article", "Link to Article"]],
          ["Tableau", "Advanced reporting and self-service business intelligence tools", "Technology", ["Link to Article ", "Link To Article"]]
        ]
    }
    JSON.parse(JSON.stringify(data))
    console.log(data)
    return data;
  },
  submitArticle: async (article) => {   //invia un articolo
    //prepara l'articolo in formato leggibile dalle API
    const articleToSend = {
      path: "/add_article",
      method: "POST",
      title: article.title,
      abstract: article.abstract,
      body: article.body
    }
    const data = await JSON.parse(JSON.stringify(articleToSend)); //prima rende stringa le chiavi dell'oggetto poi trasforma in json
    console.log(data);

  }
};

export default apiSettings;
