const { ApolloServer, gql } = require('apollo-server');

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
const User = require('./models/User');
const Article = require('./models/Article');
mongoose
    .connect(
        process.env.M_DB,
        { useNewUrlParser: true }
    )
    .then(() => console.log('Mongo Connected'))
    .catch(err => console.log(err));

const server = new ApolloServer({
    typeDefs,
    context: {
        User,
        Article
    }
});
server.listen().then(({ url }) => {
    console.log(`Listen on port ${url}`);
});
