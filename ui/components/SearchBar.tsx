'use client';

import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@material-tailwind/react";

let count = 0;
function getCount() {
    count++;
    return count;
}



function debounce(callback: (value: any) => void, delay = 500) {
    let timer: any;
    return (value: any) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    }
};

// const fn = debounce(() => {}, 1000);
// fn(); -> () => {}

export default function SearchBar({ searchCallback }: any) {
    const [searchText, setSearchText] = useState('text');
    const getCourses = () => {
        const API_URL = `/api/courses?query=${searchText}`;
        console.log(": Search Value changed ::", searchText, API_URL);
        fetch(API_URL)
            .then(res => res.json())
            .then(console.log)
    }

    const debounceApi = useCallback( debounce((text: any) => {
        console.log(":: debounceApi ::", text)
    }, 500), [])

    useEffect(() => {
        /*
        console.log(":: USE EFFECT searchText", searchText)
        let timer = setTimeout(getCourses, 500)
        return () => {
            console.log(":: USE EFFECT searchText in RETURN", searchText);
            clearTimeout(timer)
        }
        */
        console.log(":: useEffect ::", searchText);
        debounceApi(searchText);
    }, [searchText]);

    /*
        searchText = ""; old
        searchText = "b" new
    */


    return (
        <>
            <div className="input-group">
                <Input
                    crossOrigin={true}
                    value={searchText}
                    type="text"
                    className="input"
                    placeholder="Enter a Course Name"
                    onChange={e => setSearchText(e.target.value)} />
                <p>Search Word: {searchText}</p>
            </div>
        </>
    )
}


 class Search extends React.Component {

    state = {
        searchText: ""
    }

    constructor(props: any) {
        super(props);
    }

    debounceApiCall = debounce(() => {
        console.log(":Invoking: DebounceCall", this.state.searchText)
    }, 2000)

    setSearchText = (value: any) => {
        this.setState({
            searchText: value
        });
        console.log(": setSearchText :", value);
        this.debounceApiCall(value);
    }

    render() {
        return <div className="input-group">
            <Input
                crossOrigin={true}
                value={this.state.searchText}
                type="text"
                className="input"
                placeholder="Enter a Course Name"
                onChange={e => this.setSearchText(e.target.value)} />
            <p>Search Word: {this.state.searchText}</p>
        </div>
    }
}