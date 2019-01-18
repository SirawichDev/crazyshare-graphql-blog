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
    }
};

module.exports = Mutation;
