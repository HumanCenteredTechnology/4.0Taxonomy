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
    /*     const results = await fetch(`${API_URL}`, {
          //mode: "no-cors", //c'è bisogno di fare il controllo del ritorno (result.json())
          ...defaultSettings,
          body: JSON.stringify(searchMention),  //
        }); */
    const results = await fetch(`${API_URL}`, {
      //mode: "no-cors", //c'è bisogno di fare il controllo del ritorno (result.json())
      method: "POST",
      body: searchMention  //
    });
    /* if (results.ok) {   //se riceve risposta dalle api
      console.log("received")
    } else {
      console.log("not received")
    } */
    //const data = await results.json();
    const res = await results.json()
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
    return data;
  },
  submitArticle: async (article) => {   //invia un articolo

    const formData = new FormData();

    formData.append('title', article.title)
    formData.append('abstract', article.abstract)
    formData.append('body', article.body)

    console.log(JSON.stringify(Object.fromEntries(formData.entries())))
    //prepara l'articolo in formato leggibile dalle API
    /* const dataToSend = {
      path: "/add_article",
      method: "POST",
      title: formData.title,
      abstract: formData.abstract,
      body: formData.body
    } */

    /* const resp = await fetch(`${API_URL}`, {
      path: "/add_article",
      method: "POST",
    }) */
    /* const data = await JSON.parse(JSON.stringify(articleToSend)); //prima rende stringa le chiavi dell'oggetto poi trasforma in json
    console.log(data); */
    const data = {
      "verified_entities":
        [
          ["Smart warehouse", "Supply Chain", "Problems", ["Link to Article", "Link to Article"]],
          ["Tableau", "Advanced reporting and self-service business intelligence tools", "Technology", ["Link to Article ", "Link To Article"]],
          ["Smart warehouse", "Supply Chain", "Problems", ["Link to Article", "Link to Article"]],
          ["Tableau", "Advanced reporting and self-service business intelligence tools", "Technology", ["Link to Article ", "Link To Article"]]

        ],
      "unverified_entities":
        [
          ["Computer", "Supply Chain", "Problems", ["Link to Article", "Link to Article"]],
          ["Tableau", "Advanced reporting and self-service business intelligence tools", "Technology", ["Link to Article ", "Link To Article"]]
        ]
    }
    return data

  }
};

export default apiSettings;
