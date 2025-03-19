const express = require('express');
const { MongoClient } = require('mongodb');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'nodeassignment';

let db;

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        db = client.db(DB_NAME);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Load 10 users from JSON Placeholder and store in MongoDB
app.get('/load', async (req, res) => {
    try {
        const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = usersResponse.data.slice(0, 10);

        for (const user of users) {
            const postsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
            const posts = postsResponse.data;

            for (const post of posts) {
                const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
                post.comments = commentsResponse.data;
            }

            user.posts = posts;
        }

        await db.collection('users').insertMany(users);
        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading data');
    }
});

// Delete all users
app.delete('/users', async (req, res) => {
    try {
        await db.collection('users').deleteMany({});
        res.status(200).send("Deleting users");
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting users');
    }
});

// Delete a specific user by userId
app.delete('/users/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const result = await db.collection('users').deleteOne({ id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).send('User not found');
        }

        res.status(200).send("Deleting specific users");
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
});

// Get a specific user by userId including posts and comments
app.get('/users/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const user = await db.collection('users').findOne({ id: userId });

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user');
    }
});

// Add a new user
app.put('/users', async (req, res) => {
    try {
        const user = req.body;

        const existingUser = await db.collection('users').findOne({ id: user.id });
        if (existingUser) {
            return res.status(409).send('User already exists');
        }

        await db.collection('users').insertOne(user);
        res.status(201).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding user');
    }
});

// Start the server
async function startServer() {
    await connectToMongoDB();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();