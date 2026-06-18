const express =require("express");
const {users} = require("../data/users.json");

const router = express.Router();

/**
 * Route :/ users
 * Method : GET
 * Description : get all the list of users in the system
 * access : public
 * parameters :none
 */

router.get('/',(req, res)=>{
    res.status(200).json({
        success:true,
        data: users
    
    })
})

/**
 * Route :/ users/:id
 * Method : GET
 * Description : get a userby thier ID
 * access : public
 * parameters :id
 */
router.get('/:id',(req,res)=>{
    
const {id} =req.params;
const user = users.find((each)=>each.id === id)

if(!user){
    return res.status(404).json({
        success:false,
        message:`user not found for id :${id}`
})
}

    res.status(200).json({
        sucess:true,
        Data:user
    })
})

/**
 * Route :/ users
 * Method : POST
 * Description : create/register a new user
 * access : public
 * parameters :None
 */

router.post('/',(req, res)=>{
    //  req.body should have the folowing feilds

const {id, name, surname, email, subscriptionType, subscriptionDate }= req.body;
//  check if all the required feilds are present
if(!id ||!name ||!surname ||!email ||!subscriptionType ||!subscriptionDate ){
    return res.status(404).json({
        success: false,
        message: "please provide all the required fields"
    })
}
// check if the user already exists
const user = users.find((each)=>each.id === id)
if(user){
    return res.status(409).json({
        success: false,
        message: `user already exists with id :${id} `
    })
}
// if all checks pass,create the user
//  and push it to the users array
users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate
})
res.status(201).json({
    success:true,
    message: "user created successfully"
})

})


/**
 * Route :/ users/id
 * Method : Put
 * Description : update a user by their ID
 * access : public
 * parameters :id
 */

router.put('/:id',(req, res)=>{
    const {id}=req.params;
    const {data}=req.body;

    // check if the user exists or not
    const user = users.find((each)=>each.id === id)
    if(!user){
        return res.status(404).json({
            success:false,
            message: `user not found for id :${id}`
        })
    }

    // object.assign(user,data);
    //  with spread operator
    const updateUser = users.map((each)=>{
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
        data: updateUser,
        message: "user upate successfully"
    })
})


/**
 * Route :/ users/id
 * Method : delete
 * Description : deleting a user by their id
 * access : public
 * parameters :id
 */

router.delete('/:id',(req, res)=>{
    const {id} =req.params;

    // check if the user exists
    const user=users.find((each)=>each.id ==id )
    if(!user){
        return res.status(404).json({
            success:false,
            message:`user not found for id: ${id}`
        })
    }
    // if user exists,filter it out from the users array
     const updatedUsers = users.filter((each)=>each.id !== id)

    // 2nd method

// const index =user.indexof(user);
// users.splice(index, 1);

    res.status(200).json({
        success:true,
        data:updatedUsers,
        message:"user deleted successfully"
    })
});

module.exports =router;