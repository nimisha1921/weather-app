import React from 'react'

export default function CurrentLocation({data}) {
    return (
        <div className="card">
            <div className="container">
                <p>Name: { data.name }</p>
                <p>Latitude: { data.lat } Longitude: { data.lon }</p>
                <p>Region: { data.region} </p>
                <p>Country: { data.country} </p>
                <p>Time Zone: { data.tz_id} </p>

            </div>
        </div>
    )
}
