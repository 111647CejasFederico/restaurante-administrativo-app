import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import TabOtrosMaestros from "../modules/otrosMaestros.moudules/TabOtrosMaestros";
import TabUsuarios from "../modules/usuarios.modules/TabUsuarios";
import TabPromociones from "../modules/promociones.modules/TabPromociones";
import TabProductos from "../modules/productos.modules/TabProductos";

export default function Maestros() {
  return (
    <Tabs aria-label="Maestros tabs" sx={{ bgcolor: "transparent" }} defaultValue={0}>
      <TabList
        disableUnderline
        sx={{
          p: 0.5,
          gap: 0.5,
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            boxShadow: "sm",
            bgcolor: "background.surface",
          },
        }}
      >
        <Tab>Productos</Tab>
        <Tab>Promociones</Tab>
        <Tab>Usuarios</Tab>
        <Tab>Otros Maestros</Tab>
      </TabList>
      <TabPanel value={0}>
        <TabProductos />
      </TabPanel>
      <TabPanel value={1}>
        <TabPromociones />
      </TabPanel>
      <TabPanel value={2}>
        <TabUsuarios />
      </TabPanel>
      <TabPanel value={3}>
        <TabOtrosMaestros />
      </TabPanel>
    </Tabs>
  );
}
