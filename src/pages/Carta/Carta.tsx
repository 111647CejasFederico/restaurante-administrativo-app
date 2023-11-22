import { Tab, TabList, TabPanel, Tabs, tabClasses } from "@mui/joy";
import { useState, useEffect } from "react";
import CustomToast from "../../components/CustomToast/CustomToast";
import { useNotificacion } from "../../hooks/notificaciones.hook";
import FormCarta from "./FormCarta";
import { CartaInterface } from "../../interfaces/carta.interface";
import { buscarObjetoPorCampos } from "../../utils/Arrays.util";
import axios from "axios";
import useUrlAxio from "../../hooks/urlAxio.hook";
import useSesion from "../../hooks/usuarioLogueado.hook";

const Carta = () => {
  const { Notificacion, MostrarNotificacion, OcultarNotificacion } = useNotificacion();
  const [cartas, setCartas] = useState<CartaInterface[]>([]);
  const [cartaSeleccionada, setCartaSeleccionada] = useState<CartaInterface>({
    id: -1,
    nombre: "",
    descripcion: "",
    fechaInicioValidez: "",
    fechaFinValidez: "",
    habilitado: false,
  });

  const { getUrlAxio } = useUrlAxio();
  const { getSesion } = useSesion();

  const getCartas = async (cartaSeleccionada: CartaInterface) => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${getSesion().token}`,
        },
      };
      let cartasResponse = await axios.get(`${getUrlAxio()}Carta`, config);

      if (cartasResponse.data.length > 0 && cartaSeleccionada) {
        setCartas(cartasResponse.data);
        setCartaSeleccionada(
          buscarObjetoPorCampos(
            cartasResponse.data,
            ["id", "nombre", "fechaInicioValidez", "fechaFinValidez", "descripcion", "habilitado"],
            cartaSeleccionada
          ) || {
            id: -1,
            nombre: "",
            descripcion: "",
            fechaInicioValidez: "",
            fechaFinValidez: "",
            habilitado: false,
          }
        );
      }
    } catch (e) {
      MostrarNotificacion({ mostrar: true, mensaje: "Error", color: "rojo" });
    }
  };

  useEffect(() => {
    getCartas(cartaSeleccionada);
  }, []);

  return (
    <Tabs
      orientation={"horizontal"}
      aria-label="Carta tabs"
      sx={{ bgcolor: "transparent" }}
      defaultValue={cartaSeleccionada.id}
    >
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
        <Tab key={0} value={0}>
          Nueva Carta
        </Tab>
        {cartas.map((carta) => (
          <Tab key={carta.id} value={carta.id}>
            {carta.nombre}
          </Tab>
        ))}
      </TabList>
      <TabPanel value={0}>
        <FormCarta
          modo="registrar"
          MostrarNotificacion={MostrarNotificacion}
          cartaSeleccionada={cartaSeleccionada}
          cargarCarta={getCartas}
        />
      </TabPanel>
      {cartas.map((carta) => (
        <TabPanel key={carta.id} value={carta.id}>
          <FormCarta
            modo="consulta"
            MostrarNotificacion={MostrarNotificacion}
            cartaSeleccionada={carta}
            cargarCarta={getCartas}
          />
        </TabPanel>
      ))}
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
};

export default Carta;
