import React from "react";
import { useState } from "react";


const Item = ({task, dlt, edt}) => {
    const url = "http://localhost:8080/tasks/"
    const [isCompleted, setStatus] = useState(task.status)

    const changeStatus = (id) => {
        fetch(url+id,{
            method: 'PATCH'
        })
        setStatus(!isCompleted)
    }

    return (
        <li className={`${task.priority_type}`} key={task.id}>
            <p className={isCompleted + '-task'}>{task.description}</p>
            <div id="actions">
                <i onClick={() => changeStatus(task.id)} class="bi bi-check"></i>
                <i onClick={() => edt(task.id)} className="bi bi-pencil-square"></i>
                <i onClick={() => dlt(task.id)} className="bi bi-trash3"></i>
            </div>
        </li>
    )
}
export default Item;
