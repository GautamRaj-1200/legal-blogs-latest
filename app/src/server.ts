import config from "./config/config.js";
import app from "./app.js";
import connectDB from "./db/connection.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERR: ", error);
      throw error;
    });
    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo DB connection failed!!!!!", err);
  });
