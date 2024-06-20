import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLocalStorage();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    confirm("Are you sure you want to delete this todo?");
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-4 rounded-xl p-4 bg-pink-200 min-h-[80vh] md:w-1/2 w-[80%]">
        <h1 className="font-bold text-center text-xl md:text-xl">
          Todo - Manage your tasks at one place
        </h1>
        <div className="addTodo my-4">
          <h2 className="text-lg font-bold my-2">Add a Todo</h2>
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full rounded-lg px-5 py-1"
              value={todo}
              onChange={handleChange}
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-pink-800 hover:bg-pink-950 px-2 py-1 text-white rounded-md text-sm disabled:bg-pink-500"
            >
              Save
            </button>
          </div>
        </div>
        <input
          type="checkbox"
          checked={showFinished}
          onChange={toggleFinished}
        />
        <label htmlFor="show"> Show Finished</label>
        <div className="bg-pink-800 h-[1px] my-2"></div>

        <h2 className=" text-lg font-bold my-2">Your Todo List</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-3">No todos yet!</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex justify-between w-full my-2 items-center"
                >
                  <div className="flex gap-2 text-sm">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-pink-800 hover:bg-pink-950 px-3 py-1 text-white rounded-md mx-2 text-sm"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-pink-800 hover:bg-pink-950 px-2 py-1 text-white rounded-md mx-2 text-sm"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
