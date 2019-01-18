const { ApolloServer } = require('apollo-server');

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, './typeDef_schemas/schema.gql');
const schema = fs.readFileSync(filePath, 'utf-8');

const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');

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
    typeDefs: schema,
    resolvers: {
        Mutation,
        Query
    },
    context: {
        User,
        Article
    }
});
server.listen().then(({ url }) => {
    console.log(`Listen on port ${url}`);
});
