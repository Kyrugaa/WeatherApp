let weather = {
    apiKey: "cda2a17e18a88d1ffceb8aeff99c405d",
    fetchWeather: function (city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => console.log(data))
    },
    displayWeather: function (data){
        const { name } = data;
        const { icon, description } = data.weather;
        const { temp, pressure, humidity,} = data.main;
        const {  sunrise, sunset} = data.sys;
    }
};

