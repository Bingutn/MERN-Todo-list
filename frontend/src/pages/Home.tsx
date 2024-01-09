import axios from "axios";
import { useEffect, useState } from "react";

import TodoCard from "../components/TodoCard";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

import { useSnackbar } from "notistack";
import { API } from "../utils/api";

interface Todo {
  _id: string;
  title: string;
  isCompleted: boolean;
}

export const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/todos`)
      .then((res) => {
        setTodos(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("There have a problem to connect the server", {
          variant: "error",
        });
        setLoading(false);
      });
  }, [enqueueSnackbar]);

  function fetchTodos() {
    setLoading(true);
    axios
      .get(`${API}/todos`)
      .then((res) => {
        setTodos(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("There's a problem connecting to the server");
        setLoading(false);
      });
  }
  return (
    <div className="p-4 w-full min-h-[80svh] xl:h-auto lg:h-auto sm:h-auto">
      <div className="flex justify-end items-center pr-4">
        <Link to="/todos/add">
          <MdOutlineAddBox className="text-violet-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <TodoCard todos={todos} fetchTodos={fetchTodos} />

          <div className="text-white flex justify-center">
            {loading === false && todos.length === 0 && (
              <h3 className="italic grid items-center p-10">
                There's have no plan.
                <br />
                Try to add new todo...
              </h3>
            )}
          </div>
        </>
      )}
    </div>
  );
};
