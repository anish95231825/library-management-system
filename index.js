const express =require("express");
//  const{users}=require("./data/users.json")

// importing the routers
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();

const PORT = 1000;

app.use(express.json());

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Home page:-)"
    })
})

app.use("/users",usersRouter);
app.use("/books",booksRouter);





// app.all('*', (req, res) => {
//     res.status(404).json({
//         message:"Not built yet"
//     });
// });
// app.use((req, res)=>{
//     res.status(404).json({
//         message: "Not found"
//     });
// });
app.listen(PORT,()=>{
    console.log(`server is up an running on http://localhost:${PORT}`)
})