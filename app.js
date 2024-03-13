

require('dotenv/config');

const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
//const authJwt = require('./helpers/jwt');
//const errorHandler = require('./helpers/error-handler');
app.use(cors());
//middleware
app.use(express.json());
app.use(morgan('tiny'));
//app.use(authJwt());
// app.use('/public', express.static(path.join(__dirname + 'public')));
//app.use(errorHandler);

//Routes
const categoriesRoutes = require('./routes/categories');
const productRoutes = require('./routes/product');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/product`, productRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useUnifiedTopology: true,
    dbName: 'Flowershop'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(3000, ()=>{

    console.log('server is running http://localhost:3000');
})

