import express from 'express'
import Hello from "./hello.js"
const app = express()
Hello(app)
app.listen(process.env.PORT || 4000)
