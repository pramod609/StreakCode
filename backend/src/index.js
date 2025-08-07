const express = require('express')
const app = express();
require('dotenv').config();
const main =  require('./config/db')
const cookieParser =  require('cookie-parser');
const authRouter = require("./routes/userAuth");
const redisClient = require('./config/redis');
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit")
const aiRouter = require("./routes/aiChatting")
const videoRouter = require("./routes/videoCreator");
const cors = require('cors')

// console.log("Hello")

app.use(cors({
    origin: true, // Allow all origins temporarily for debugging
    credentials: true 
}))

app.use(express.json());
app.use(cookieParser());

// Add a simple test route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'StreakCode Backend is running!' });
});

// Add a health check route
app.get('/health', (req, res) => {
    res.status(200).json({ 
        message: 'Server is healthy',
        timestamp: new Date().toISOString()
    });
});

app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);
app.use('/ai',aiRouter);
app.use("/video",videoRouter);

// Add 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        message: `Route ${req.originalUrl} not found`,
        availableRoutes: ['/user', '/problem', '/submission', '/ai', '/video']
    });
});

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});


const InitalizeConnection = async ()=>{
    try{

        await Promise.all([main(),redisClient.connect()]);
        console.log("DB Connected");
        
        app.listen(process.env.PORT, ()=>{
            console.log("Server listening at port number: "+ process.env.PORT);
        })

    }
    catch(err){
        console.log("Error: "+err);
    }
}


InitalizeConnection();

