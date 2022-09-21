import React from "react";
import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from "./TodoSearch";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";
import { CreateTodoButton } from "./CreateTodoButton";
//import './App.css';

const defaulTodos= [
  {text: 'Comprar verduras', completed: false},
  {text: 'Lavar ropa', completed: false },
  {text: 'Estudiar', completed: false},
  {text: 'Pasear a la mascota', completed: true },
];

function App() {
  //Se toma el estado del array de Todos
    const [todos, setTodos]= React.useState(defaulTodos);
  //Se toma el estado de nuestra busqueda
    const [searchValue, setSearchValue] = React.useState('');
  //Calculando los Todos totales y completados
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
      setTodos(newTodos);
  }
  //Eliminar Todos
    const deleteTodo = (text) => {
      const todoIndex = todos.findIndex(todo => todo.text ===text);
      const newTodos = [...todos];
      newTodos.splice(todoIndex, 1);
      setTodos(newTodos);
    }


  return (
    <React.Fragment>
      
      <TodoCounter
          totalTodos={totalTodos}
          completedTodos={completedTodos}
      />
      
      <TodoSearch
          searchValue={searchValue}
          setSearchValue= {setSearchValue}
      />

      <TodoList>
        {searchTodos.map(todo => (
        <TodoItem 
          key={todo.text} 
          text={todo.text}
          completed={todo.completed}
          onComplete={() => completeTodo(todo.text)}
          onDelete= {() => deleteTodo(todo.text)}
        />
        ))}

      </TodoList>
                    
      <CreateTodoButton/>
        
    </React.Fragment>
  );
}

export default App;
