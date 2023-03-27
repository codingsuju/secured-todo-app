import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo';

export default class TodosController {
	public async index({request, auth, response}:HttpContextContract){
		const user=await auth.authenticate();
    const todos= await Todo.query().where('email',user.email);
		return todos;
	}
	public async update({ auth, request, params}: HttpContextContract)
  {
    const user=await auth.authenticate();
    const todo = await Todo.find(params.id);
    if (todo) {
        todo.email = user.email;
        todo.title = request.input('title');
        todo.description = request.input('desc');
		    if(request.input('due_date')){
			     todo.due_date=request.input('due_date');
		    }
		    if(request.input('priority')){
			     todo.priority=request.input('priority');
		    }
        if(request.input('completed')){
          todo.completed=request.input('completed');
        }
        //todo.completed = request.input('done')
        if (await todo.save()) {
        return todo
    }
    return; // 422
    }
    return; // 401
  }
	public async store({ auth,request, response}: HttpContextContract)
  {
    const user = await auth.authenticate();
    const todo = new Todo();
    todo.email= user.email;
    todo.title = request.input('title');
    todo.description = request.input('desc');
		if(request.input('due_date')){
			todo.due_date=request.input('due_date');
		}
		if(request.input('due_date')){
			todo.due_date=request.input('due_date');
		}
		if(request.input('priority')){
			todo.priority=request.input('priority');
		}
    if(request.input('completed')){
      todo.completed=request.input('completed');
    }
    await todo.save()
    return todo;
  }
}
