const Mutation = {
    signupUser: async (parent, { username, email, password }, ctx, _) => {
        const user = await ctx.User.findOne({ username });
        if (user) {
            throw new Error('already thi user in database');
        }
        const newUser = await new ctx.User({
            username,
            email,
            password
        }).save();
        console.log(newUser);
        return newUser;
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
