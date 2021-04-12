import TodoInterface from "../propModels/Todo.interface";
import http from "./httpservice";

const url = "/todos"; //move to config

function createUrl(id: string): string {
    return `${url}/${id}`;
}

export function getTodos(): Promise<{data: TodoInterface[]}> {
    return http.get(url);
}
export function createTodo(todo: {description: string, finished: boolean}) {
    return http.post(url, todo);
}
export function saveTodo(id:string, todo: TodoInterface) {
    return http.patch(createUrl(id), todo);
}
export function removeTodo(id: string) {
    return http.delete(createUrl(id));
}