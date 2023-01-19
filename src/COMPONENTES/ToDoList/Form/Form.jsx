import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import { Task } from "../../../objectTask/objectTask";

const Form = (props)=>{
  
    const [description, setDescription] = useState("")
    const [priorityType, setPriority] = useState("")
    const [buttonStatus, isDisabled] = useState(true)
    const [repeatedItem, isRepeated] = useState(false)
 
    const recorrida = (lista, tarea) => {
        lista.forEach(element => {
          console.log(element.description, tarea)
          if(element.description == tarea){
            isRepeated(true)
          }
        });
    }
    
    const newTask = () =>{
      recorrida(props.listOfItems, description)
      if (repeatedItem){
       let order = 0;
       switch (priorityType){
         case 'prioridad-alta':
           order = 100
           break;
         case 'prioridad-media':
           order = 50
           break;
         default:
           order = 0
           break;
        }
        props.eventButton(new Task(description, priorityType, new Date(), false,order))
        setDescription("")
        setPriority("")
      }
      else{
        isRepeated(true)
      }
    }

    useEffect(()=>{
      if(props.toEdit){
        setDescription(props.toEdit.task)
        setPriority(props.toEdit.priority)
      }
    },[props.toEdit])

    useEffect(() => {
      isDisabled(isEmptyForm())
    },[description, priorityType])

    function isEmptyForm(){
      return (description === "" || priorityType === "")
    }
    
    return(
      <>
        <form>
            <input id="task" type="text" name="tarea" value={description} placeholder="Descripción de la tarea" onChange={(e) => setDescription(e.target.value)} className={repeatedItem ? 'error' : ''}/>
            <select name="priority" value={priorityType} id="priority" onChange={(e) => setPriority(e.target.value)}>
            <option value="" disabled>Prioridad</option>
            <option value="prioridad-baja">baja</option>
            <option value="prioridad-media">media</option>
            <option value="prioridad-alta">alta</option>
            </select>
            <button id="add" type="button" onClick={newTask} disabled={buttonStatus}>Agregar!</button>
        </form>
      </>
    )
}
export default Form;




