import mongoose from "mongoose";
import app from "./app.js";
import config from '../src/config/index.js';


( async () => {
  try {
    // database connection 
    await mongoose.connect(config.MONGODB_URL)
    console.log("DB CONNECTED!");

    app.on("error", (err) => {
      console.error("ERROR: ", err.message)
      throw err
    })


    const onListening = () => {
      console.log(`Listening on port ${config.PORT}`);
    }


    app.listen(config.PORT, onListening)

  } catch (err) {
    console.error("ERROR: ", err.message)
    throw err
  }
})()

