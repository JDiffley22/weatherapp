import hot from './assets/hot-weather.jpg';
import cold from './assets/cold-weather.jpg';
import mild from './assets/mild-weather.jpg'
import Descriptions from './components/descriptions';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './weather';

function App() {
	const [city, setCity] = useState('London');
	const [weather, setWeather] = useState(null);
	const [units, setUnits] = useState('metric');
	const [bg, setBg] = useState(hot);

	useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);
  
      const coldThreshold = units === 'metric' ? 9 : 48.2; 
      const hotThreshold = units === 'metric' ? 20 : 68; 
      
      if (data.temp <= coldThreshold) {
        setBg(cold);
      } else if (data.temp >= hotThreshold) {
        setBg(hot);
      } else {
        setBg(mild);
      }
    };
		fetchWeatherData();
	}, [units, city]);

	const handleUnitsClick = (e) => {
		const button = e.currentTarget;
		const currentUnit = button.innerText.slice(1);

		const isCelsius = currentUnit === 'C';
		button.innerText = isCelsius ? '°F' : '°C';
		setUnits(isCelsius ? 'metric' : 'imperial');
	};

	const enterKeyPressed = (e) => {
		if (e.keyCode === 13) {
			setCity(e.currentTarget.value);
			e.currentTarget.blur();
		}
	};

	return (
		<div className="app" style={{ backgroundImage: `url(${bg})` }}>
			<div className="overlay">
				{weather && (
					<div className="container">
						
						<div className="section section__inputs top">
							<input
								onKeyDown={enterKeyPressed}
								type="text"
								name="city"
								placeholder="Enter City/Town..."
							/>	
							<button onClick={(e) => handleUnitsClick(e)}>°F</button>
						</div>

						<div className="section section__temperature">
							<div className="icon">
								<h3>{`${weather.name}, ${weather.country}`}</h3>
								<img src={weather.iconURL} alt="weatherIcon" />
								<h3>{weather.description}</h3>
							</div>
							<div className="temperature">
								<h1>{`${weather.temp.toFixed()} °${
									units === 'metric' ? 'C' : 'F'
								}`}</h1>
							</div>
						</div>
						<Descriptions weather={weather} units={units} />
					</div>
				)}
			</div>
		</div>
	);
}

export default App;