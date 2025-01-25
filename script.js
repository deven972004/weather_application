async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherImage = document.getElementById('weatherImage');
    const dayElem = document.getElementById('day');
    const fullDateElem = document.getElementById('fullDate');
    const timeElem = document.getElementById('time');
    const temperatureElem = document.getElementById('temperature');
    const rainElem = document.getElementById('rain');
    const windElem = document.getElementById('wind');
    const humidityElem = document.getElementById('humidity');
  
    // Hide the icon and clear previous values initially
    weatherIcon.style.display = 'none';
    dayElem.textContent = '--';
    fullDateElem.textContent = '--';
    timeElem.textContent = '--';
    temperatureElem.textContent = '--°C';
    rainElem.textContent = '--';
    windElem.textContent = '--';
    humidityElem.textContent = '--';
  
    if (!city) {
      alert('Please enter a city name!');
      return;
    }
  
    try {
      const apiKey = '848d20b9afd24cc6819141631252501'; // Use your actual API key
      const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.error) {
        alert('City not found. Please enter a valid city.');
        return;
      }
  
      // Extract localtime, date, and time
      const localtime = data.location.localtime;
      const [date, time] = localtime.split(' ');
      const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
  
      // Update the date, day, and time in the UI
      dayElem.textContent = day; // e.g., "Monday"
      fullDateElem.textContent = date; // e.g., "2025-01-25"
      timeElem.textContent = time; // e.g., "14:30"
  
      // Update other weather details
      temperatureElem.textContent = `${data.current.temp_c}°C`;
      rainElem.textContent = data.current.precip_mm ? `${data.current.precip_mm} mm` : '0 mm';
      windElem.textContent = `${data.current.wind_kph} km/h`;
      humidityElem.textContent = `${data.current.humidity}%`;
  
      // Set and display the weather icon
      weatherImage.src = `https:${data.current.condition.icon}`;
      weatherIcon.style.display = 'block';
    } catch (error) {
      alert('Unable to fetch weather data. Please try again later.');
      console.error(error);
    }
  }
  