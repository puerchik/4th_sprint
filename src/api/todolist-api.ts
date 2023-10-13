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
    error: string | null
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
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title })
    },

    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title })
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    }
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTaskType>(`todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<ResponseTaskType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title })
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseTaskType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, { title })
    }
}
