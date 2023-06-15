import { useState, useEffect } from "react";
import API from "../API.js";

const initialState =  {   
    id: "none",
    title: "none",
    source_type: "none",
    journal: "none",
    authors: ["none"],
    tax_keywords: 
        {
            needs: ["none"],
            tech: ["none"]
        },
    doi: "none",
    url: "none",
    publishing_date: "none",
    abstract: "none"
}

export const useResult = (articleId) => {
    const [article, setArticle] = useState(initialState);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const [found, setFound] = useState(false)

    useEffect(()=> {
        const retrieve = async () => {
            try {
              setError(false);
              setLoading(true);
              setFound(false)
              const retrieveArticle = await API.retrieveArticle(articleId);
              if (retrieveArticle === undefined) {
                setFound(false)
                //console.log("not found")
              } else {
                setArticle(retrieveArticle);
                setFound(true)
                //console.log("found")
              }
            } catch (error) {
              setError(true);
              //console.log(error);
            }
            setLoading(false);
          };
          retrieve()
          //console.log(article)
    }, [articleId])

    return {article, found};
}
