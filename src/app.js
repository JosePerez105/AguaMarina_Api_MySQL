import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerUI from "swagger-ui-express"
import specs from '../swagger/swagger.js'
import usersRoutes from './routes/users.routes.js'
import rolesRoutes from './routes/roles.routes.js'
import categoriesRoutes from './routes/categories.routes.js'
import adressesRoutes from './routes/adresses.routes.js'
import citiesRoutes from './routes/cities.routes.js'
import productsRoutes from './routes/products.routes.js'
import reservationsRoutes from './routes/reservations.routes.js'
import rentRoutes from './routes/rents.routes.js'
import paymentsRoutes from './routes/payments.routes.js'
import checklistsRoutes from './routes/checklists.routes.js'
import purchasesRoutes from './routes/purchases.routes.js'
import codesRoutes from './routes/codes.routes.js'

const app = express()
//const whitelist = ["http://127.0.0.1:5500", "http://localhost:3000"]
/* const corsOptions = {
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
}; */



app.options('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, PUT, PATCH, POST, DELETE");
    res.sendStatus(204);
});

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cookieParser());

app.use((req, res, next) => {
    console.log('CORS Headers:', res.getHeaders());
    next();
});


app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
        next();
    }
});

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use('/api', usersRoutes)
app.use('/api', rolesRoutes)
app.use('/api', categoriesRoutes)
app.use('/api', adressesRoutes)
app.use('/api', citiesRoutes)
app.use('/api', productsRoutes)
app.use('/api', reservationsRoutes)
app.use('/api', rentRoutes)
app.use('/api', paymentsRoutes)
app.use('/api', checklistsRoutes)
app.use('/api', purchasesRoutes)
app.use('/api', codesRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message : 'Not found'
    })
})

export default app;