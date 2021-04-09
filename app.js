const express = require("express");
const app = express();
const port = 3000;
const db = require("./config/db");

app.get('/', (req, res) => res.send('Berhasil mendapatkan response'));
app.use(express.urlencoded({extended:true}));
db.authenticate().then(() => console.log('Connected to db'));
const User = require('./models/user');

app.post('/register', async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const newUser = new User({
            username, email, password
        });

        await newUser.save();

        res.json(newUser);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/get-user', async (req, res) => {
    try {
        const users = await User.findAll();

        res.json(users);
    } catch(e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
})

app.get('/user/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const getUser = await User.findOne({
            where: {id:id}
        });
        res.json(getUser);

    } catch(e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
});

app.delete('/delete-user/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const deleteUser = await User.destroy({
            where: {id:id}
        });

        res.json('Data was successfully deleted!');
    } catch(e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
})

app.put('/edit-user/:id', async (req, res) => {
    try {
        const {username, email, password} =  req.body;
        const id = req.params.id;
        const updateUser = await User.update({
            username, email, password
        }, {
            where: { id:id }
        }

        );

        await updateUser;

        res.json(['Data was sucessfully updated', data = [req.body]]);
    } catch(e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
})

app.listen(port, () => console.log(`Port berhasil dijalankan di : $(port)`));

