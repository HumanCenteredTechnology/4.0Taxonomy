import { useState, useEffect } from "react";
import API from "../API.js";

import jsonEx from "../SERP results example.json"
const resultsTest = JSON.parse(JSON.stringify(jsonEx))
  
//resultTest sarà fetchedResults
export const useFilter = (fetchedResults) => {
    /* 'resultsTemp' dovrà diventare results quando sarà integrata con le Api */
    const [ filteredResults, setFilteredResults ] = useState([...fetchedResults.result_list]);
    
    const [filters, setFilters] = useState({topics: fetchedResults.filter_topics, publishing_date: [], source_type: []});
    const [ selectedNeeds, setSelectedNeeds] = useState ([]);
    const [ selectedTech, setSelectedTech] = useState ([]);
    const [ selectedDate, setSelectedDate] = useState ([]);
    const [ selectedSourceType, setSelectedSourceType] = useState ([]);

    const [ howManyDates, setHowManyDates] = useState({})

    const findTypeFilters = () => {
        let originalTypes = [];
        let convertedTypes = [];
        filteredResults.map 
        ( art => {
            originalTypes.push(art.source_type)
        }) 
        if (originalTypes.includes("Consulting article", "Industry article", "White paper", "Use case", "Product page"))
                convertedTypes.push("Industry");
            if (originalTypes.includes("Journal paper", "Conference paper"))
                convertedTypes.push("Academia")
        return {
            ...convertedTypes
        }
    }
    const inferArtSourceType = (art) => {
        let type;
        if (art.hasOwnProperty('source_type')){
            switch (art.source_type){
                case "Consulting article": type = "Industry"; break;
                case "Industry article": type =  "Industry"; break;
                case "White paper": type =  "Industry"; break;
                case "Product page": type =  "Industry"; break;
                case "Journal paper": type =  "Academia"; break;  
                case "Conference paper": type =  "Academia"; break;      
                default: type = "not_found"; break;
            }
            return type;
            /* setFilters((oldFilters) => ({
            ...oldFilters,
            source_type: [...filters.source_type, type],
            }));  */
        }
    }
    const applyFilters = () => {
        let updatedResults = fetchedResults.result_list
        // Needs Filter
        if (selectedNeeds) {
            updatedResults = updatedResults.filter(
            (art) => selectedNeeds.every( filterNeed => art.tax_keywords.needs.includes(filterNeed)))
        }
        // Tech Filter
        if (selectedTech) {
            updatedResults = updatedResults.filter(
            (art) => selectedTech.every( filterTech => art.tax_keywords.tech.includes(filterTech)))
        }
        // Date Filter
        if (selectedDate) {
            updatedResults = updatedResults.filter(
            (art) => selectedDate.every( filterDate => art.publishing_date.slice(-4).includes(filterDate)))
        }
        // Source Type Filter
        if (selectedSourceType) {
            let artType;
            updatedResults = updatedResults.filter(
            (art) => 
               /*  if (art.source_type.includes("Consulting article", "Industry article", "White paper", "Use case", "Product page"))
                    artType = "Industry"
                if (art.source_type.includes("Journal paper", "Conference paper"))
                    artType = "Academia"
                    console.log(artType) */
                selectedSourceType.every( filterSourceType => art.source_type.includes(filterSourceType)))
        }
        setFilteredResults(updatedResults)
        console.log(filters)

    }

    const onSelectNeeds = (checked) => {
        setSelectedNeeds ([...checked])
    }
    const onSelectTech = (checked) => {
        setSelectedTech ([...checked])
    }
    const onSelectDate = (checked) => {
        setSelectedDate ([...checked])
    }
    const onSelectSourceType = (checked) => {
        setSelectedSourceType ([...checked])
    }


    useEffect (()=> {
        applyFilters();
    }, [selectedNeeds, selectedTech, selectedDate, selectedSourceType])

    useEffect (()=> {
            //filteredResults.map( art => inferSourceType(art)) // questo è per applicare il fitro sulla source
            /* setFilters(oldFilters => {
                return {
                  ...oldFilters,
                  source_type: findTypeFilters(),
                };
              }); */
            setFilters(oldFilters => {
                return {
                  ...oldFilters,
                  publishing_date: findDates()
                };
              });
            console.log(filters)
    }, [filteredResults])

    const findDates = () => {
        let dates = [""]
        filteredResults.map( art => dates.push(art.publishing_date.slice(-4)))
        setHowManyDates(dates.reduce((allDates, date) => {
            const currCount = allDates[date] ?? 0;
            return {
              ...allDates,
              [date]: currCount + 1,
            };
        }));
        return dates
    }

    

    return{ 
        filteredResults, setFilteredResults, filters, setFilters, 
        selectedNeeds, selectedTech, selectedDate, selectedSourceType,
        onSelectNeeds, onSelectTech, onSelectDate, onSelectSourceType,
        howManyDates
    }
}