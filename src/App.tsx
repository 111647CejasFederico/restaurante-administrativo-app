import { useEffect } from "react";
import Login from "./pages/Login.page";
import PageContainer from "./components/PageContainer.component";
import useUrlAxio from "./hooks/urlAxio.hook";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  const { setUrlAxio } = useUrlAxio();
  useEffect(() => {
    setUrlAxio("http://localhost:3010/");
  }, []);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/Login" Component={Login} />
        <Route path="/Portal/" Component={PageContainer} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
