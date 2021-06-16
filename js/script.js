function decimalToTime(dec){
    const converted = new Date(dec*1000).toUTCString().split(" ")[4];
    return converted;
}

let weather = {
    apiKey: "cda2a17e18a88d1ffceb8aeff99c405d",
    fetchWeather: function (zipCode){
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},ch&units=metric&lang=de&appid=`
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
    },
    displayWeather: function (data){
        if(data){
            if(data.cod === 200){
                this.toggleContentOnSuccess(data);
            }
            
            else{
                this.removeContentOnFailure();
                document.querySelector(".temp").innerText = `statuscode: ${data.cod} \nmsg: ${data.message}`;               
            }
        }

        else{
            document.querySelector(".temp").innerText = "Something went wrong";
        }  
    },

    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
    

    isContentToggled: function(){
        return document.querySelector(".description").innerText !== "";
    },


    toggleContentOnSuccess: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, pressure, humidity,} = data.main;
        const { sunrise, sunset } = data.sys;
        const roundedTemp = Math.round(temp);
        document.querySelector("body").style.backgroundImage =  "url('https://source.unsplash.com/1999x1080/?landscape')";
        document.querySelector(".plz").innerText = "Wetter in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon +"@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = roundedTemp + "°C";
        document.querySelector(".pressure").innerText = "Luftdruck: " + pressure + " hPa";
        document.querySelector(".humidity").innerText = "Luftfeuchtigkeit: " + humidity + "%";
        document.querySelector(".sunrise").innerText = "Sonnenaufgang: " + decimalToTime(sunrise) + " Uhr";
        document.querySelector(".sunset").innerText = "Sonnenuntergang: " + decimalToTime(sunset) + " Uhr";
        document.querySelector(".weather").classList.remove("loading");
    },
    removeContentOnFailure: function(){
        document.querySelector(".plz").innerText = "";
        document.querySelector(".icon").src = "";
        document.querySelector(".description").innerText = "";
        document.querySelector(".temp").innerText = "";
        document.querySelector(".pressure").innerText = "Luftdruck: ";
        document.querySelector(".humidity").innerText = "Luftfeuchtigkeit: ";
        document.querySelector(".sunrise").innerText = "Sonnenaufgang: ";
        document.querySelector(".sunset").innerText = "Sonnenuntergang: ";
    }
};

document.querySelector(".search-bar").addEventListener("keydown", function(event){
    if (event.key == "Enter"){
        weather.fetchWeather(event.target.value);
        event.target.value = "";
    }
});

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    weather.fetchWeather("6003")
  }
}

