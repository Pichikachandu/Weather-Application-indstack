let weather = {
    apiKey: "11a51281a07bddf6d8a00c2c763a74d4",
    fetchWeather: function (location) {
      let apiUrl = "";
  
      if (location.toLowerCase() === "all india states") {
        const indianStates = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Ladakh", "Lakshadweep", "Puducherry"];
  
        indianStates.forEach((state) => {
          this.fetchWeather(state);
        });
      } else {
        apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric&appid=" + this.apiKey;
  
        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("City not found.");
            }
            return response.json();
          })
          .then((data) => {
            if (!data || !data.name || !data.weather || !data.main || !data.wind) {
              throw new Error("Invalid weather data.");
            }
            this.displayWeather(data);
          })
          .catch((error) => {
            alert(error.message);
            console.error(error);
          });
      }
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      const location = document.querySelector(".search-bar").value.trim();
      if (location) {
        this.fetchWeather(location);
      } else {
        alert("Please enter a city or state name.");
      }
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
    }
  });

// Set default weather for Sullurupeta
weather.fetchWeather("Chennai");
