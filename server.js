const express = require('express');
const morgan = require('morgan');

const app = express();

const guitarists = [
    {id: 1, name: 'Wes Montgomery'},
    {id: 2, name: 'Jimi Hendrix'},
    {id: 3, name: 'Eric Clapton'},
    {id: 4, name: 'Prince'},
    {id: 5, name: 'Eddie Van Halen'},
    {id: 6, name: 'Slash'},
];

app.use(morgan('dev'));
app.use(express.static('assets'));

app.get('/guitarists/:id', (req, res)=> {
    const guitarist = guitarists.find(guitarist => guitarist.id === +req.params.id);
    if(!guitarist){
        /*.status makes the browser interpret a 404 error*/
        res.status(404).send(`<h1>Not Found - No guitarist for id = ${req.params.id}<a href='/'>Try Again</a></h1>`);
    }
    else {
        res.send(`
    <html>
        <head>
            <title>Iconic Guitarists</title>
            <link rel='stylesheet' href='/style.css'/>
        </head>
        <body>
            <h1>Iconic Guitarists</h1>
            <a href='/'>All Guitarists<a/>
            <div>Details for ${guitarist.name}
                <p class="details-text">Details to come...</p>
            </div>
        </body>
    </html>
    `);
    }
});

app.get('/', (req, res)=> {
    res.send(`
    <html>
        <head>
            <title>Iconic Guitarists</title>
            <script src='/script.js' defer></script>
            <link rel='stylesheet' href='/style.css'/>
        </head>
        <body>
            <h1>Iconic Guitarists</h1>
            <ul>
            ${
                guitarists.map( guitarist => {
                    return `<li><a href='/guitarists/${guitarist.id}'>${guitarist.name}</a></li>`;
                }).join('')
            }
            </ul>
        </body>
    </html>
    `)
});
const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));