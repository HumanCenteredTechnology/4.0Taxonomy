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

    const [ howManyNeeds, setHowManyNeeds] = useState({})
    const [ howManyTech, setHowManyTech] = useState({})
    const [ howManyDates, setHowManyDates] = useState({})
    const [ howManySourceTypes, setHowManySourceTypes] = useState({})

    const applyFilters = async () => {
        setFilterLoading(true)
        let updatedResults = fetchedResults.result_list
        // Needs Filter
        if (selectedNeeds.length != 0) {
            updatedResults = await updatedResults.filter(
            (art) => selectedNeeds.every( filterNeed => art.tax_keywords.needs.includes(filterNeed)))
        }
        // Tech Filter
        if (selectedTech.length != 0) {
            updatedResults = await updatedResults.filter(
            (art) => selectedTech.every( filterTech => art.tax_keywords.tech.includes(filterTech)))
        }
        // Date Filter
        if (selectedDate.length != 0) {
            updatedResults = await updatedResults.filter(
            (art) => selectedDate.some( filterDate => art.publishing_date.slice(-4).includes(filterDate)))
            // manca il caso in cui non c'è la data
        }
        // Source Type Filter
        if (selectedSourceType.length != 0) {
            updatedResults = await updatedResults.filter(
                (art) => selectedSourceType.some( type =>art.source_type.includes(type)))
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
                    needs: findNeeds(),
                    tech: findTech()
                  },
                  publishing_date: findDates(),
                  source_type: findTypeFilters()
                };
              });
            console.log(filters)
    }, [filteredResults])

    const findNeeds = () => {
        let needs = [""]
        filteredResults.map( art => art.tax_keywords.needs.every(need => needs.push(need)))
        setHowManyNeeds(reduceFilters(needs))
        return needs
    }

    const findTech = () => {
        let tech = [""]
        filteredResults.map( art => art.tax_keywords.tech.every(singleTech => tech.push(singleTech)))
        setHowManyTech(reduceFilters(tech))
        return tech
    }

    const findDates = () => {
        let dates = [""]
        fetchedResults.result_list.map( art => dates.push(art.publishing_date.slice(-4)))
        setHowManyDates(reduceFilters(dates))
        return dates
    }

    const findTypeFilters = () => {
        let types = [""];
        fetchedResults.result_list.map( art => types.push(art.source_type))
        setHowManySourceTypes(reduceFilters(types))
        return types
    }

    const reduceFilters = (array) => {
        let newObject =  array.reduce((allElements, element)=> {
            const currCount = allElements[element] ?? 0;
            return {
                ...allElements,
                [element]: currCount + 1
            }
        })
        return newObject;
    }

    return{ 
        filterLoading, filteredResults, setFilteredResults, filters, setFilters, 
        selectedNeeds, selectedTech, selectedDate, selectedSourceType,
        onSelectNeeds, onSelectTech, onSelectDate, onSelectSourceType,
        howManyNeeds, howManyTech, howManyDates, howManySourceTypes
    }
}