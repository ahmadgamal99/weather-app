const weatherForm     = document.querySelector('form');
const weatherElement  = document.querySelector('input');
const locationElement = document.querySelector('#location-text');
const forecastElement = document.querySelector('#forecast-text');

weatherForm.addEventListener('submit',(event) => {

     event.preventDefault();

     const location = weatherElement.value;
    locationElement.textContent = 'loading ..'
    forecastElement.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) =>{
            if (data.error)
                locationElement.textContent = data['error'];
            else
                locationElement.textContent = data['location']
                forecastElement.textContent = data['forecast']
        });
    });

});