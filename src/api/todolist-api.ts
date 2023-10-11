import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '6b9a4302-d338-4c3f-92e8-87c43e148708'
    }
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put(`todo-lists/${todolistId}`, { title })

        return promise;
    },

    getTodolists() {
        const promise = instance.get('todo-lists')

        return promise;
    },

    createTodolist(title: string) {
        const promise = instance.post('todo-lists', { title })

        return promise;
    },

    deleteTodolist(todolistId: string) {
        const promise = instance.delete(`todo-lists/${todolistId}`)

        return promise;
    }
}
