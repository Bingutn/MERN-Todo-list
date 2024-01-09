import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";

export default function DeleteTodo() {
  const [loading, setLoading] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/todos/${id}`)
      .then((response) => {
        setTodoTitle(response.data.title);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  function handleDeleteTodo() {
    setLoading(true);
    axios
      .delete(`http://localhost:8000/todos/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Deleted successfully!", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("Error, cannot delete todo", { variant: "error" });
        console.log(err);
      });
  }

  return (
    <div className="p-4 w-full h-[80svh] sm:h-full">
      {loading ? <Spinner /> : ""}
      <div className="w-[40rem] p-4 mx-auto mt-10 sm:w-full">
        <div className="my-4  text-red-700">
          <h1 className="font-bold text-2xl text-center sm:text-xl">
            Are you sure to delete "{todoTitle}" ?
          </h1>
          <div className="flex justify-around pt-6 sm:grid sm:gap-3">
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteTodo}
            >
              Yes, delete it
            </Button>
            <Button variant="outlined" onClick={() => navigate("/")}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
