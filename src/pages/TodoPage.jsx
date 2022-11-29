import { useState } from 'react';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useEffect } from 'react';
import { createTodo, getTodos, patchTodo } from 'api/todos';

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const todoNum = todos.length;

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleAddTodo = async () => {
    if (inputValue.length === 0) {
      return;
    }

    try {
      const data = await createTodo({ title: inputValue, isDone: false });

      setTodos((preTodos) => {
        return [
          ...preTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
    } catch (error) {
      console.error(error);
    }
    //clear input box
    setInputValue('');
  };

  const handleKeyDown = async () => {
    if (inputValue.length === 0) {
      return;
    }

    try {
      const data = await createTodo({ title: inputValue, isDone: false });

      setTodos((preTodos) => {
        return [
          ...preTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
    } catch (error) {
      console.error(error);
    }
    //clear input box
    setInputValue('');
  };

  const handleToggleDone = async (id) => {
    const currentTodo = todos.find((todo) => todo.id === id);

    try {
      await patchTodo({ id, isDone: !currentTodo.isDone });

      setTodos((preTodos) => {
        return preTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((preTodos) => {
      return preTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return { ...todo, isEdit: false };
      });
    });
  };

  const handleSave = async ({ id, title }) => {
    try {
      await patchTodo({ id, title });

      setTodos((preTodos) => {
        return preTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              title,
              isEdit: false,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    setTodos((preTodos) => {
      return preTodos.filter((todo) => todo.id !== id);
    });
  };

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();

        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (error) {
        console.error(error);
      }
    };
    getTodosAsync();
  }, []);

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer todoNum={todoNum} />
    </div>
  );
};

export default TodoPage;
