const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    titile: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    kind: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    trumbs_up: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    messages: [
        {
            messageDetail: {
                type: String,
                required: true
            },
            messageDate: {
                type: Date,
                default: Date.now
            },
            messageUser: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            }
        }
    ]
});

module.exports = mongoose.model('Article', ArticleSchema);
