const Query = {
    getArticle: async (parent, args, { Article }) => {
        const article = await Article.find({})
            .sort({ createdDate: 'desc' })
            .populate({
                path: 'createdBy',
                model: 'User'
            });
        return article;
    },
    currentUser: async (parent, args, ctx, info) => {
        if (!ctx.currentUser) {
            return null;
        }
        const user = await ctx.User.findOne({
            username: ctx.currentUser.username
        }).populate({ path: 'bookmarks', model: 'Article' });
        return user;
    },
    getUser: async (parent, args, { User }) => {
        const user = await User.find({}).sort({ joinDate: 'desc' });
        return user;
    }
};

module.exports = Query;
