let button = document.querySelector("button");
let location = document.querySelector("location")

button.addEventListener('click', (event) => {
    event.preventDefault();

    fetch({ url: '/getWeather?location=' + location})
})