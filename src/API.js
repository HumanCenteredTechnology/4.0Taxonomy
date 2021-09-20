const BASE_URL = "http://localhost:3000/data.json";

const apiSettings = {
  fetchResults: async (searchMention, page) => {
    const endpoint = searchMention ? `` : ``;
    return await (await fetch(endpoint)).json();
  },
};
