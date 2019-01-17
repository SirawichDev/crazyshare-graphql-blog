const { ApolloServer, gql } = require('apollo-server');

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

mongoose
    .connect(process.env.M_DB)
    .then(() => console.log('Mongo Connected'))
    .catch(err => console.log(err));

const Me = [
    {
        name: 'Sirawich',
        haveMoney: true
    }
];
const typeDefs = gql`
    type Me {
        name: String
        haveMoney: Boolean
    }
    type Query {
        getMe: [Me]
    }
    type Mutation {
        moneyLost(name: String, haveMoney: Boolean): Me
    }
`;

const resolvers = {
    Query: {
        getMe: () => Me
    },
    Mutation: {
        moneyLost: (_, args) => {
            const donthaveit = { name: args.name, haveMoney: args.haveMoney };
            Me.push(donthaveit);
            return donthaveit;
        }
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers
});
server.listen().then(({ url }) => {
    console.log(`Listen on port ${url}`);
});
