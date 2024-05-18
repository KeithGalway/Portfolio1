const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3500

const app = express()

// serve static files
app.use(express.static(path.join(__dirname, '/public')))

app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname })
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/about(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'))
})

app.get('/services(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'services.html'))
})

app.get('/ad(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'ad.html'))
})

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))