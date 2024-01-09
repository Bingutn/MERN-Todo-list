import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import UpdateTodo from "./pages/UpdateTodo";
import DeleteTodo from "./pages/DeleteTodo";
import "./App.css";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="bg-gradient-to-t from-gray-700 via-gray-900 to-black w-svw min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos/add" element={<AddTodo />} />
        <Route path="/todos/update/:id" element={<UpdateTodo />} />
        <Route path="/todos/delete/:id" element={<DeleteTodo />} />
      </Routes>
    </div>
  );
}
