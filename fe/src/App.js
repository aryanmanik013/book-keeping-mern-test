import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Book from "./pages/Components/Book";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Homepage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/book/:id"
          element={
            <ProtectedRoutes>
              <Book />
            </ProtectedRoutes>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
