import { useState, useEffect } from "react";
import API from "../API.js";

  
//resultTest sarà fetchedResults
export const useFilter = (resultsTest) => {
    /* 'resultsTemp' dovrà diventare results quando sarà integrata con le Api */
    const [ filteredResults, setFilteredResults ] = useState(resultsTest);
    

    const [ toFilterNeeds, setToFilterNeeds] = useState ([""]);
    const [ toFilterTech, setToFilterTech] = useState ([]);
    const [ toFilterDate, setToFilterDate] = useState ([]);
    const [ toFilterSourceType, setToFilterSourceType] = useState ([]);

    useEffect (()=>{
        if (!filteredResults === undefined){
            const filteredResults = filteredResults.result_list.filter(article => toFilterNeeds.every(filterNeed => article.needs.includes(filterNeed)))
            setFilteredResults(filteredResults)
        }
        
        //console.log (filteredResults)
    },[toFilterNeeds])
    useEffect (()=>{
        
    },[toFilterTech])

    return{ 
        filteredResults, setFilteredResults, 
        toFilterNeeds, setToFilterNeeds, 
        toFilterTech, setToFilterTech, 
        toFilterDate, setToFilterDate, 
        toFilterSourceType, setToFilterSourceType}
}