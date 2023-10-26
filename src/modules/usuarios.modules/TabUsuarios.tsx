import { useEffect, useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { Button, Sheet, Stack, Table } from "@mui/joy";
import { AccountCircle, Add, Edit, NoAccounts } from "@mui/icons-material";
import ModalFormUsuarios from "./ModalFormUsuarios";
import ModalDarBaja from "../../components/FeedbackComponents/ModalDarBaja";
import { Column, Container, Row } from "../../components/GridComponents";
import { NotificacionInterface } from "../../hooks/notificaciones.hook";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import useSesion from "../../hooks/usuarioLogueado.hook";
import useUrlAxio from "../../hooks/urlAxio.hook";
import { EmpleadoInterface } from "../../interfaces/empleado.interface";
import { TipoEstadoUsuarioInterface, TipoRolInterface } from "../../interfaces/tipo.interface";

interface ContainerProps {
  MostrarNotificacion: (Notificacion: NotificacionInterface) => void;
}
const TabUsuarios: React.FC<ContainerProps> = ({ MostrarNotificacion }) => {
  const [openModalUsuario, setOpenModalUsuario] = useState<boolean>(false);
  const [modoModalUsuario, setModoModalUsuario] = useState<
    "consulta" | "registrar" | "editar" | "cerrado"
  >("cerrado");
  const [openModalDarBajaUsuario, setOpenModalDarBajaUsuario] = useState<boolean>(false);

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<EmpleadoInterface>({
    id: 0,
    user: "",
    pass: "",
    nombre: "",
    apellido: "",
    nroDocumento: 0,
    rol: 0,
    telefono: "",
    email: "",
    estado: 0,
  });
  const [usuarios, setUsuarios] = useState<EmpleadoInterface[]>([]);
  const { getSesion } = useSesion();
  const { getUrlAxio } = useUrlAxio();

  const getUsuarios = async () => {
    try {
      const config: AxiosRequestConfig = {
        // params: { },
        headers: {
          Authorization: `Bearer ${getSesion().token}`,
        },
      };
      let response: AxiosResponse = await axios.get(`${getUrlAxio()}Empleado`, config);

      if (response.data.length !== 0) {
        let empleadosResponse: EmpleadoInterface[] = [];
        response.data.forEach((empleado: any) => {
          empleadosResponse.push({ ...empleado });
        });
        setUsuarios(empleadosResponse);
      } else {
        MostrarNotificacion({
          mostrar: true,
          mensaje: "No se encontraron usuarios",
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

  const enableDisableUsuarioSeleccionado = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${getSesion().token}`,
      },
    };
    try {
      const response = await axios.put(
        `${getUrlAxio()}Empleado`,
        {
          id: usuarioSeleccionado.id,
          estado: usuarioSeleccionado.estado === 2 ? 1 : 2,
        },
        config
      );
      MostrarNotificacion({
        mostrar: true,
        mensaje: `Estado de usuario modificado exitosamente`,
        color: "verde",
      });
      await getUsuarios();
    } catch (e: any) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: `Error: No se pudo modificar el estado del usuario`,
        color: "rojo",
      });
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  useEffect(() => {
    if (modoModalUsuario !== "cerrado" && !openModalDarBajaUsuario && !openModalUsuario) {
      getUsuarios();
      setModoModalUsuario("cerrado");
    }
  }, [modoModalUsuario, openModalDarBajaUsuario, openModalUsuario]);

  const handleClickRegistrarUsuario = () => {
    setOpenModalUsuario(true);
    setModoModalUsuario("registrar");
    setUsuarioSeleccionado({
      id: 0,
      user: "",
      pass: "",
      nombre: "",
      apellido: "",
      nroDocumento: 0,
      rol: 0,
      telefono: "",
      email: "",
      estado: 0,
    });
  };

  const handleClickConsultarUsuario = (usuario: EmpleadoInterface) => {
    setOpenModalUsuario(true);
    setModoModalUsuario("consulta");
    setUsuarioSeleccionado(usuario);
  };

  const handleClickEditarUsuario = (usuario: EmpleadoInterface) => {
    setOpenModalUsuario(true);
    setModoModalUsuario("editar");
    setUsuarioSeleccionado(usuario);
  };

  const handleClickDarBajaUsuario = (usuario: EmpleadoInterface) => {
    setOpenModalDarBajaUsuario(true);
    setUsuarioSeleccionado(usuario);
  };

  const renderUsuarios = (): JSX.Element[] => {
    return usuarios.map((usuario) => (
      <tr key={usuario.id}>
        <td>{usuario.user}</td>
        <td onDoubleClick={() => handleClickConsultarUsuario(usuario)}>{usuario.nombre}</td>
        <td onDoubleClick={() => handleClickConsultarUsuario(usuario)}>{usuario.apellido}</td>
        <td onDoubleClick={() => handleClickConsultarUsuario(usuario)}>{usuario.nroDocumento}</td>
        <td onDoubleClick={() => handleClickConsultarUsuario(usuario)}>{usuario.Rol?.nombre}</td>
        <td onDoubleClick={() => handleClickConsultarUsuario(usuario)}>
          {usuario.EstadoUsuario?.nombre}
        </td>
        <td onDoubleClick={() => handleClickConsultarUsuario(usuario)}>{usuario.telefono}</td>
        <td style={{ alignContent: "space-between" }}>
          <Stack direction="row" alignContent="space-around" alignItems="center">
            <Button
              variant="plain"
              onClick={() => handleClickEditarUsuario(usuario)}
              sx={{ p: "8px" }}
            >
              <Edit />
            </Button>
            <Button
              variant="plain"
              onClick={() => handleClickDarBajaUsuario(usuario)}
              sx={{ p: "8px" }}
            >
              {usuario.estado !== 2 ? <AccountCircle /> : <NoAccounts />}
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
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>NroDocumento</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Telefono</th>
              <th style={{ width: "var(--Table-lastColumnWidth)" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={8}>
                <Row xs={12}>
                  <Column xs={12}>
                    <Button onClick={handleClickRegistrarUsuario}>
                      <Add /> Registrar nuevo usuario
                    </Button>
                  </Column>
                </Row>
              </td>
            </tr>
            {renderUsuarios()}
          </tbody>
        </Table>
      </Row>
      <ModalFormUsuarios
        MostrarNotificacion={MostrarNotificacion}
        open={openModalUsuario}
        setOpen={setOpenModalUsuario}
        modo={modoModalUsuario}
        usuarioSeleccionado={usuarioSeleccionado}
      />
      <ModalDarBaja
        titulo={`${usuarioSeleccionado.estado !== 2 ? "Dar de baja" : "Dar de alta"} usuario`}
        texto={`Esta seguro que desea ${
          usuarioSeleccionado.estado !== 2 ? "dar de baja" : "dar de alta"
        } al usuario seleccionado?`}
        colorBotonNo="neutral"
        colorBotonSi={usuarioSeleccionado.estado !== 2 ? "danger" : "warning"}
        textoBotonNo="Cancelar"
        textoBotonSi={usuarioSeleccionado.estado !== 2 ? "Dar de baja" : "Dar de alta"}
        open={openModalDarBajaUsuario}
        setOpen={setOpenModalDarBajaUsuario}
        handleClickConfirmar={enableDisableUsuarioSeleccionado}
      />
    </Container>
  );
};

export default TabUsuarios;
