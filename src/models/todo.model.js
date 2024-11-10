import mongoose, { Schema } from "mongoose";

const TodoSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    content: {
        type: String,
        default: ''
    },
    status:{
        type: String,
        enum:['in-progress', 'completed', 'backlog', 'canceled' ],
        default: 'in-progress',
    },
    assignee:{
        type: String,
        required: true,
    },
    subscriberCounter :{
        type: Number,
        default: 0,
    },
})
export const TodoModel = mongoose.model('todo',TodoSchema);