const express = require('express')
const app = express()
const mongoose = require('mongoose')

const port = 5555

app.get('/', (req, res) => {
    res.send('Running!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})