import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";

export default function UpdateTodo() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/todos/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("Error, cannot update Todo");
        console.log(err);
      });
  }, [id]);

  function handleUpdateTodo() {
    const todo = {
      title,
    };
    setLoading(true);
    axios
      .patch(`http://localhost:8000/todos/${id}`, todo)
      .then(() => {
        setLoading(false);
        enqueueSnackbar(`${todo.title} was updated successfully!`, {
          variant: "success",
        });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("Error, cannot update todo", { variant: "error" });
        console.log(err);
      });
  }
  return (
    <div className="p-4 w-full h-[80svh] sm:h-full">
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col w-[40rem] p-4 mx-auto gap-y-8 sm:w-full sm:grid sm:place-content-center sm:text-center">
        <div className="my-4 flex justify-between items-center sm:grid sm:gap-2">
          <label className="text-xl text-gray-500">Update Todo</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2 w-8/12 bg-blue-50 sm:w-full sm:py-1"
            maxLength={50}
          />
          <span className="text-gray-500">{title.length}/50</span>
        </div>
        <div className="flex justify-around items-center sm:grid sm:gap-3">
          <Button
            variant="contained"
            color="success"
            onClick={handleUpdateTodo}
          >
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
