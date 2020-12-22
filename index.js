const
    app = require("express")()
    ,port = 4004
    ;

app.get('*', (req, res) => {
    res.send('Test');
})

app.get('*')

app.listen(port, () => {
    console.log(`App is ready at http://localhost:${port}`);
});