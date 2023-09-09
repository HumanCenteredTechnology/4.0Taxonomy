const API_URL = "http://localhost:5000/";

const apiSettings = {
  fetchAutocomplete: async (query) => {
    const response = await fetch(`${API_URL}search?word=${query}`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;

    }
  },

  register: async (username, password, token) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password }),
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  login: async (username, password, token) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        return { ok: true, data };
      } else {
        const errorResponse = await response.json();
        return { ok: false, error: errorResponse.message }; // Restituisci il messaggio di errore dal server
      }
    } catch (error) {
      throw error;
    }
  },

  logout: async (username, token) => {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ username }),
      });
  
      if (!response.ok) {
        throw new Error('Errore durante il logout');
      }
    } catch (error) {
      throw error;
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
    
    console.log(await data) 
    
  },

  retrieveArticle: async (artId) => {
    const response = await fetch(`${API_URL}/article/${artId}`, {
      method: "GET",
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;       
    } else {
      console.log(response.status)
    }
  },

  submitArticle: async (article) => {
    //prepara l'articolo come form
    const formData = new FormData();
    formData.append('title', article.title)
    formData.append('link', article.link)
    formData.append('source type', article.sourceType)
    formData.append('journal', article.journal)
    formData.append('authors', article.authors)
    formData.append('doi', article.doi)
    formData.append('publication date', article.publicationDate)
    formData.append('abstract', article.abstract)

    console.log(JSON.stringify(Object.fromEntries(formData.entries())))

    try {
      const response = await fetch(`${API_URL}add_article`, {
        method: "POST",
        body: formData
      });
  
      if (!response.ok) {
        // Gestisci la risposta in caso di errore 
        throw new Error("Errore durante l'invio dell'articolo al server");
      }
  
      const responseData = await response.json(); // Converte la risposta JSON in un oggetto JavaScript

      return responseData;
    } catch (error) {
      // Gestisci gli errori in caso di problemi durante la richiesta o la risposta
      console.error("Errore durante l'invio dell'articolo al server:", error);
      throw error; // Rilancia l'errore per consentire la gestione in un livello superiore
    }
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
