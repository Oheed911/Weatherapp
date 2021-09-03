import React, { useState } from 'react';
const api = {
  key: "f749adf4b03e03f9ad77f34724a2da6e",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  let [cityname,setCityName]=useState('')
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery(''); 
        
        });
      
    }

  }

  const datePrinting = (d) => {
    let date = d.getDate();
    let month = [d.getMonth()];
    let year = d.getFullYear();

    return `${date} ${month} ${year}`
  }
  return (
    <div>
      <main>
        <div>
          <input 
            type="text"
            className="search-bar"
            placeholder="Enter"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.name != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date"> Date: {datePrinting(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {weather.main.temp}°c
            </div>
            <div className="weather">{weather.weather[0].description}</div>
          </div>
        </div>
        ) :(<div><h1>Entered city is not in the list</h1></div>)}
      </main>
    </div>
  );
}

export default App;