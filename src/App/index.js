import React from "react";
import { AppUI } from "./AppUI";

//import './App.css';

/*const defaulTodos= [
  {text: 'Comprar verduras', completed: false},
  {text: 'Lavar ropa', completed: false },
  {text: 'Estudiar', completed: false},
  {text: 'Pasear a la mascota', completed: true },
];
*/

function useLocalStorage(itemName, initialValue){
  const[loading, setLoading]= React.useState(true);
  const[error, setError]= React.useState(false);
  //Se toma el estado del array de Todos
  const [item, setItem]= React.useState(initialValue);
  
  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem= localStorage.getItem(itemName);
        let parsedItem;
    
        if (!localStorageItem){
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem= [];
        }else{
          parsedItem= JSON.parse(localStorageItem);
      }

        setItem(parsedItem);
        setLoading(false);
        } catch (error) {
          setError(error);
      }
    }, 1000);
  });
  

 //Persistencia en localStorage
 const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifiedItem);
    setItem(newItem);
    
    } catch (error) {
      setError(error);
    }
  }
  return{
    item,
    saveItem,
    loading,
    error,
  }
}

function App() {
   const {
      item: todos,
      saveItem: saveTodos,
      loading,
      error,
   }= useLocalStorage('TODOS_V1', []);

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


  return (
    <AppUI
      loading={loading}
      error={error}
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue= {setSearchValue}
      searchTodos= {searchTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
