import  app  from "./app.js"
import { connectToDB, disconnectFromDB } from "./db/connect.js"




connectToDB().then(() => {
    app.listen(5000,()=>console.log("db connected and listening on port 5000"))
}).catch((err) => {
    console.log(err);
});
