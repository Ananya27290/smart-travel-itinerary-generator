let editTripId = null;


const socket = io();
// LOAD USER NAME
async function loadUser(){

    const response = await fetch('/getUser');

    const user = await response.json();

    document.getElementById('userName')
        .innerText = `Welcome, ${user.name}`;
    document.getElementById('profileInitial')
        .innerText = user.name.charAt(0);

}

loadUser();

// JOIN USER ROOM
fetch('/getTrips')
.then(res => res.json())
.then(trips => {

    if(trips.length > 0){

        socket.emit(
            'joinUserRoom',
            trips[0].userId
        );

    }

});


// RECEIVE LIVE UPDATES
socket.on('tripsUpdated', (trips) => {

    console.log('Realtime Update Received');

    displayTrips(trips);

});


// ============================
// LOAD TRIPS
// ============================

async function loadTrips(){

    try {

        const response =
            await fetch('/getTrips');

        const trips =
            await response.json();

        displayTrips(trips);

    } catch (error) {

        console.log(error);

    }

}


// ============================
// DISPLAY TRIPS
// ============================

function displayTrips(trips){

    const savedTrips =
        document.getElementById('savedTrips');

    let tripsHTML = '';

    if(trips.length === 0){

        tripsHTML = `

            <div class="text-center text-white mt-5">

                <h3>No Trips Available</h3>

            </div>

        `;

    }

    trips.forEach((trip) => {

        tripsHTML += `

            <div class="saved-trip-card">

                <h4>${trip.destination}</h4>

                <p>
                    <strong>From:</strong>
                    ${trip.currentLocation}
                </p>

                <p>
                    <strong>Going Date:</strong>
                    ${trip.goingDate}
                </p>

                <p>
                    <strong>Return Date:</strong>
                    ${trip.returnDate}
                </p>

                <p>
                    <strong>Travelers:</strong>
                    ${trip.travelers}
                </p>

                <p>
                    <strong>Budget:</strong>
                    ₹${trip.budget}
                </p>

                <p>
                    <strong>Travel Type:</strong>
                    ${trip.travelType}
                </p>

                <div class="mt-3">

                    <button
                        class="btn btn-primary me-2"
                        onclick="editTrip('${trip._id}')">

                        Edit

                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deleteTrip('${trip._id}')">

                        Delete

                    </button>

                </div>

            </div>

        `;

    });

    savedTrips.innerHTML = tripsHTML;

}


// ============================
// DELETE TRIP
// ============================

async function deleteTrip(id){

    try {

        await fetch(`/deleteTrip/${id}`, {

            method: 'DELETE'

        });

    } catch (error) {

        console.log(error);

    }

}


// ============================
// EDIT TRIP
// ============================

async function editTrip(id){

    try {

        const response =
            await fetch('/getTrips');

        const trips =
            await response.json();

        const trip =
            trips.find((t) => t._id === id);

        if(!trip) return;

        localStorage.setItem(

            'editTrip',

            JSON.stringify(trip)

        );

        window.location.href = `/planner?id=${id}`;

    } catch (error) {

        console.log(error);

    }

}


// ============================
// SEARCH FUNCTION
// ============================

document.getElementById('searchInput')
.addEventListener('input', async (e) => {

    try {

        const searchValue =
            e.target.value.toLowerCase();

        const response =
            await fetch('/getTrips');

        const trips =
            await response.json();

        const filteredTrips =
            trips.filter((trip) => {

                return (

                    trip.destination
                    .toLowerCase()
                    .includes(searchValue)

                );

            });

        displayTrips(filteredTrips);

    } catch (error) {

        console.log(error);

    }

});


// ============================
// INITIAL LOAD
// ============================

loadTrips();