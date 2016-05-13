$(document).ready(function() {

      function locale(position) {

        var coords = {
          lat: "",
          lon: ""
        };

        //API key
        var clientUrl = 'https://api.forecast.io/forecast/0ed7bd5418fe16eb15ab1dd3a2e123c1/';
        //Get user coordinates
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            coords.lat = position.coords.latitude;
            coords.lon = position.coords.longitude;
            clientUrl = clientUrl + coords.lat + "," + coords.lon + "?callback=?";

            //Ajax request- jsonp because of cors
            $.ajax({

              url: clientUrl,
              dataType: "jsonp",
              success: function(data) {
                //Set fahrenheit and celcius
                var currentTemp = Math.round(data.currently.apparentTemperature);
                var celciusTemp = Math.round(((currentTemp - 32) * 5) / 9);
                //Display current temp
                $(".weather-info").append("<div class='city'><h2>" + data.timezone.replace("_", " ") + "</h2></div><div class='temperature'><h1 class='far'>" + currentTemp + "<span class='temp far'>&#xb0 F</span></h1><h1 class='cel'>" + celciusTemp + "<span class='temp cel'>&#xb0 C</span></h1>" +
                  "</div>");
                //Convert fahrenheit to celcius and celcius to fahrenheit
                $(".cel").hide();

                $(".far").click(function() {
                  $(".far").hide();
                  $(".cel").show();
                });

                $(".cel").click(function() {
                  $(".cel").hide();
                  $(".far").show();
                });
              },
              error: function() {
            console.log("failure");
          }

            });
          });
        }
      }
 locale();
 });
