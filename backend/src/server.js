import express from 'express';

const app = express();

const port = process.env.PORT || 3000;

app.get('/api/jokes', (req, res)=>{
    const jokes = [
        {
            id: 1,
            title: 'A joke',
            content: 'This is a joke'
        },
        {
            id: 2,
            title: 'Another joke',
            content: 'This is another joke'
        },
        {
            id: 3,
            title: '3rd joke',
            content: 'This is 3rd joke'
        },
        {
            id: 4,
            title: '4th joke',
            content: 'This is 4th joke'
        },
        {
            id: 5,
            title: '5th joke',
            content: 'This is 5th joke'
        }
    ];
    res.send(jokes);
})

app.listen(port, ()=>{
    console.log(`Serve at http://localhost:${port}`);
});