import express from 'express'
import cors from 'cors'
import swaggerUI from "swagger-ui-express"
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

const app = express()
app.use(cors())

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use('/', swaggerUI.serve, swaggerUI.setup())

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

app.use((req, res, next) => {
    res.status(404).json({
        message : 'Not found'
    })
})

export default app;