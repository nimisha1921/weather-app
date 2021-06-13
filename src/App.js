import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Location from './Location';
//container
import React, { useEffect, useState } from 'react';
import Weather from './Weather';

function App() {
    const [location, setLocation] = useState('')

    return <React.Fragment>
            <div className="header">
                <span>Weather React/NodeJs Application</span>
            </div>
            <div className="container" >
                <Location submitLocation={(location) => setLocation(location)}/>
                <hr></hr>
                <Weather location={location} />
            </div>
        </React.Fragment>
}

export default App;
