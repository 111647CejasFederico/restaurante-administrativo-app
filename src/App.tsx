import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Login from "./pages/Login.page";
import PageContainer from "./components/PageContainer.component";
import useUrlAxio from "./hooks/urlAxio.hook";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  const { setUrlAxio } = useUrlAxio();
  React.useEffect(() => {
    setUrlAxio("http://localhost:3010/");
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/Login" Component={Login} />
          <Route path="/Portal/" Component={PageContainer} />
          {/* <Route path="*">
            <div>404 : not found page</div>
          </Route> */}
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}
