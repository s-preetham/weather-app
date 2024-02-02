const apiKey = 'a7ef9eee44c1f42ec591a59a65227da2';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationName');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const tempElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const coordinatesEle = document.getElementById('coordinates');

searchButton.addEventListener('click', () =>{
    coordinatesEle.textContent = 'Coordinates: ';
    locationElement.textContent = 'Location: ';
    tempElement.textContent = 'Temperature: ';
    descriptionElement.textContent = 'Description: ';
    const location = locationInput.value;
    if(location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            coordinatesEle.textContent += data.coord.lon + ' ' + data.coord.lat;
            locationElement.textContent += data.name;
            tempElement.textContent += `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent += data.weather[0].description;
        })
        
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data');
        });
}