import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';
import dataUrl from './Service';
let debounceTimer;
let isSubscribed = true;
export default function Location(props) {
    const [location, setLocation] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const [showAuto, setAutoComplete] = useState(false);
    const [loader, setLoader] = useState(false);
    const [searchLocations, setSearchLocations] = useState([])
    useEffect(() => {

        return () => {
            isSubscribed = false;
            clearTimeout(debounceTimer)
        };
    }, [])

    const debounce = (func, delay) => {
        if (debounceTimer) {
            clearTimeout(debounceTimer)
        }
        debounceTimer = setTimeout(() => {
            func();
        }, delay)
    }

    const handleInputField = (value) => {
        setLocation(value);
        setCurrentLocation('');
        debounce(() => {
            if (location.length > 2) {
                setLoader(true);
                axios.get(dataUrl('search'), {
                    params: {
                        q: location
                    }
                }).then(res => {
                    if(isSubscribed && res.data.success) {
                        setSearchLocations(res.data.data);
                        setAutoComplete(true);
                        setLoader(false)
                    }
                }).catch(error => {
                    if(isSubscribed) {
                        toast.error(error.message)
                        setAutoComplete(false);
                        setLoader(false)
                    }
                })
            }
        }, 1000)
    }

    return (
        <React.Fragment>
            <label>City: </label>
            <div className="autocomplete">
                <input type="text" name="location" autoComplete="off" autoFocus value={location} placeholder="Ex. Gondia" onChange={(e) => handleInputField(e.target.value)} />
                { loader && <div className="loader"></div>}
                {showAuto && <div className="autocomplete-items">
                    {searchLocations.map((ele, index) => {
                        return <div key={index} onClick={() => {
                            setCurrentLocation(ele.name);
                            setLocation(ele.name);
                            setAutoComplete(false);
                        }}>{ele.name}</div>
                    })}
                    { searchLocations.length === 0 && <div>{'No Location Found.'}</div>}
                </div>}
            </div>
            <input type="submit" disabled={location.length <= 2} onClick={() => {
                if(isSubscribed) {
                    setAutoComplete(false);
                }
                if(currentLocation === "") {
                    toast.warn("Select city from dropdown.");
                } else {
                    props.submitLocation(currentLocation);
                }
            }}></input>
            { !showAuto && location.length <= 2 && <p className="small-info">* Write 2-3 character of city name for auto suggestion.</p>}
            <ToastContainer />
        </React.Fragment>

    );
}
