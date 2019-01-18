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
    getUser: async (parent, args, { User }) => {
        const user = await User.find({}).sort({ joinDate: 'desc' });
        return user;
    }
};

module.exports = Query;
