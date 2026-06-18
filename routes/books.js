const express=require("express");
const { books } = require("../data/books.json");
const {users} =require("../data/users.json");
const { get } = require("./books");

const router = express.Router();


/**
 * Route :/books
 * Method : GET
 * Description : get all the list of books in the system
 * access : public
 * parameters :none
 */

router.get('/',(req, res)=>{
    res.status(200).json({
        success:true,
        data: books
    
    })
})


/**
 * Route :/ books/:id
 * Method : GET
 * Description : get a books by thier ID
 * access : public
 * parameters :id
 */
router.get('/:id',(req,res)=>{
    
const {id} =req.params;
const book = books.find((each)=>each.id === id)

if(!book){
    return res.status(404).json({
        success:false,
        message:`books not found for id :${id}`
})
}

    res.status(200).json({
        sucess:true,
        Data:book
    })
})



/**
 * Route :/ books
 * Method : POST
 * Description : create/register a new books
 * access : public
 * parameters :None
 */

router.post('/',(req, res)=>{
    //  req.body should have the folowing feilds

const {id, name, title, author, price, publisher}= req.body;
//  check if all the required feilds are present
if(!id ||!name ||!title ||!author ||!price ||!publisher ){
    return res.status(404).json({
        success: false,
        message: "please provide all the required fields"
    })
}
// check if the user already exists
const book = books.find((each)=>each.id === id)
if(book){
    return res.status(409).json({
        success: false,
        message: `book already exists with id :${id} `
    })
}
// add the new book to the book array
books.push({id,name, title,author,price, publisher});
res.status(201).json({
    success:true,
    message: "Books added successfully",
    
})

})



/**
 * Route :/ books/id
 * Method : Put
 * Description : update a book by their ID
 * access : public
 * parameters :id
 */

router.put('/:id',(req, res)=>{
    const {id}=req.params;
    const {data}=req.body;

    // check if the user exists or not
    const book = books.find((each)=>each.id === id)
    if(!book){
        return res.status(404).json({
            success:false,
            message: `book not found for id :${id}`
        })
    }

    // object.assign(user,data);
    //  with spread operator
    const updateBook = books.map((each)=>{
        if(each.id===id){
            return{
                ...each,
                ...data,
            }
        }
        return each
    })
    res.status(200).json({
        success: true,
        data: updateBook,
        message: "book upate successfully"
    })
})


/**
 * Route :/ books/id
 * Method : delete
 * Description : deleting a book by their id
 * access : public
 * parameters :id
 */

router.delete('/:id',(req, res)=>{
    const {id} =req.params;

    // check if the user exists
    const book=books.find((each)=>each.id ==id )
    if(!book){
        return res.status(404).json({
            success:false,
            message:`book not found for id: ${id}`
        })
    }
    // if user exists,filter it out from the users array
     const updatedBooks = books.filter((each)=>each.id !== id)

    // 2nd method

// const index =user.indexof(user);
// users.splice(index, 1);

    res.status(200).json({
        success:true,
        data:updatedBooks,
        message:"book deleted successfully"
    })
});


//  Route: /books/issued/for-users
//  Method:get
// drscription: get all issued books
// access:public
// parameter:none

router.get('/issued/for-users',(req, res)=>{
    // const  issuedBooks = books.filter((each)=>each.issued === true);
    
    // or

    const userWithissuedBooks = users.filter((each)=>{
        if(each.issuedBook){
            return each;
        }
    })

    const issuedBooks=[];
    userWithissuedBooks.forEach((each)=>{
        const book=books.find((book)=>book.id ===each.issuedBook);

        book.issuedBy =each.name;
        book.issuedDate =each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book)
    })

    if(!issuedBooks ===0){
        returnres.status(404).json({
            success: false,
            message:"no books issued yet"
        })
    }
    
    res.status(200).json({
        success:true,
        data:issuedBooks
    });
});

module.exports = router;