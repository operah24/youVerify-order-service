import mongoose, { ConnectOptions } from "mongoose";


let dbUrl = process.env.MONGO_URI as string;
console.log({ dbUrl })
mongoose.connect(dbUrl, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 120000,
  } as ConnectOptions
).then((_) =>{
 console.log('DB Connected');
}).catch(error => {
 console.log('DB Error', error);
});

mongoose.connection.on('connected', function () {
 console.log('Mongoose connected to ', dbUrl);
});

mongoose.connection.on('error',function (err) {
 console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
 console.log('Mongoose disconnected');
});

// For nodemon restarts
process.once('SIGUSR2', function () {
 mongoose.connection.close().then(() => {
  console.warn('Database connection closed');
  process.exit(1);
 });
});


// For app termination
process.on('SIGINT', function () {
 mongoose.connection.close().then(() => {
  console.warn('Database connection terminated');
  process.exit(1);
 });
});

