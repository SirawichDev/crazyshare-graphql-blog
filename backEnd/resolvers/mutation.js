const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;
    return jwt.sign({ username, email }, secret, { expiresIn });
};
const Mutation = {
    signupUser: async (parent, { username, email, password }, ctx, _) => {
        const user = await ctx.User.findOne({ username });
        if (user) {
            throw new Error(`${user.username} already in database`);
        }
        const newUser = await new ctx.User({
            username,
            email,
            password
        }).save();
        console.log(newUser);
        return { token: createToken(newUser, process.env.SECRET, '2hr') };
    },
    signinUser: async (parent, args, ctx, info) => {
        const user = await ctx.User.findOne({ username: args.username });
        if (!user) {
            throw new Error('user not found');
        }
        const checkPassword = await bcrypt.compare(
            args.password,
            user.password
        );
        if (!checkPassword) {
            throw new Error('Invalid Password');
        }
        return { token: createToken(user, process.env.SECRET, '2hr') };
    },
    createArticle: async (parent, args, { Article }) => {
        const {
            title,
            imageUrl,
            kind,
            description,
            trumbs_up,
            createdBy
        } = args;
        const newArticle = new Article({
            title,
            imageUrl,
            kind,
            description,
            trumbs_up,
            createdBy
        }).save();
        return newArticle;
    }
};

module.exports = Mutation;
