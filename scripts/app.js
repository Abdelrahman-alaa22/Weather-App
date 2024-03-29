const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');




const updateUi = (data) => {
    const cityDets = data.cityDetails;
    const weather = data.weather;

    // Update details template
    details.innerHTML = `     
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>`;

    // Update the night/day $ icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg';
    }

    time.setAttribute('src', timeSrc);

        // remove d-none class
        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        }
};



const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {cityDetails, weather};
};


cityForm.addEventListener('submit', e => {

    // get the city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with the new city
    updateCity(city)
        .then(data => updateUi(data))
        .catch(err => console.log(err));

    // Set to local storage
    localStorage.setItem('city', city)

    // prevent default action
    e.preventDefault();
})

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUi(data))
    .catch(err => console.log(err));
}