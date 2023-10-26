import { useEffect, useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { Button, Stack, Table } from "@mui/joy";
import { Add, Edit, Fastfood, NoFood, NoMeals } from "@mui/icons-material";
import { Column, Container, Row } from "../../components/GridComponents";
import ModalFormPromociones from "./ModalFormPromociones";
import ModalDarBaja from "../../components/FeedbackComponents/ModalDarBaja";
import { NotificacionInterface } from "../../hooks/notificaciones.hook";
import { PromocionInterface } from "../../interfaces/promocion.interface";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import useSesion from "../../hooks/usuarioLogueado.hook";
import useUrlAxio from "../../hooks/urlAxio.hook";
import dayjs from "dayjs";

interface ContainerProps {
  MostrarNotificacion: (Notificacion: NotificacionInterface) => void;
}
const TabPromociones: React.FC<ContainerProps> = ({ MostrarNotificacion }) => {
  const [openModalPromocion, setOpenModalPromocion] = useState<boolean>(false);
  const [modoModalPromocion, setModoModalPromocion] = useState<
    "consulta" | "registrar" | "editar" | "cerrado"
  >("cerrado");
  const [openModalDarBajaPromocion, setOpenModalDarBajaPromocion] = useState<boolean>(false);

  const [promocionSeleccionada, setPromocionSeleccionada] = useState<PromocionInterface>({
    id: 0,
    nombre: "",
    descripcion: "",
    precio: 0,
    fechaInicio: "",
    fechaFin: "",
    horaInicio: "",
    horaFin: "",
    validoLunes: false,
    validoMartes: false,
    validoMiercoles: false,
    validoJueves: false,
    validoViernes: false,
    validoSabado: false,
    validoDomingo: false,
    estado: 0,
  });
  const [promociones, setPromociones] = useState<PromocionInterface[]>([]);
  const { getSesion } = useSesion();
  const { getUrlAxio } = useUrlAxio();

  const getPromociones = async () => {
    try {
      const config: AxiosRequestConfig = {
        // params: { },
        headers: {
          Authorization: `Bearer ${getSesion().token}`,
        },
      };
      let response: AxiosResponse = await axios.get(`${getUrlAxio()}Promocion`, config);

      if (response.data.length !== 0) {
        let promocionesResponse: PromocionInterface[] = [];
        response.data.forEach((promocion: any) => {
          promocionesResponse.push({ ...promocion });
        });
        setPromociones(promocionesResponse);
      } else {
        MostrarNotificacion({
          mostrar: true,
          mensaje: "No se encontraron promociones",
          color: "amarillo",
        });
      }
    } catch (e) {
      //@ts-ignore
      MostrarNotificacion({
        mostrar: true,
        //@ts-ignore
        mensaje: "Error: " + e.response.message,
        color: "rojo",
      });
    }
  };

  const enableDisablePromocionSeleccionada = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${getSesion().token}`,
      },
    };
    try {
      const response = await axios.put(
        `${getUrlAxio()}Promocion`,
        {
          id: promocionSeleccionada.id,
          estado: promocionSeleccionada.estado === 2 ? 1 : 2,
        },
        config
      );
      MostrarNotificacion({
        mostrar: true,
        mensaje: `Estado de promocion modificado exitosamente`,
        color: "verde",
      });
      await getPromociones();
    } catch (e: any) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: `Error: No se pudo modificar el estado del promocion`,
        color: "rojo",
      });
    }
  };

  useEffect(() => {
    getPromociones();
  }, []);

  useEffect(() => {
    if (modoModalPromocion !== "cerrado" && !openModalDarBajaPromocion && !openModalPromocion) {
      getPromociones();
      setModoModalPromocion("cerrado");
    }
  }, [modoModalPromocion, openModalDarBajaPromocion, openModalPromocion]);

  const handleClickRegistrarPromocion = () => {
    setOpenModalPromocion(true);
    setModoModalPromocion("registrar");
    setPromocionSeleccionada({
      id: 0,
      nombre: "",
      descripcion: "",
      precio: 0,
      fechaInicio: "",
      fechaFin: "",
      horaInicio: "",
      horaFin: "",
      validoLunes: false,
      validoMartes: false,
      validoMiercoles: false,
      validoJueves: false,
      validoViernes: false,
      validoSabado: false,
      validoDomingo: false,
      estado: 0,
    });
  };

  const handleClickConsultarUsuario = (promocion: PromocionInterface) => {
    setOpenModalPromocion(true);
    setModoModalPromocion("consulta");
    setPromocionSeleccionada(promocion);
  };

  const handleClickEditarPromocion = (promocion: PromocionInterface) => {
    setOpenModalPromocion(true);
    setModoModalPromocion("editar");
    setPromocionSeleccionada(promocion);
  };

  const handleClickDarBajaPromocion = (promocion: PromocionInterface) => {
    setOpenModalDarBajaPromocion(true);
    setPromocionSeleccionada(promocion);
  };

  const formatearHora = (hourString: string) => {
    const [hour, minute] = hourString.split(":");
    const hourNum = parseInt(hour, 10);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const formattedHour = hourNum > 12 ? hourNum - 12 : hourNum;
    const formattedMinute = minute;

    return `${formattedHour}:${formattedMinute} ${ampm}`;
  };

  const renderPromociones = (): JSX.Element[] => {
    return promociones.map((promocion) => (
      <tr>
        <td>{promocion.nombre}</td>
        <td onDoubleClick={() => handleClickConsultarUsuario(promocion)}>
          {`${dayjs(promocion.fechaInicio).format("MM/DD/YYYY")} - ${dayjs(
            promocion.fechaFin
          ).format("MM/DD/YYYY")}`}
        </td>
        <td onDoubleClick={() => handleClickConsultarUsuario(promocion)}>
          {`${formatearHora(promocion.horaInicio)} - ${formatearHora(promocion.horaFin)}`}
        </td>
        <td onDoubleClick={() => handleClickConsultarUsuario(promocion)}>
          {promocion.Estado?.nombre}
        </td>
        <td style={{ alignContent: "space-between" }}>
          <Stack direction="row" alignContent="space-around" alignItems="center">
            <Button
              variant="plain"
              onClick={() => handleClickEditarPromocion(promocion)}
              sx={{ p: "8px" }}
            >
              <Edit />
            </Button>
            <Button
              variant="plain"
              onClick={() => handleClickDarBajaPromocion(promocion)}
              sx={{ p: "8px" }}
            >
              {promocion.estado !== 2 ? <Fastfood /> : <NoFood />}
            </Button>
          </Stack>
        </td>
      </tr>
    ));
  };
  return (
    <Container direction="column" justifyContent="space-evenly" alignItems="center">
      <Row
        // variant="outlined"
        sx={{
          "--TableCell-height": "20px",
          // the number is the amount of the header rows.
          "--TableHeader-height": "calc(1 * var(--TableCell-height))",
          "--Table-firstColumnWidth": "80px",
          "--Table-lastColumnWidth": "90px",
          // background needs to have transparency to show the scrolling shadows
          "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
          overflow: "auto",
          background: (
            theme
          ) => `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 100% 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
          backgroundSize:
            "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "local, local, scroll, scroll",
          backgroundPosition:
            "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
          backgroundColor: "background.surface",
        }}
      >
        <Table
          aria-label="table"
          size="lg"
          hoverRow
          sx={{
            "& tr > *:first-of-type": {
              position: "sticky",
              left: 0,
              boxShadow: "1px 0 var(--TableCell-borderColor)",
              bgcolor: "background.surface",
            },
            "& tr > *:last-child": {
              position: "sticky",
              right: 0,
              bgcolor: "var(--TableCell-headBackground)",
            },
          }}
        >
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Perido validez</th>
              <th>Horario validez</th>
              <th>Estado</th>
              <th style={{ width: "var(--Table-lastColumnWidth)" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5}>
                <Row xs={12}>
                  <Column xs={12}>
                    <Button onClick={handleClickRegistrarPromocion}>
                      <Add /> Registrar nueva promocion
                    </Button>
                  </Column>
                </Row>
              </td>
            </tr>
            {renderPromociones()}
          </tbody>
        </Table>
      </Row>
      <ModalFormPromociones
        open={openModalPromocion}
        setOpen={setOpenModalPromocion}
        modo={modoModalPromocion}
        promocionSeleccionada={promocionSeleccionada}
        MostrarNotificacion={MostrarNotificacion}
      />
      <ModalDarBaja
        titulo={`${promocionSeleccionada.estado === 1 ? "Dar de baja" : "Dar de alta"} promocion`}
        texto={`Esta seguro que desea ${
          promocionSeleccionada.estado === 1 ? "dar de baja" : "dar de alta"
        } la promocion seleccionada?`}
        colorBotonNo="neutral"
        colorBotonSi="warning"
        textoBotonNo="Cancelar"
        textoBotonSi={promocionSeleccionada.estado === 1 ? "Dar de baja" : "Dar de alta"}
        open={openModalDarBajaPromocion}
        setOpen={setOpenModalDarBajaPromocion}
        handleClickConfirmar={enableDisablePromocionSeleccionada}
      />
    </Container>
  );
};

export default TabPromociones;
