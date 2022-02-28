import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import NotFound from "./components/pages/NotFound";
import Register from "./components/pages/Register";
import { UserProvider } from "./context/userContext";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
