# library-management-system

This is a library mangement API Backend for the management of users and the books

# Routes and the Endpoints

## /users
GET: get all the list of users in the system
POST:create/register a new user

## /users/{id}
GET: get a user by their ID
PUT: Updating a user by their ID
DELETE: deleting a user by their ID (check if the user still has an issued book) && {is there any fine /penalty to be collected}

## /users/subscription-details/{id}
GET: get a user sbscription details by their ID
   Date of subscription
   Valid til ?
   Fine if any ?


## /books
Get: get all the books in the system
post: addd a new book to the system

## /book{id}
get: get a book by its id
put : update a book by its id
delete: delete a book by its id

## /books/issued
get: get all the issued books

## /books/issued/withfine
get:get all issued books with thier fine amount

## susbcription type

  basic (3 months)
  standard(6 month)
  premium(12 month)

if a user missed the renewal date ,then user should be collected with $100  
if a user missed his subscription ,then user is expected to pay $100

if a user misses both renewal & subscrition,then the collected amount soul be $200

## commands:
 npm init
 npm i express
 npm i nodemon --> save-dev
 npm run dev

 to restore node module and package-lock.json--> npm i/npm install