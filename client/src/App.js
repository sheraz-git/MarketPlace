import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthRoute from "./components/AuthRoute";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ProductInfo from "./pages/ProductInfo";
function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <AuthRoute><Home /></AuthRoute> } />
          <Route path="/Profile" element={ <AuthRoute><Profile /></AuthRoute> } />
          <Route path="/Admin" element={ <AuthRoute><Admin /></AuthRoute> } />
          <Route path="/ProductInfo/:id" element={ <AuthRoute><ProductInfo /></AuthRoute> } />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
