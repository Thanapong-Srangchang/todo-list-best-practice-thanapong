import { request, response } from "express";
import { router } from "../../../dist/modules/todo/todo.controller";
import { TodoModel } from "../../models/todo.model"

export function createTodo(TodoData){
    const newTodo = new TodoModel(TodoData)
    return newTodo.save();
}

export function updateTodoById(id, todoData){
    return TodoModel.findByIdAndUpdate(id, todoData)
}

export function deleteTodoById(id) {
    return TodoModel.findByIdAndDelete(id);
};


export function findTodoById(id){
    return TodoModel.findById(id);
}


export function findManyTodoList(query){
    let baseQuery = {};
    if(query.search){
        baseQuery = {
            ...baseQuery,
            ...{
            title:{
             $regex: new RegExp(query.search,'i'),
            },
        },
        };
    }
    if(query.status){
        baseQuery = {...baseQuery,
            status: query.status
        };
    }

    if(query.assignee){
        baseQuery = {
            ...baseQuery,
            assignee: query.assignee,
        };
    };

    if (
        query.subscriberCounter && 
        !query.condition 
    ) {
        baseQuery ={
            ...baseQuery,
            subscriberCounter: 
            query.subscriberCounter,
        };
        
    }

    if(query?.condition === 'or'){
        baseQuery = {
        $or:Object.entries(baseQuery).map(([key, value])=> ({
            [key]: value,
        })),    
        };
    }
    console.log('baseQuery',baseQuery , entries);

    return TodoModel.find(baseQuery);
}