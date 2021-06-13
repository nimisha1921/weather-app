import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dataUrl from './Service';
import CurrentLocation from './CurrentLocation';
import CurrentWeather from './CurrentWeather';
import { ToastContainer, toast } from 'react-toastify';

export default function Weather(props) {
    const [currentData, setCurrentData] = useState('');
    const [locationInfo, setLocationInfo ] = useState('');
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        let isSubscribed = true;

        if(props.location) {
            setLoader(true);
            axios.get(dataUrl('findWeather'), {
                params: {
                    q: props.location
                }
            }).then(res => {
                if(isSubscribed && res.data.success) {
                    setCurrentData(res.data.data.current);
                    setLocationInfo(res.data.data.location)
                    setLoader(false);
                }
            }).catch(error => {
                if(isSubscribed) {
                    setLoader(false);
                    toast.error(error.message)
                }
            })
        }

        return () => {
            isSubscribed = false;
        }
    }, [props.location])
    return (
        <React.Fragment>
            <div className="weather-container">
                { loader && <div className="loader"></div> }
                { !loader && locationInfo && <div style={{display: 'flex', flexGrow: 1}}>
                        <CurrentLocation data={locationInfo} />
                </div>}
                { !loader && currentData && <div style={{display: 'flex',  flexGrow: 6}}>
                        <CurrentWeather data={currentData} />
                </div>}
            </div>
            <ToastContainer />
        </React.Fragment>

    )
}
