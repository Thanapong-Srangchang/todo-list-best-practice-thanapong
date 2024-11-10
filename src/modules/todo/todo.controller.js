import { Router } from "express";
import { 
    createTodo, 
    deleteTodoById, 
    findTodoById, 
    findManyTodoList, 
    updateTodoById 
} from "./todo.service";

export const router = Router();

router.post('/todos', async (request, response)=>{
    try {
        const newTodo = await createTodo(request.body);
        response.send(newTodo);

    } catch (error) {
        response.status(500).send(error);

    }
    // response.send('Todo working');
});

router.patch('/todos/:id' , async (request, response)=>{
    try {
        const updated = await updateTodoById(
            request.params.id, 
            request.body

        );
        
        response.send(updated);

    } catch (error) {
        response.status(500).send(error);
    }
});

router.delete('/todos/:id' , async (request , response)=>{
    try {
      await deleteTodoById(request.params.id);
        response.send({
            id: request.params.id,
            isDeleted: true
        })
       
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/todos/:id', async (request , response)=>{
    try {
        const result = await findTodoById(request.params.id);
        
        if (result === null) {
            response
            .status(404)
            .send({ message: `Todo not found => 
            ${request.params.id}`});
            return;
        };
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})

router.get("/todos", async (request, response)=>{
    try {
        const list = await findManyTodoList(request.query);
        response.send(list)
    } catch (error) {
        response.status(500).send(error);
    }
})
