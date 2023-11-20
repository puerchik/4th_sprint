import { ChangeTaskEntityStatusType } from "../features/TodolistsList/tasks-reducer"
import { ChangeTodolistEntityStatusType } from "../features/TodolistsList/todolists-reducer"

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        default:
            return state
    }
}

// actions

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}

export const setAppErrorAC = (error: ErrorType) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}

// types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = null | string

export type AppSetStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>

type ActionsType =
    | AppSetStatusType
    | SetAppErrorType
    | ChangeTodolistEntityStatusType
    | ChangeTaskEntityStatusType
