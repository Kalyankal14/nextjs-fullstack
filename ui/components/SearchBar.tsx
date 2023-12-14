'use client';

import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@material-tailwind/react";

function debounce(callback: (value: any) => void, delay = 500) {
    let timer: any;
    return (value: any) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    }
};

export default function SearchBar({ search }: any) {
    const [searchText, setSearchText] = useState('text');
    const [courses, setCourses] = useState([]);
    const getCourses = () => {
        const API_URL = `/api/courses?query=${searchText}`;
        console.log(": Search Value changed ::", searchText, API_URL);
        fetch(API_URL)
            .then(res => res.json())
            .then(console.log)
    }

    const debounceApi = useCallback(debounce(async (text: any) => {

        // API Call
        const api = await fetch(`/api/courses?query=${text}`);
        const dataApi = await api.json();

        // NextJS Server Action
        const data = await search(text);

        setCourses(data);
    }, 500), [])

    useEffect(() => {
        console.log(":: useEffect ::", searchText);
        debounceApi(searchText);
    }, [searchText]);

    return (
        <>
            <div className="input-group">
                <Input
                    crossOrigin={"true"}
                    value={searchText}
                    type="text"
                    className="input"
                    placeholder="Enter a Course Name"
                    onChange={e => setSearchText(e.target.value)} />
                <p>Search Word: {searchText}</p>
                {courses.map((course: any) => <li>{course.title}</li>)}
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
                crossOrigin={"true"}
                value={this.state.searchText}
                type="text"
                className="input"
                placeholder="Enter a Course Name"
                onChange={e => this.setSearchText(e.target.value)} />
            <p>Search Word: {this.state.searchText}</p>
        </div>
    }
}