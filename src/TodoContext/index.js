import React, { createContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props){
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
     }= useLocalStorage('TODOS_V1', []);

    //Creamos el estado para el Modal
      const [openModal, setOpenModal] = React.useState(false);

    
    //Se toma el estado de nuestra busqueda
      const [searchValue, setSearchValue] = React.useState('');
      const totalTodos= todos.length;
      const completedTodos= todos.filter(todo => todo.completed).length;
  
    //Creamos un array para guardar las coincidencias de la busqueda
      let searchTodos=[];
   
    //Filtrar conincidencias en la busqueda
      if (!searchValue.length >=1){
        searchTodos= todos;
      }else{
        searchTodos= todos.filter(todo => {
          const todoText= todo.text.toLowerCase();
          const searchText= searchValue.toLowerCase();
          return todoText.includes(searchText);
        });
      }
    
    //Añadir Todos
      const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
          completed: false,
          text,
        });
        saveTodos(newTodos);
      }
 
    //Marcar como completado
      const completeTodo = (text) => {
      const todoIndex = todos.findIndex(todo => todo.text === text);
      const newTodos = [...todos];
      newTodos[todoIndex].completed = true;
      saveTodos(newTodos);
    }
    //Eliminar Todos
      const deleteTodo = (text) => {
      const todoIndex = todos.findIndex(todo => todo.text ===text);
      const newTodos = [...todos];
      newTodos.splice(todoIndex, 1);
      saveTodos(newTodos);
    }
   
return(
    <TodoContext.Provider value={{
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchTodos,
        addTodo,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
    }}>
        {props.children}
    </TodoContext.Provider>
)
}

export {TodoContext, TodoProvider}
