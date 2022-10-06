const API_URL = "http://localhost:5000/";



const apiSettings = {
  fetchAutocomplete: async (query) => {
    const response = await fetch(`${API_URL}search?word=${query}`, {
      method: "GET",
    });
    if (response.ok) {
      const data = response.json()
      JSON.parse(JSON.stringify(data))
      //console.log(await data)
      return data
    }
  },

  fetchResults: async (queryId) => {
    //se non c'è nessuna
    if (queryId === "" || queryId === undefined) return {};
    //prepara il form da inviare
    const formData = new FormData()
    formData.append('search-input', queryId)
    //fetch

    const results = await fetch(`${API_URL}`, {
      method: "POST",
      body: formData,
    });
    const data = await results.json()
    
    JSON.parse(JSON.stringify(data))
    
    return data;
    
    /* console.log(await data) */
    
    /* const data =
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
        ],
        "unrelated_elements":
        [
          ["Smart warehouse", "Supply Chain", "Problems", ["Link to Article", "Link to Article"]],
          ["Tableau", "Advanced reporting and self-service business intelligence tools", "Technology", ["Link to Article ", "Link To Article"]]
        ]
    } */
    
  },

  retrieveArticle: async (artId) => {
    const response = await fetch(`${API_URL}/article/${artId}`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json()
      JSON.parse(JSON.stringify(data))
      return data
    }
  },

  submitArticle: async (article) => {
    //prepara l'articolo come form
    const formData = new FormData();
    formData.append('title', article.title)
    formData.append('abstract', article.abstract)
    formData.append('body', article.body)

    //console.log(JSON.stringify(Object.fromEntries(formData.entries())))

    //invia il form
    const resp = await (await fetch(`${API_URL}add_article`, {
      method: "POST",
      body: formData
    })).json();
    //const data = await resp.json()
    //console.log(await resp)
    //JSON.parse(JSON.stringify(resp))
    /* const response = {
      "found_elements":
        [
          ["Smart warehouse", "Supply Chain", "Problems", ["Link to Article", "Link to Article"]],
          ["Tableau", "Advanced reporting and self-service business intelligence tools", "Technology", ["Link to Article ", "Link To Article"]],
          ["Smart warehouse", "Supply Chain", "Problems", ["Link to Article", "Link to Article"]],
          ["Tableau", "Advanced reporting and self-service business intelligence tools", "Technology", ["Link to Article ", "Link To Article"]]
 
        ],
      "not_found_elements":
        [
          ["Computer", "Supply Chain", "Problems", ["Link to Article", "Link to Article"]],
          ["Tableau", "Advanced reporting and self-service business intelligence tools", "Technology", ["Link to Article ", "Link To Article"]]
        ]
    } */

    return resp
  },

   /* Coding verso url */
  to_Url: (str) => {
    return encodeURIComponent(str)
  },

   /* Decoding da Url */
  from_Url: (str) => {
    return decodeURIComponent(str)
  }

};

export default apiSettings;
