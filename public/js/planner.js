let editTripId = null;

// =============================
// SET MINIMUM DATE
// =============================

const today =
    new Date().toISOString().split('T')[0];

document
.getElementById('goingDate')
.min = today;

document
.getElementById('returnDate')
.min = today;


// Return date should be after going date

document
.getElementById('goingDate')
.addEventListener('change', function () {

    document
    .getElementById('returnDate')
    .min = this.value;

});


// =============================
// CHECK EDIT MODE
// =============================

const params = new URLSearchParams(window.location.search);

const tripId = params.get('id');

if (tripId) {

    editTripId = tripId;

    loadTripData(tripId);

}


// =============================
// LOAD TRIP DATA
// =============================

async function loadTripData(id) {

    const response = await fetch(`/getTrip/${id}`);

    const trip = await response.json();

    document.getElementById('currentLocation').value =
        trip.currentLocation;

    document.getElementById('destination').value =
        trip.destination;

    document.getElementById('goingDate').value =
        trip.goingDate;

    document.getElementById('returnDate').value =
        trip.returnDate;

    document.getElementById('travelers').value =
        trip.travelers;

    document.getElementById('budget').value =
        trip.budget;

    document.getElementById('travelType').value =
        trip.travelType;

    document.getElementById('generateBtn').innerText =
        'Update Trip';

}


// =============================
// BUTTON CLICK
// =============================

document.getElementById('generateBtn')
.addEventListener('click', async () => {

    const currentLocation =
        document.getElementById('currentLocation').value;

    const destination =
        document.getElementById('destination').value;

    const goingDate =
        document.getElementById('goingDate').value;

    const returnDate =
        document.getElementById('returnDate').value;

    const travelers =
        document.getElementById('travelers').value;

    const budget =
        parseInt(
            document.getElementById('budget').value
        );

    const travelType =
        document.getElementById('travelType').value;
    // =============================
    // DATE VALIDATION
    // =============================

    const today = new Date();


    today.setHours(0, 0, 0, 0);

    const startDate = new Date(goingDate);

    const endDate = new Date(returnDate);

    if (startDate < today) {

        alert(
            "Going date cannot be in the past"
        );

        return;
    }

    if (endDate < startDate) {

        alert(
            "Return date must be after Going date"
        );

        return;
    }    


    const tripData = {

        currentLocation,
        destination,
        goingDate,
        returnDate,
        travelers,
        budget,
        travelType

    };


    let response;


    // =============================
    // UPDATE TRIP
    // =============================

    if (editTripId) {

        response = await fetch(

            `/updateTrip/${editTripId}`,

            {

                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(tripData)

            }

        );

        const data = await response.json();

        console.log(data);

        alert('Trip Updated Successfully');

    }


    // =============================
    // SAVE NEW TRIP
    // =============================

    else {

        response = await fetch('/saveTrip', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(tripData)

        });

    }


    const data = await response.json();

    console.log(data);


    // =============================
    // SMART CALCULATIONS
    // =============================

    const hotelBudget =
        Math.floor(budget * 0.4);

    const foodBudget =
        Math.floor(budget * 0.2);

    const travelBudget =
        Math.floor(budget * 0.25);

    const activitiesBudget =
        Math.floor(budget * 0.15);


    // =============================
    // HOTEL
    // =============================

    const hotelName =
        `Grand ${destination} Palace`;


    // =============================
    // WEATHER API
    // =============================

    let temperature = 'N/A';

    let weatherCondition = 'N/A';

    let humidity = 'N/A';

    let windSpeed = 'N/A';

    try {

        const apiKey =
            '55f16bdb4a6c6cf6dee443720a469397';

        const weatherResponse =
            await fetch(

                `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${apiKey}&units=metric`

            );

        const weatherData =
            await weatherResponse.json();

        if(weatherData.main){

            temperature =
                weatherData.main.temp;

            weatherCondition =
                weatherData.weather[0].description;

            humidity =
                weatherData.main.humidity;

            windSpeed =
                weatherData.wind.speed;

        }

    } catch(error){

        console.log(
            'Weather API Error:',
            error
        );

    }


    // ===============================
    // CALCULATE NUMBER OF DAYS
    // ===============================

    const start = new Date(goingDate);

    const end = new Date(returnDate);

    const totalDays =
        Math.ceil(
            (end - start) / (1000 * 60 * 60 * 24)
        ) + 1;


    // ===============================
    // GENERATE DAY PLAN
    // ===============================

    let dayPlanHTML = "";

    for(let i = 1; i <= totalDays; i++){

        if(i === 1){

            dayPlanHTML += `
                <p>
                    Day ${i}:
                    Arrival and local sightseeing
                </p>
            `;

        } else if(i === totalDays){

            dayPlanHTML += `
                <p>
                    Day ${i}:
                    Shopping and return journey
                </p>
            `;

        } else {

            dayPlanHTML += `
                <p>
                    Day ${i}:
                    Explore tourist attractions
                    and activities
                </p>
            `;
        }
    }


    // =============================
    // DESTINATION IMAGE
    // =============================
    let destinationImage =
    '/images/default.jpg';

    try {

        const response = await fetch(

    `https://api.pexels.com/v1/search?query=${destination} tourism&per_page=1`,

            {

                headers: {

                    Authorization:
                    'YiIuMGcG627lvCKkIGU5vTeZh9J8p2nil0fYuSE6TwzRmPQNCv5YQHMB'

                }

            }

        );

        const imageData =
            await response.json();

        console.log(imageData);

        if (

            imageData.photos &&
            imageData.photos.length > 0

        ) {

        destinationImage =
            imageData.photos[0].src.large;

        }

    } catch(error){

        console.log(
            'Pexels API Error:',
            error
        );

    }
    
    // =============================
    // DISPLAY ITINERARY
    // =============================

    const itineraryResult =
        document.getElementById('itineraryResult');

    itineraryResult.innerHTML = `

        <div style="
            background:white;
            color:black;
            padding:20px;
            border-radius:50px;
        ">

            <img
                src="${destinationImage}"
                alt="${destination}"
                style="
                    width: 100%;
                    height: 1000px;
                    object-fit: cover;
                    border-radius: 50px;
                    margin-bottom: 20px;
                "
            >

            <h2>
                ${destination} Smart Plan
            </h2>

            <hr>

            <p>
                <strong>Starting From:</strong>
                ${currentLocation}
            </p>

            <p>
                <strong>Destination:</strong>
                ${destination}
            </p>

            <p>
                <strong>Going Date:</strong>
                ${goingDate}
            </p>

            <p>
                <strong>Return Date:</strong>
                ${returnDate}
            </p>

            <p>
                <strong>Travelers:</strong>
                ${travelers}
            </p>

            <p>
                <strong>Travel Type:</strong>
                ${travelType}
            </p>

            <hr>

            <h3>Budget Breakdown</h3>

            <p>Hotel: ₹${hotelBudget}</p>

            <p>Food: ₹${foodBudget}</p>

            <p>Transport: ₹${travelBudget}</p>

            <p>Activities: ₹${activitiesBudget}</p>

            <hr>

            <h3>Suggested Hotel</h3>

            <p>${hotelName}</p>

            <hr>

            <h3>Weather Forecast</h3>

            <p>
                Temperature:
                ${temperature}°C
            </p>

            <p>
                Condition:
                ${weatherCondition}
            </p>

            <p>
                Humidity:
                ${humidity}%
            </p>

            <p>
                Wind Speed:
                ${windSpeed} km/h
            </p>

            <hr>

            <h3>Day-wise Plan</h3>

            ${dayPlanHTML}

            <hr>

            <h3>Travel Route Map</h3>

            <div
                id="map"
                style="
                    height:400px;
                    width:100%;
                    border-radius:10px;
                "
            ></div>

            <div
                id="routeInfo"
                class="mt-3"
            ></div>

        </div>

        <button
            id="downloadPDF"
            class="btn btn-success mt-3"
        >
            Download PDF
        </button>

    `;


    // =============================
    // ROUTE MAP
    // =============================

    try {

        // SOURCE
        const sourceResponse =
            await fetch(

`https://nominatim.openstreetmap.org/search?format=json&q=${currentLocation}`

            );

        const sourceData =
            await sourceResponse.json();


        // DESTINATION
        const destResponse =
            await fetch(

`https://nominatim.openstreetmap.org/search?format=json&q=${destination}`

            );

        const destData =
            await destResponse.json();


        // COORDINATES
        const sourceLat =
            parseFloat(sourceData[0].lat);

        const sourceLon =
            parseFloat(sourceData[0].lon);

        const destLat =
            parseFloat(destData[0].lat);

        const destLon =
            parseFloat(destData[0].lon);


        // MAP
        const map = L.map('map').setView(

            [sourceLat, sourceLon],

            6

        );


        // TILE LAYER
        L.tileLayer(

'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

        {

            attribution:
            '© OpenStreetMap contributors'

        }

        ).addTo(map);


        // ROUTE
        L.Routing.control({

            waypoints: [

                L.latLng(
                    sourceLat,
                    sourceLon
                ),

                L.latLng(
                    destLat,
                    destLon
                )

            ],

            routeWhileDragging: false

        }).addTo(map);


        // DISTANCE
        const distance =
            map.distance(

                [sourceLat, sourceLon],

                [destLat, destLon]

            );


        const distanceKM =
            (distance / 1000).toFixed(2);


        // ESTIMATED TIME
        const estimatedTime =
            (distanceKM / 50).toFixed(1);


        // DISPLAY
        document.getElementById('routeInfo')
        .innerHTML = `

            <strong>
                Distance:
            </strong>

            ${distanceKM} KM

            <br>

            <strong>
                Estimated Travel Time:
            </strong>

            ${estimatedTime} Hours

        `;

    } catch(error){

        console.log(
            'Map Error:',
            error
        );

    }


    // =============================
    // DOWNLOAD PDF
    // =============================

    document
    .getElementById('downloadPDF')
    .addEventListener('click', () => {

        const element =
            document.querySelector('#itineraryResult > div');
        html2pdf()

        .set({

            margin: 0.2,

            filename:
                'Smart_Travel_Itinerary.pdf',

            image: {
                type: 'jpeg',
                quality: 1
            },

            html2canvas: {
                scale: 2,
                useCORS: true,

                scrollY: 0

            },

            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            },
            pagebreak: {

                mode: ['avoid-all', 'css', 'legacy']

            }


        })

        .from(element)

        .save();

    });

});