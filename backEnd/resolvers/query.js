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
    },
    infiniteScrollArticle: async (_, { pageNum, pageSize }, { Article }) => {
        let articles;
        if (pageNum === 1) {
            articles = await Article.find({})
                .sort({ createdDate: 'desc' })
                .populate({
                    path: 'createdBy',
                    model: 'User'
                })
                .limit(pageSize);
        } else {
            const skips = pageSize * (pageNum - 1);
            articles = await Article.find({})
                .sort({ createdDate: 'desc' })
                .populate({
                    path: 'createdBy',
                    model: 'User'
                })
                .skip(skips)
                .limit(pageSize);
        }
        const total = await Article.countDocuments();
        const hasMore = total > pageSize * pageNum;
        return { articles, hasMore };
    },
    getSingleArticle: async (_, { articleId }, { Article }) => {
        const article = await Article.findOne({ _id: articleId }).populate({
            path: 'messages.messageUser',
            model: 'User'
        });
        return article;
    },
    searchArticle: async (_, { searchSentense }, { Article }) => {
        if (searchSentense) {
            const searchResult = await Article.find(
                { $text: { $search: searchSentense } },
                { score: { $meta: 'textScore' } }
            )
                .sort({
                    score: { $meta: 'textScore' },
                    trubms_up: 'desc'
                })
                .limit(5);
            return searchResult;
        }
    },
    getUserArticle: async (_, { userId }, { Article }) => {
        const article = await Article.find({
            createdBy: userId
        });
        console.log('xcxz', article);
        return article;
    }
};

module.exports = Query;
