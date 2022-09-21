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
            let artTypes = checkType(selectedSourceType);
            updatedResults = updatedResults.filter(
            (art) => artTypes.every( type => art.source_type.includes(type)))
        }
        setFilteredResults(updatedResults)
        

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
            setFilters(oldFilters => {
                return {
                  ...oldFilters,
                  publishing_date: findDates(),
                  source_type: findTypeFilters()
                };
              });
            console.log(filters)
    }, [filteredResults])

    const findDates = () => {
        let dates = [""]
        fetchedResults.result_list.map( art => dates.push(art.publishing_date.slice(-4)))
        setHowManyDates(dates.reduce((allDates, date) => {
            const currCount = allDates[date] ?? 0;
            return {
              ...allDates,
              [date]: currCount + 1,
            };
        }));
        return dates
    }

    const findTypeFilters = () => {
        let originalTypes = [];
        let convertedTypes = [];
        fetchedResults.result_list.map 
        ( art => {
            originalTypes.push(art.source_type)
        }) 
        if (originalTypes.includes("Consulting article", "Industry article", "White paper", "Use case", "Product page"))
            convertedTypes.push("Industry");
        if (originalTypes.includes("Journal paper", "Conference paper"))
            convertedTypes.push("Academia")
        return convertedTypes
    }

    const checkType = () => {
        let check = []
        if (selectedSourceType.includes("Industry")) check.push("Consulting article", "Industry article", "White paper", "Use case", "Product page")
        if (selectedSourceType.includes("Academia")) check.push("Journal paper", "Conference paper")
        console.log(check)
        return check;
    }

    return{ 
        filteredResults, setFilteredResults, filters, setFilters, 
        selectedNeeds, selectedTech, selectedDate, selectedSourceType,
        onSelectNeeds, onSelectTech, onSelectDate, onSelectSourceType,
        howManyDates
    }
}