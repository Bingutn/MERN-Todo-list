import axios from "axios";
import { useState } from "react";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

import { useSnackbar } from "notistack";
import { Button } from "@mui/material";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  function handleAddTodo(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    const newTodo = {
      title,
      isCompleted: false,
    };

    if (!title) {
      return enqueueSnackbar("Please input todo", { variant: "error" });
    }

    setLoading(true);
    axios
      .post("http://localhost:8000/todos", newTodo)
      .then(() => {
        setLoading(false);
        setTitle("");
        enqueueSnackbar("Todo create successfully!", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("Error, cannot add new todo", { variant: "error" });
        console.log(err);
      });
  }
  return (
    <div className="p-4 mt-10 w-full h-[80svh] sm:h-full">
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col w-[40rem] p-4 mx-auto gap-y-8 sm:w-full sm:grid sm:place-content-center sm:text-center">
        <div className="my-4 flex justify-between items-center sm:grid sm:gap-2">
          <label className="text-xl text-gray-500">Add new todo</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="exercise.."
            className="px-4 py-2 w-6/12 bg-blue-50 sm:w-full sm:py-1"
            maxLength={50}
          />
          <span className="text-gray-500">{title.length}/50</span>
        </div>
        <div className="flex justify-around items-center sm:grid sm:gap-3">
          <Button variant="contained" color="success" onClick={handleAddTodo}>
            Save
          </Button>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
