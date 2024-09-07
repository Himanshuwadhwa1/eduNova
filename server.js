import express from 'express'
import dotenv from "dotenv"
import { userRouter } from './Routes/userRoutes.js'
import { bookRouter } from './Routes/bookRoutes.js'
import { transactionRouter } from './Routes/transactionRoutes.js'
import { userBookDB } from './Databse/UserBookDB.js'
import { transactionDB } from './Databse/TransactionDB.js'

dotenv.config()

//DATABASES
userBookDB()
transactionDB()

const app = express()
const Port = process.env.PORT || 3000

//MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//ROUTES
app.use('/api/v1/user', userRouter)
app.use('/api/v1/book', bookRouter)
app.use('/api/v1/transaction', transactionRouter)

const routesDef = {
    user : {
        getUser : "/api/v1/user/getall"
    },
    books:{
        getBook : "/api/v1/book/getall",
        getByName : "/api/v1/book/get-by-name",
        getByCategory : "/api/v1/book/get-by-category",
        getBookByRent : "/api/v1/book/get-by-rent",
        filter : "/api/v1/book/filter",
    },
    transaction:{
        "get Transaction Detail By Book" : "/api/v1/transaction/book/:bookName",
        "get total rent By book" : "/api/v1/transaction/book/rent/:bookName",
        "get book issued to user" : "/api/v1/transaction/user/:userId",
        "get book issued in date range":"/api/v1/transaction/date-range",
        "Post book issued":"/api/v1/transaction/issue",
        "Post book returned":"/api/v1/transaction/return"
    }
}
app.get('/',(req,res)=>{
    res.json({'CLICK ON PRETTY-PRINT TO SEE ROUTES MORE CLEARLY':routesDef})
})

//SERVER
app.listen( Port, ()=>{
    console.log(`SERVER IS RUNNING ON PORT ${Port}`) 
})