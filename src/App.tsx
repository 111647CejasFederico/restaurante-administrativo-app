import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Login from "./pages/Login.page";
import PageContainer from "./components/PageContainer.component";
import useUrlAxio from "./hooks/urlAxio.hook";

export default function App() {
  const { setUrlAxio } = useUrlAxio();
  React.useEffect(() => {
    setUrlAxio("http://localhost:3010/");
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PageContainer />
    </LocalizationProvider>
  );
}
