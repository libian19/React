import React from "react";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { CreateTodoButton } from "../CreateTodoButton";

function AppUI({
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue,
    searchTodos,
    completeTodo,
    deleteTodo,
})  {

    return(
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
                {error && <p>Caramba, hubo un error!!</p>}
                {loading && <p>Espera, estamos cargando...</p>}
                {(!loading && !searchTodos.length) && <p>Crea tu primer TODOs!</p>}
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
    )
}

export { AppUI }