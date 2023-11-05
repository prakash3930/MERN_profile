const {PORT,app,mongoose,DATABASEURL} = require('./App');

const conecct = async()=>{
    try {
        mongoose.connect(DATABASEURL);
        console.log("database connect done.");
    } catch (error) {
        console.log(error.message);
    }
};

// runing server.....
app.listen(PORT,async()=>{
    try {
        console.log(`Sever Run Successfully http://localhost:${PORT}`);
        await conecct();
    } catch (error) {
        console.log(error.message);
    }
});
