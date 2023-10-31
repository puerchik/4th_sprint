import { TodolistType, todolistsAPI } from '../api/todolists-api'
import { Dispatch } from 'redux';
import { AppRootStateType } from './store';


export type SetTodosType = ReturnType<typeof setTodosAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodosType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case 'SET-TODOS': {
            return action.todos
        }

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', id: todolistId } as const
}
export const addTodolistAC = (title: string, todolistId: string) => {
    return { type: 'ADD-TODOLIST', title: title, todolistId } as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title } as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter } as const
}

export const setTodosAC = (todos: TodolistDomainType[]) => {
    return {
        type: "SET-TODOS",
        todos
    } as const
}

export const fetchTodosTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodosAC(res.data))
        })
}

export const removeTodolistTC = (todolistId: string) => {
    return (
        (dispatch: Dispatch) => {
            todolistsAPI.deleteTodolist(todolistId)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(removeTodolistAC(todolistId))
                    }
                })
        }
    )
}

export const addTodolistTC = (title: string) => {
    return (
        (dispatch: Dispatch) => {
            todolistsAPI.createTodolist(title)
                .then((res) => {
                    dispatch(addTodolistAC(title, res.data.data.item.id))
                })
        }
    )
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (
        (dispatch: Dispatch) => {
            todolistsAPI.updateTodolist(todolistId, title)
                .then(() => {
                    dispatch(changeTodolistTitleAC(todolistId, title))
                })
        }
    )
}
