const API_URL = "http://localhost:5000/";
//

const defaultSettings = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
}

const apiSettings = {
  fetchResults: async (searchMention) => {
    //dovrà inviare solo la stringa searchMention e non un json
    const results = await fetch(`${API_URL}`, {
      //mode: "no-cors", //c'è bisogno di fare il controllo del ritorno (result.json())
      ...defaultSettings,
      body: JSON.stringify(searchMention),  //
    });
    /* if (results.ok) {   //se riceve risposta dalle api
      console.log("received")
    } else {
      console.log("not received")
    } */
    //const data = await results.json();
    const res = await results.json()
    console.log(res)
    const data =
    {
      "topics":
        [
          ["Amazon Web Services", "Technology", "Link Wikipedia"],
          ["Predictive Maintenance", "Problems", "Link Wikipedia"]
        ],
      "related_elements":
        [
          ["Smart warehouse", "Supply Chain", "Problems", ["Link to Article", "Link to Article"]],
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
