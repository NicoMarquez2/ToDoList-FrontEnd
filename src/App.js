import React, {useEffect, useState} from 'react';
import './App.css';
import Title from './COMPONENTES/ToDoList/Title/Title';
import Form from './COMPONENTES/ToDoList/Form/Form';
import List from './COMPONENTES/ToDoList/List/List';
import { Task } from './objectTask/objectTask';

function App() {
  const url = "http://localhost:8080/tasks"
  const [list, setList] = useState([])
  const [toEdit, setEdit] = useState()

  const addToList =((task)=>{
    fetch(url,{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(task),
    })
    .then((data)=> {
      getTasks()
    })
  });

  const deleteItem = async (id)=> {
    await fetch(`${url}/${id}/`,{
      method: 'DELETE',
    }).then((data) => data.json())
    getTasks();
  }

  const editItem = (id) => {
    setEdit(list.find((task) => task.id == id))
    deleteItem(id)
  }

  const deleteAll = () =>{
    list.forEach((task) =>{
        deleteItem(task.id)
    })
  }
  
  const getTasks = () => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setList(data)
      })
     
  }

  useEffect(()=>{
    getTasks()
  },[])

  return (
    <React.Fragment>
      <main>
        <Title
          text="Lista de Tareas!"
        />
        <Form eventButton={addToList} 
              toEdit = {toEdit}
              deleteTask={deleteItem}
              listOfItems={list}/>

        <List renderList={list}
              deleteTask={deleteItem}
              editTask={editItem}/>
        {
          list.length == 0 && <span>Parece que no hay nada por aquí!</span>
        }
        {    
          list.length > 0 && <button onClick={deleteAll}>Eliminar todo</button>
        }
      </main>
    </React.Fragment>
  );
}

export default App;

