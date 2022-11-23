import { useState } from 'react';
import { Footer, Header, TodoCollection, TodoInput } from 'components';

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = (value) => {
    setInputValue(value);
  };

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput inputValue={inputValue} onChange={handleInput} />
      <TodoCollection todos={todos} />
      <Footer />
    </div>
  );
};

export default TodoPage;
