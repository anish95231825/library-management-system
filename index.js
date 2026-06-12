const express =require("express");

const app = express();

const PORT = 1000;

app.use(express.json());

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Home page:-)"
    })
})
// app.all('*', (req, res) => {
//     res.status(404).json({
//         message:"Not built yet"
//     });
// });
app.use((req, res)=>{
    res.status(404).json({
        message: "Not found"
    });
});
app.listen(PORT,()=>{
    console.log(`server is up an running on http://localhost:${PORT}`)
})