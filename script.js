const container = document.createElement("div");
container.setAttribute("class", "container");

const heading = document.createElement("h1");
heading.setAttribute("id","title");
heading.setAttribute("class","text-center");
heading.innerHTML = "Rest Countries & Weather Using Fetch API"
document.body.appendChild(heading);

const row = document.createElement("div");
row.setAttribute("class", "row");

document.body.append(container);
container.appendChild(heading);
container.appendChild(row);

//creating an async function for fetching rest countries API
const displayRestCountries = async ()=>{
    const response = await fetch("https://restcountries.com/v2/all");
    const data = await response.json();
    return data; //returning json data of API
}

displayRestCountries().then(data=>{
    for(var i=0;i<data.length;i++){
        //console.log(data[i].name);
        row.innerHTML+=`
        <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4">
            <div class="card h-100" >
                <div class="card-header text-center bg-dark text-white">${data[i].name}</div>
                <div class="card-body text-center" id="card-body">
                    <img src="${data[i].flags.svg}" class="card-img-top" alt="...">
                    <div class="card-text">Region: ${data[i].region} <div>
                    <div class="card-text">Capital: ${data[i].capital}</div>
                    <div class="card-text">LatLng: ${data[i].latlng}</div>
                    <div class="card-text">Country Code: ${data[i].alpha3Code}</Code></div>
                    <a href="#" class="btn btn-primary border justify-content-center" >Click for Weather</a>
                 </div>
            </div>
         </div>
        `;
        document.body.append(container);
    }
    return data;
}).then(data=>{ //after the data is recieved then fetching the weather data based on rest country data
    let weatherBtns=document.querySelectorAll("a");
    for(let i=0;i<weatherBtns.length;i++){
       weatherBtns[i].addEventListener('click',function (e){ //adding event listener for the country selected
        e.preventDefault();
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[i].latlng[0]}&lon=${data[i].latlng[1]}&appid=6831885672e55a2677a35dbcb3f3b2fd`)
        .then(response=>{
            return response.json();
        }).then(data=>{
            //displaying the weather data as a alert message
            alert(`
                            WEATHER DATA 
                ---------------------------------
                Descritpion: ${data.weather[0].description}
                Humidity: ${data.main.humidity}
                Temperature: ${data.main.temp}
                Minimum Temperature : ${data.main.temp_min}
                Maximum Temperatur : ${data.main.temp_max}
                Pressure: ${data.main.pressure}

            `);
        });
       });
    }

})
