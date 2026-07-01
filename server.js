const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const mongoose = require('mongoose');

const User = require('./models/User');
const Trip = require('./models/Trip');

const connectDB = require('./config/db');

const authMiddleware =
    require('./middleware/authMiddleware');

const app = express();


// =============================
// DATABASE CONNECTION
// =============================

connectDB();


// =============================
// SOCKET SERVER
// =============================

const server = http.createServer(app);

const io = new Server(server);


// =============================
// MIDDLEWARE
// =============================

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(session({

    secret: 'smarttravelsecret',

    resave: false,

    saveUninitialized: false

}));

app.use(express.static('public'));


// =============================
// SOCKET CONNECTION
// =============================

io.on('connection', (socket) => {

    console.log('User Connected');

    socket.on('joinUserRoom', (userId) => {

        socket.join(userId);

        console.log(`User Joined Room: ${userId}`);

    });

});


// =============================
// PAGE ROUTES
// =============================

// HOME PAGE
app.get('/', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'views', 'index.html')
    );

});


// PLANNER PAGE
app.get('/planner',
    authMiddleware,
    (req, res) => {

    res.sendFile(
        path.join(__dirname, 'views', 'planner.html')
    );

});


// DASHBOARD PAGE
app.get('/dashboard',
    authMiddleware,
    (req, res) => {

    res.sendFile(
        path.join(__dirname, 'views', 'dashboard.html')
    );

});


// LOGIN PAGE
app.get('/login', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'views', 'login.html')
    );

});


// REGISTER PAGE
app.get('/register', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'views', 'register.html')
    );

});


// =============================
// API ROUTES
// =============================


// SAVE TRIP
app.post('/saveTrip',
    authMiddleware,
    async (req, res) => {

    try {

        const trip = new Trip({

            ...req.body,

            userId: req.session.userId

        });

        await trip.save();

        const trips = await Trip.find({

            userId: req.session.userId

        });

        io.to(req.session.userId.toString()).emit(
            'tripsUpdated',
            trips
        );

        res.json({

            success: true,

            message: 'Trip Saved Successfully'

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// GET TRIPS
app.get('/getTrips',
    authMiddleware,
    async (req, res) => {

    try {

        const trips = await Trip.find({

            userId: req.session.userId

        });

        res.json(trips);

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

app.get('/getTrip/:id', async (req, res) => {

    try {

        const trip = await Trip.findById(req.params.id);

        res.json(trip);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// DELETE TRIP
app.delete('/deleteTrip/:id',
    authMiddleware,
    async (req, res) => {

    try {

        await Trip.findByIdAndDelete(req.params.id);

        const trips = await Trip.find({

            userId: req.session.userId

        });

        io.to(req.session.userId.toString()).emit(
            'tripsUpdated',
            trips
        );

        res.json({

            success: true,

            message: 'Trip Deleted Successfully'

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// UPDATE TRIP
app.put('/updateTrip/:id',
    authMiddleware,
    async (req, res) => {

    try {

        const updatedTrip =
            await Trip.findByIdAndUpdate(

                req.params.id,

                req.body,

                { new: true }

            );

        const trips = await Trip.find({

            userId: req.session.userId

        }).lean();

        io.to(req.session.userId.toString()).emit(
            'tripsUpdated',
            trips
        );

        res.json({

            success: true,

            updatedTrip

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// =============================
// REGISTER USER
// =============================

app.post('/registerUser', async (req, res) => {

    try {

        const { name, email, password } = req.body;
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Password Length:", password?.length);
        console.log(req.body);

        if (
            !name ||
            !email ||
            !password ||
            name.trim() === "" ||
            email.trim() === "" ||
            password.trim() === ""
        ) {
            return res.json({
            success: false,
            message: "All fields are required"
           });
        }
        if(password.length < 6){
            return res.json({
                success:false,
                message:"Password must be at least 6 characters"
            });
        }

        const existingUser =
            await User.findOne({ email });

        if(existingUser){

            return res.json({

                success: false,

                message: 'User already exists'

            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = new User({

            name,
            email,
            password: hashedPassword

        });

        await user.save();

        res.json({

            success: true,

            message: 'Registration Successful'

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// =============================
// LOGIN USER
// =============================

app.post('/loginUser', async (req, res) => {

    try {

        const { email, password } = req.body;

        const user =
            await User.findOne({ email });

        if(!user){

            return res.json({

                success: false,

                message: 'Invalid Email'

            });

        }

        const isMatch =
            await bcrypt.compare(

                password,
                user.password

            );

        if(!isMatch){

            return res.json({

                success: false,

                message: 'Invalid Password'

            });

        }

        req.session.userId = user._id;

        res.json({

            success: true,

            userId: user._id,
            message: 'Login Successful'

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});
// GET LOGGED-IN USER
app.get('/getUser', authMiddleware, async (req, res) => {

    try {

        const user = await User.findById(
            req.session.userId
        );

        res.json({
            name: user.name
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// =============================
// LOGOUT
// =============================

app.get('/logout', (req, res) => {

    req.session.destroy(() => {

        res.redirect('/login');

    });

});


// =============================
// REALTIME DATABASE WATCH
// =============================

mongoose.connection.once('open', async () => {

    console.log('MongoDB Change Stream Ready');

    const collection =
        mongoose.connection.collection('trips');

    const changeStream = collection.watch([], {
        fullDocument: 'updateLookup'
    });

    changeStream.on('change', async () => {

        try {

            console.log('Database Changed');

            const users =
                await Trip.distinct('userId');

            for(const userId of users){

                const userTrips =
                    await Trip.find({ userId });

                io.to(userId.toString()).emit(
                    'tripsUpdated',
                    userTrips
                );

            }

        } catch (error) {

            console.log(error);

        }

    });

});


// =============================
// SERVER
// =============================

const PORT = 3000;

server.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});