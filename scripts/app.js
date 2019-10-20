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



    // prevent default action
    e.preventDefault();
})