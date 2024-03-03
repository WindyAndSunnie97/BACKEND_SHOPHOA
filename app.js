// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// const cors = require('cors');

// require('dotenv/config');
// const authJwt = require('./helpers/jwt');
// const errorHandler = require('./helpers/error-handler');


// app.use(cors());
// app.options('*', cors())




// const productRoutes = require('./routes/product');

// //middleware
// app.use(bodyParser.json());
// app.use(morgan('tiny'));
// app.use(authJwt());
// app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
// app.use(errorHandler);

// //Routers

// const categoriesRoutes = require('./routes/categories');
// const usersRoutes = require('./routes/users');
// const ordersRoutes = require('./routes/orders');

// const api =  process.env.API_URL;

// app.use(`${api}/product`, productRoutes);
// app.use(`${api}/categories`, categoriesRoutes);
// app.use(`${api}/users`, usersRoutes);
// app.use(`${api}/orders`, ordersRoutes);

// //database
// mongoose.connect(process.env.CONNECTION_STRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: 'Flowershop'
// })
// .then(() =>{
//     console.log('Database connect is ready...')
// })
// .catch((err) =>{
//     console.log(err);
// })

// server
// app.listen(3000, ()=>{

//     console.log('server is running http://localhost:3000');

// })


const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
//const authJwt = require('./helpers/jwt');
//const errorHandler = require('./helpers/error-handler');


app.use(cors());
app.options('*', cors())

//middleware
app.use(express.json());
app.use(morgan('tiny'));
//app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
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
    useNewUrlParser: true,
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

