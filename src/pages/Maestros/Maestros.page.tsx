import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import CustomToast from "../../components/CustomToast/CustomToast";
import { useNotificacion } from "../../hooks/notificaciones.hook";
import TabOtrosMaestros from "./otrosMaestros.moudules/TabOtrosMaestros";
import TabUsuarios from "./usuarios.modules/TabUsuarios";
import TabPromociones from "./promociones.modules/TabPromociones";
import TabProductos from "./productos.modules/TabProductos";

export default function Maestros() {
  const { Notificacion, MostrarNotificacion, OcultarNotificacion } = useNotificacion();
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
        <TabProductos MostrarNotificacion={MostrarNotificacion} />
      </TabPanel>
      <TabPanel value={1}>
        <TabPromociones MostrarNotificacion={MostrarNotificacion} />
      </TabPanel>
      <TabPanel value={2}>
        <TabUsuarios MostrarNotificacion={MostrarNotificacion} />
      </TabPanel>
      <TabPanel value={3}>
        <TabOtrosMaestros MostrarNotificacion={MostrarNotificacion} />
      </TabPanel>
      {Notificacion.mostrar && (
        <CustomToast
          color={Notificacion.color}
          mensaje={Notificacion.mensaje}
          mostrar={Notificacion.mostrar}
          onClose={OcultarNotificacion}
        />
      )}
    </Tabs>
  );
}
