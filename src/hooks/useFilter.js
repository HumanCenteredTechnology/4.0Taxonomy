import { useState, useEffect } from "react";
import API from "../API.js";

import jsonEx from "../SERP results example.json"
const resultsTest = JSON.parse(JSON.stringify(jsonEx))
  
//resultTest sarà fetchedResults
export const useFilter = (fetchedResults) => {
    /* 'resultsTemp' dovrà diventare results quando sarà integrata con le Api */
    const [ filteredResults, setFilteredResults ] = useState([...fetchedResults.result_list]);
    const [ filterLoading, setFilterLoading] = useState(false);
    
    const [filters, setFilters] = useState({topics: fetchedResults.filter_topics, publishing_date: [], source_type: []});
    const [ selectedNeeds, setSelectedNeeds] = useState ([]);
    const [ selectedTech, setSelectedTech] = useState ([]);
    const [ selectedDate, setSelectedDate] = useState ([]);
    const [ selectedSourceType, setSelectedSourceType] = useState ([]);

    const [ howManyDates, setHowManyDates] = useState({})

    const applyFilters = async () => {
        setFilterLoading(true)
        let updatedResults = fetchedResults.result_list
        // Needs Filter
        if (selectedNeeds) {
            updatedResults = await updatedResults.filter(
            (art) => selectedNeeds.every( filterNeed => art.tax_keywords.needs.includes(filterNeed)))
        }
        // Tech Filter
        if (selectedTech) {
            updatedResults = await updatedResults.filter(
            (art) => selectedTech.every( filterTech => art.tax_keywords.tech.includes(filterTech)))
        }
        // Date Filter
        if (selectedDate) {
            updatedResults = await updatedResults.filter(
            (art) => selectedDate.every( filterDate => art.publishing_date.slice(-4).includes(filterDate)))
            // manca il caso in cui non c'è la data
        }
        // Source Type Filter
        if (selectedSourceType) {
            let artTypes = checkType();
            updatedResults = await updatedResults.filter(
            (art) => artTypes.every( type => {    
                console.log(type)            
                art.source_type.includes(type)}))
        }
        setFilteredResults(updatedResults)
        setFilterLoading(false)
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
        //let dates = !selectedDate ? findDates() : "";
            setFilters(oldFilters => {
                return {
                  ...oldFilters,
                  topics: {
                    ...oldFilters.topics,
                    needs: findNeeds()
                  },
                  publishing_date: findDates(),
                  source_type: findTypeFilters()
                };
              });
            console.log(filters)
    }, [filteredResults])

    const findNeeds = () => {
        let needs = [""]
        filteredResults.map( art => needs.push(art.needs))
        return needs
    }

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
        return check;
    }

    return{ 
        filterLoading, filteredResults, setFilteredResults, filters, setFilters, 
        selectedNeeds, selectedTech, selectedDate, selectedSourceType,
        onSelectNeeds, onSelectTech, onSelectDate, onSelectSourceType,
        howManyDates
    }
}