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
    infiniteScrollArticle: async (_, args, { Article }) => {
        let article;
        if (args.pageNum === 1) {
            article = await Article.find({})
                .sort({ createdDate: 'desc' })
                .populate({
                    path: 'createdBy',
                    model: 'User'
                })
                .limit(args.pageSize);
        } else {
            const skips = args.pageSize * (args.pageNum - 1);
            article = await Article.find({})
                .sort({ createdDate: 'desc' })
                .populate({
                    path: 'createdBy',
                    model: 'User'
                })
                .skip(skips)
                .limit(args.pageSize);
        }
        const total = await Article.countDocuments();
        const hasMore = total > args.pageSize * args.pageNum;
        return { article, hasMore };
    }
};

module.exports = Query;
