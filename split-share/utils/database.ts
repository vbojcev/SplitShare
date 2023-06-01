import mongoose from 'mongoose';

let isConnected = false; //track connection status

let connectOptions: mongoose.ConnectOptions = {
  dbName: 'dbname',
  //This used to be needed, but apparently not after Mongoose 6?
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
};

export const connectToDB = async () => {
  //avoid compiler warnings
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('DB already connected.');
    return;
  }

  try {
    await mongoose.connect(String(process.env.MONGODB_URI), connectOptions);
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
