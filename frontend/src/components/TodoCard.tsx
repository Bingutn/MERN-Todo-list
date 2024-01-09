import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import DeleteAllButton from "./DeleteAllButton";

import { useSnackbar } from "notistack";
import { API } from "../utils/api";
import { useState } from "react";

interface Todo {
  _id: string;
  title: string;
  isCompleted: boolean;
}

interface TodoCardProps {
  todos: Todo[];
  fetchTodos: () => void;
}

export default function TodoCard({ todos, fetchTodos }: TodoCardProps) {
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  function toggleCompleteTodo(id: string, isCompleted: boolean) {
    const updatedStatus = !isCompleted;
    setLoading(true);
    axios
      .put(`${API}/todos/${id}`, {
        isCompleted: updatedStatus,
      })
      .then(() => {
        fetchTodos();
        enqueueSnackbar("Todo status updated successfully!", {
          variant: "success",
        });
      })
      .catch((err) => {
        enqueueSnackbar("Error updating todo status", { variant: "error" });
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleDeleteAll() {
    axios
      .delete(`${API}/todos/`)
      .then(() => {
        enqueueSnackbar("All todos was deleted successfully!", {
          variant: "success",
        });
        fetchTodos();
      })
      .catch((err) => {
        enqueueSnackbar("Error, cannot delete all todos", { variant: "error" });
        console.log(err);
      });
  }
  return (
    <div
      className="px-4 py-2 m-4 relative text-white grid place-items-center"
      style={{ cursor: loading ? "wait" : "default" }}
    >
      <div className="grid grid-cols-4 gap-x-10 gap-y-7 h-min w-10/12 xl:grid-cols-3 xl:w-full lg:grid-cols-2 sm:grid-cols-1">
        {todos.map((todo, index) => (
          <div
            key={todo._id}
            className=" text-center border-2 rounded-lg p-4 grid grid-cols-2 gap-y-5 items-center break-words xs:grid-cols-1 xs:text-sm"
            style={{
              backgroundColor: todo.isCompleted === true ? "gray" : "",
            }}
          >
            <p>#{index + 1}</p>
            <p>{todo.title}</p>
            <div className="flex gap-2 justify-center">
              <input
                type="checkbox"
                name="checked"
                className="w-4 cursor-pointer"
                checked={todo.isCompleted}
                onChange={() => toggleCompleteTodo(todo._id, todo.isCompleted)}
              />
              <p>{todo.isCompleted ? "completed" : "on process"}</p>
            </div>

            {todo.isCompleted === false && (
              <div>
                <div className="flex justify-center gap-x-4">
                  <Link to={`/todos/update/${todo._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/todos/delete/${todo._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="m-10">
        {todos.length >= 4 && (
          <DeleteAllButton onClick={() => handleDeleteAll()} />
        )}
      </div>
    </div>
  );
}
