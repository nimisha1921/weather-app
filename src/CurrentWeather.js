import React from 'react'
import moment from 'moment';

export default function CurrentWeather({data}) {
    return (
        <div className="card">
            <div className="container">
                <div>
                    <img src={data.condition.icon} />
                    <p>{ data.condition.text }</p>
                </div>
                <p>Temp: { data.temp_c } <span>&#8451;</span>  Feels: {data.feelslike_c} <span>&#8451;</span> </p>
                <p>Humidity: {data.humidity} %</p>
                <p className="small-info">Last Update: {moment(data.last_updated).utcOffset("+05:30").format('LLLL')}</p>
            </div>
        </div>
    )
}
