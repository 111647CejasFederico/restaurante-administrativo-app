import React, { useEffect, useState } from "react";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import { Column, Container, Row } from "../../components/GridComponents";
import {
  Button,
  Chip,
  Dropdown,
  List,
  ListItem,
  ListItemButton,
  MenuButton,
  Typography,
} from "@mui/joy";
import useUrlAxio from "../../hooks/urlAxio.hook";
import useSesion from "../../hooks/usuarioLogueado.hook";
import axios from "axios";
import { UbicacionInterface } from "../../interfaces/ubicacion.interface";
import { useNotificacion } from "../../hooks/notificaciones.hook";
import { Add, PostAdd } from "@mui/icons-material";

interface GridButtonProps {}

const TabMesas: React.FC<GridButtonProps> = ({}) => {
  const [menuInfo, setUbicacionSeleccionada] = useState({ row: -1, col: -1 });
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [filas, setFilas] = useState<number>(0);
  const [columnas, setColumnas] = useState<number>(0);
  const [ubicaciones, setUbicaciones] = useState<UbicacionInterface[]>([]);
  const [ubicacionSeleccionada, setUbicacionSelecionada] = useState<UbicacionInterface>({
    id: 0,
    nombre: "",
    descripcion: "",
    fila: 0,
    columna: 0,
    disponible: false,
    habilitado: false,
  });

  const { Notificacion, MostrarNotificacion, OcultarNotificacion } = useNotificacion();
  const { getUrlAxio } = useUrlAxio();
  const { getSesion } = useSesion();

  const handleContextClick = (ubicacion: UbicacionInterface | null) => {
    if (ubicacion !== null) {
      setUbicacionSelecionada(ubicacion);
      setOpenPopUp(true);
    }
  };

  const handleCloseMenu = () => {
    setUbicacionSeleccionada({ row: -1, col: -1 });
    setOpenPopUp(false);
  };

  function obtenerMaxFilasColumnas(ubicaciones: UbicacionInterface[]) {
    let maxFilas = 0;
    let maxColumnas = 0;

    ubicaciones.forEach((ubicacion) => {
      if (ubicacion.fila && ubicacion.fila > maxFilas) {
        maxFilas = ubicacion.fila;
      }

      if (ubicacion.columna && ubicacion.columna > maxColumnas) {
        maxColumnas = ubicacion.columna;
      }
    });
    setFilas(maxFilas);
    setColumnas(maxColumnas);
  }

  const getUbicaciones = async () => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${getSesion().token}`,
        },
      };
      let ubicacionesResponse = await axios.get(`${getUrlAxio()}Ubicacion`, config);

      if (ubicacionesResponse.data.length > 0) {
        obtenerMaxFilasColumnas(ubicacionesResponse.data);
        setUbicaciones(ubicacionesResponse.data);
      }
    } catch (e) {
      MostrarNotificacion({ mostrar: true, mensaje: "Error", color: "rojo" });
    }
  };

  useEffect(() => {
    getUbicaciones();
  }, []);

  return (
    <Container display="flex">
      <Row xs={12}>
        <Column xs={12} md={6} lg={3}>
          <Row xs={12}>
            <Row xs={12} justifyContent={"space-around"}>
              <Column xs={12} sx={{ margin: "5px" }}>
                <Button onClick={(e) => handleContextClick(null)} color={"success"}>
                  <Typography fontSize={24}>TODAS</Typography>
                </Button>
              </Column>
            </Row>
            {Array.from({ length: filas }, (_, row) => (
              <Row key={row} xs={12} justifyContent={"space-around"}>
                {Array.from({ length: columnas }, (_, col) => {
                  const ubicacion = ubicaciones.find(
                    (ubicacion) => ubicacion.fila === row + 1 && ubicacion.columna === col + 1
                  );

                  return (
                    <Column key={col} xs={4}>
                      <Button
                        onClick={() => handleContextClick(ubicacion ? ubicacion : null)}
                        disabled={!ubicacion?.habilitado}
                        color={
                          !ubicacion?.habilitado
                            ? "neutral"
                            : ubicacion.disponible
                            ? "success"
                            : "warning"
                        }
                        variant="outlined"
                        sx={{ margin: "5px" }}
                      >
                        <Typography fontSize={24}>
                          {ubicacion ? `${ubicacion.nombre}` : ""}
                        </Typography>
                      </Button>
                    </Column>
                  );
                })}
              </Row>
            ))}
          </Row>
        </Column>
        <Column xs={12} md={6} lg={9}>
          <Row>
            <List>
              <ListItem>
                <Chip
                  variant="solid"
                  color={
                    !ubicacionSeleccionada?.habilitado
                      ? "neutral"
                      : ubicacionSeleccionada.disponible
                      ? "success"
                      : "warning"
                  }
                />
                {!ubicacionSeleccionada?.habilitado
                  ? "Ubicacion no habilitada"
                  : ubicacionSeleccionada.disponible
                  ? "Ubicacion disponible"
                  : "Ubicacion no disponible"}
              </ListItem>
              {ubicacionSeleccionada.disponible && (
                <ListItemButton>
                  <Add />
                  Nueva Mesa
                </ListItemButton>
              )}
              {!ubicacionSeleccionada.disponible && (
                <ListItemButton>
                  <PostAdd />
                  Nuevo pedido
                </ListItemButton>
              )}
            </List>
          </Row>
        </Column>
      </Row>
    </Container>
  );
};

export default TabMesas;
