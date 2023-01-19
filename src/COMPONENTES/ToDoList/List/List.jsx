import React from "react";
import Item from "../Item/item";

const List= (props)=>{
    return(
    <React.Fragment>
        <h3>Tareas</h3>
        <ul id="lista-tareas">
            {
                    props.renderList.sort((a, b) => {
                        return b.order-a.order;
                    }).map((task) => {
                    return(
                        <Item task={task} key={task.id} dlt={props.deleteTask} edt={props.editTask} list={props.renderList}/>
                    )
                })
            }
        </ul>
    </React.Fragment>
    )
}
export default List;