import { useEffect } from "react";
import Login from "./pages/Login.page";
import PageContainer from "./components/PageContainer.component";
import useUrlAxio from "./hooks/urlAxio.hook";
import { Route, Routes, useNavigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import useSesion from "./hooks/usuarioLogueado.hook";

function Redirector() {
  const navigate = useNavigate();
  const { getSesion } = useSesion();

  useEffect(() => {
    const sesion = getSesion();
    if (sesion.id === 0) {
      navigate("/Login");
    } else {
      navigate("/Portal/");
    }
  }, []);

  return null;
}

function App() {
  const { setUrlAxio } = useUrlAxio();
  useEffect(() => {
    setUrlAxio("http://localhost:3010/");
  }, []);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" Component={Redirector} />
        <Route path="/Login" Component={Login} />
        <Route path="/Portal/" Component={PageContainer} />
        <Route path="/Portal/:name" Component={PageContainer} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
