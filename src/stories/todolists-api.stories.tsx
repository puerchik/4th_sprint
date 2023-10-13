import React, { ChangeEvent, useEffect, useState } from 'react'
import { tasksAPI, todolistAPI } from '../api/todolist-api'

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onClickHander = () => {
        todolistAPI.createTodolist(value)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            <div>
                <input value={value} onChange={onChangeHandler} placeholder='Enter the title of new Todolist' />
                <button onClick={onClickHander}>create</button>
            </div>
            {JSON.stringify(state)}
        </div>
    )
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onClickHander = () => {
        todolistAPI.deleteTodolist(value)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            <div>
                <input value={value} onChange={onChangeHandler} placeholder='Enter the id of Todolist' />
                <button onClick={onClickHander}>delete</button>
            </div>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoTitle, setTodoTitle] = useState<string>('')
    const [todoId, setTodoId] = useState<string>('')

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoTitle(e.currentTarget.value)
    }

    const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoId(e.currentTarget.value)
    }

    const onClickHander = () => {
        todolistAPI.updateTodolist(todoId, todoTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            <input value={todoId} onChange={onChangeId} placeholder='Enter the id of Todolist' />
            <input value={todoTitle} onChange={onChangeTitle} placeholder='Enter the new title of Todolist' />
            <button onClick={onClickHander}>change title</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onClickHander = () => {
        tasksAPI.getTasks(value)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            <div>
                <input value={value} onChange={onChangeHandler} placeholder='Enter the id of Todolist' />
                <button onClick={onClickHander}>show tasks</button>
            </div>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todoId, setTodoId] = useState<string>('')

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoId(e.currentTarget.value)
    }

    const onClickHander = () => {
        tasksAPI.createTask(todoId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            <div>
                <input value={todoId} onChange={onChangeId} placeholder='Enter the id of Todolist' />
                <input value={taskTitle} onChange={onChangeTitle} placeholder='Enter the title of new Task' />
                <button onClick={onClickHander}>create task</button>
            </div>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todoId, setTodoId] = useState<string>('')

    const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    const onChangeTodoId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoId(e.currentTarget.value)
    }

    const onClickHander = () => {
        tasksAPI.deleteTask(todoId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            <div>
                <input value={todoId} onChange={onChangeTodoId} placeholder='Enter the id of Todolist' />
                <input value={taskId} onChange={onChangeTaskId} placeholder='Enter the id of Task' />
                <button onClick={onClickHander}>delete task</button>
            </div>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todoId, setTodoId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')

    const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    const onChangeTodoId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoId(e.currentTarget.value)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onClickHander = () => {
        tasksAPI.updateTask(todoId, taskId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            <div>
                <input value={todoId} onChange={onChangeTodoId} placeholder='Enter the id of Todolist' />
                <input value={taskId} onChange={onChangeTaskId} placeholder='Enter the id of Task' />
                <input value={taskTitle} onChange={onChangeTitle} placeholder='Enter the new title of Task' />
                <button onClick={onClickHander}>change task title</button>
            </div>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}


