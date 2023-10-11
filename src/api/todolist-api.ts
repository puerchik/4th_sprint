import axios from 'axios'

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
 }
 

export type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '6b9a4302-d338-4c3f-92e8-87c43e148708'
    }
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`, { title })

        return promise;
    },

    getTodolists() {
        const promise = instance.get<ResponseType<TodolistType>>('todo-lists')

        return promise;
    },

    createTodolist(title: string) {
        const promise = instance.post<ResponseType>('todo-lists', { title })

        return promise;
    },

    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`)

        return promise;
    }
}
