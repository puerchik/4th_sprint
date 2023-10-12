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

type TaskType = {
    addedDate: Date
    deadline: string
    description: string
    id: string
    order: number
    priority: number
    startDate: string
    status: number
    title: string
    todoListId: string
}

type GetTaskType = {
    error: string
    items: TaskType[]
    totalCount: number
}

type ResponseTaskType<T = {}> = {
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

export const tasksAPI = {
    getTasks(todolistId: string) {
        const promise = instance.get<GetTaskType>(`todo-lists/${todolistId}/tasks`)

        return promise;
    },

    createTask(todolistId: string, title: string) {
        const promise = instance.post<ResponseTaskType<TaskType>>(`todo-lists/${todolistId}/tasks`, { title })

        return promise;
    },

    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)

        return promise;
    },

    updateTask(todolistId: string, taskId: string, title: string) {
        const promise = instance.put<ResponseTaskType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, { title })

        return promise;
    }
}
