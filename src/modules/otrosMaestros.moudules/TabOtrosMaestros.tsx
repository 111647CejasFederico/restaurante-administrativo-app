import { useEffect, useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  Grid,
  Input,
  Stack,
  TabPanel,
  Table,
  Textarea,
  Typography,
} from "@mui/joy";
import { Column, Container, Row } from "../../components/GridComponents";
import { NotificacionInterface } from "../../hooks/notificaciones.hook";
import ModalDarBaja from "../../components/FeedbackComponents/ModalDarBaja";
import ModalFormOtrosMaestros from "./ModalFormOtrosMaestros";
import {
  AuxiliarInterface,
  TipoEstadoPromocionInterface,
  TipoEstadoUsuarioInterface,
  TipoProductoInterface,
  TipoRolInterface,
} from "../../interfaces/tipo.interface";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import useSesion from "../../hooks/usuarioLogueado.hook";
import useUrlAxio from "../../hooks/urlAxio.hook";
import { Add, CheckCircle, Edit, Unpublished } from "@mui/icons-material";

interface ContainerProps {
  MostrarNotificacion: (Notificacion: NotificacionInterface) => void;
}
const TabOtrosMaestros: React.FC<ContainerProps> = ({ MostrarNotificacion }) => {
  const [openModalTipo, setOpenModalTipo] = useState<boolean>(false);
  const [modoModalTipo, setModoModalTipo] = useState<
    "consulta" | "registrar" | "editar" | "cerrado"
  >("cerrado");
  const [openModalDarBajaTipo, setOpenModalDarBajaTipo] = useState<boolean>(false);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<AuxiliarInterface>({
    id: 0,
    nombre: "",
    descripcion: "",
    habilitado: false,
  });
  const [tiposProductos, setTiposProductos] = useState<TipoProductoInterface[]>([]);
  const [rolesUsuario, setRolesUsuario] = useState<TipoRolInterface[]>([]);
  const [estadosUsuario, setEstadosUsuario] = useState<TipoEstadoUsuarioInterface[]>([]);
  const [estadosPromocion, setEstadosPromocion] = useState<TipoEstadoPromocionInterface[]>([]);

  const [selectedTab, setSelectedTab] = useState<
    "TipoProducto" | "RolUsuario" | "EstadoUsuario" | "EstadoPromocion"
  >("TipoProducto");

  const { getSesion } = useSesion();
  const { getUrlAxio } = useUrlAxio();

  const getUrlAuxiliar = (): string => {
    switch (selectedTab) {
      case "TipoProducto":
        return "tipoProducto";
      case "RolUsuario":
        return "tipoRol";
      case "EstadoUsuario":
        return "tipoEstadoUsuario";
      case "EstadoPromocion":
        return "tipoEstadoPromocion";
    }
  };
  const getlabel = (): string => {
    switch (selectedTab) {
      case "TipoProducto":
        return "tipo de producto";
      case "RolUsuario":
        return "rol de usuario";
      case "EstadoUsuario":
        return "estado de usuario";
      case "EstadoPromocion":
        return "estado de promocion";
      default:
        return "";
    }
  };

  const getTipoProducto = async () => {
    try {
      const config: AxiosRequestConfig = {
        // params: { },
        headers: {
          Authorization: `Bearer ${getSesion().token}`,
        },
      };
      let response: AxiosResponse = await axios.get(`${getUrlAxio()}tipoProducto`, config);

      if (response.data.length !== 0) {
        let tiposProductosResponse: TipoProductoInterface[] = [];
        response.data.forEach((tipoProducto: any) => {
          tiposProductosResponse.push({ ...tipoProducto });
        });
        setTiposProductos(tiposProductosResponse);
      } else {
        MostrarNotificacion({
          mostrar: true,
          mensaje: "No se encontraron tipos de productos",
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

  const getRolesUsuario = async () => {
    try {
      const config: AxiosRequestConfig = {
        // params: { },
        headers: {
          Authorization: `Bearer ${getSesion().token}`,
        },
      };
      let response: AxiosResponse = await axios.get(`${getUrlAxio()}tipoRol`, config);

      if (response.data.length !== 0) {
        let rolesUsuarioResponse: TipoProductoInterface[] = [];
        response.data.forEach((rol: any) => {
          rolesUsuarioResponse.push({ ...rol });
        });
        setRolesUsuario(rolesUsuarioResponse);
      } else {
        MostrarNotificacion({
          mostrar: true,
          mensaje: "No se encontraron roles de usuario",
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

  const getEstadosUsuario = async () => {
    try {
      const config: AxiosRequestConfig = {
        // params: { },
        headers: {
          Authorization: `Bearer ${getSesion().token}`,
        },
      };
      let response: AxiosResponse = await axios.get(`${getUrlAxio()}tipoEstadoUsuario`, config);

      if (response.data.length !== 0) {
        let estadosUsuarioResponse: TipoEstadoUsuarioInterface[] = [];
        response.data.forEach((estado: any) => {
          estadosUsuarioResponse.push({ ...estado });
        });
        setEstadosUsuario(estadosUsuarioResponse);
      } else {
        MostrarNotificacion({
          mostrar: true,
          mensaje: "No se encontraron estados de usuario",
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

  const getEstadosPromociones = async () => {
    try {
      const config: AxiosRequestConfig = {
        // params: { },
        headers: {
          Authorization: `Bearer ${getSesion().token}`,
        },
      };
      let response: AxiosResponse = await axios.get(`${getUrlAxio()}tipoEstadoPromocion`, config);

      if (response.data.length !== 0) {
        let estadosPromocionResponse: TipoEstadoPromocionInterface[] = [];
        response.data.forEach((estado: any) => {
          estadosPromocionResponse.push({ ...estado });
        });
        setEstadosPromocion(estadosPromocionResponse);
      } else {
        MostrarNotificacion({
          mostrar: true,
          mensaje: "No se encontraron estados de promocion",
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

  const CargarMaestros = async () => {
    await getTipoProducto();
    await getRolesUsuario();
    await getEstadosUsuario();
    await getEstadosPromociones();
  };

  const enableDisableTipoSeleccionado = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${getSesion().token}`,
      },
    };
    try {
      const response = await axios.put(
        `${getUrlAxio()}${getUrlAuxiliar()}`,
        {
          id: tipoSeleccionado.id,
          habilitado: !tipoSeleccionado.habilitado,
        },
        config
      );
      MostrarNotificacion({
        mostrar: true,
        mensaje: `Estado de ${getlabel()} modificado exitosamente`,
        color: "verde",
      });
      await CargarMaestros();
    } catch (e: any) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: `Error: No se pudo modificar el estado del ${getlabel()}`,
        color: "rojo",
      });
    }
  };

  useEffect(() => {
    CargarMaestros();
  }, []);

  useEffect(() => {
    if (modoModalTipo !== "cerrado" && !openModalDarBajaTipo && !openModalTipo) {
      CargarMaestros();
      setModoModalTipo("cerrado");
    }
  }, [openModalDarBajaTipo, openModalTipo, modoModalTipo]);

  const handleClickRegistrarTipo = () => {
    setOpenModalTipo(true);
    setModoModalTipo("registrar");
    setTipoSeleccionado({
      id: 0,
      nombre: "",
      descripcion: "",
      habilitado: false,
    });
  };
  const handleClickConsultarTipo = (tipo: AuxiliarInterface) => {
    setOpenModalTipo(true);
    setModoModalTipo("consulta");
    setTipoSeleccionado(tipo);
  };

  const handleClickEditarTipo = (tipo: AuxiliarInterface) => {
    setOpenModalTipo(true);
    setModoModalTipo("editar");
    setTipoSeleccionado(tipo);
  };

  const handleClickDarBajaTipo = (tipo: AuxiliarInterface) => {
    setOpenModalDarBajaTipo(true);
    setTipoSeleccionado(tipo);
  };

  const renderTiposProducto = (): JSX.Element[] => {
    return tiposProductos.map((tipo) => (
      <tr key={tipo.id}>
        <td>{tipo.nombre}</td>
        <td onDoubleClick={() => handleClickConsultarTipo(tipo)}>{tipo.descripcion}</td>
        <td onDoubleClick={() => handleClickConsultarTipo(tipo)}>
          {tipo.habilitado ? "Habilitado" : "Inhabilitado"}
        </td>
        <td style={{ alignContent: "space-between" }}>
          <Stack direction="row" alignContent="space-around" alignItems="center">
            <Button variant="plain" onClick={() => handleClickEditarTipo(tipo)} sx={{ p: "8px" }}>
              <Edit />
            </Button>
            <Button variant="plain" onClick={() => handleClickDarBajaTipo(tipo)} sx={{ p: "8px" }}>
              {tipo.habilitado ? <CheckCircle /> : <Unpublished />}
            </Button>
          </Stack>
        </td>
      </tr>
    ));
  };

  const renderRolesUsuario = (): JSX.Element[] => {
    return rolesUsuario.map((rol) => (
      <tr key={rol.id}>
        <td>{rol.nombre}</td>
        <td onDoubleClick={() => handleClickConsultarTipo(rol)}>{rol.descripcion}</td>
        <td onDoubleClick={() => handleClickConsultarTipo(rol)}>
          {rol.habilitado ? "Habilitado" : "Inhabilitado"}
        </td>
        <td style={{ alignContent: "space-between" }}>
          <Stack direction="row" alignContent="space-around" alignItems="center">
            <Button variant="plain" onClick={() => handleClickEditarTipo(rol)} sx={{ p: "8px" }}>
              <Edit />
            </Button>
            <Button variant="plain" onClick={() => handleClickDarBajaTipo(rol)} sx={{ p: "8px" }}>
              {rol.habilitado ? <CheckCircle /> : <Unpublished />}
            </Button>
          </Stack>
        </td>
      </tr>
    ));
  };

  const renderEstadosUsuario = (): JSX.Element[] => {
    return estadosUsuario.map((estado) => (
      <tr key={estado.id}>
        <td>{estado.nombre}</td>
        <td onDoubleClick={() => handleClickConsultarTipo(estado)}>{estado.descripcion}</td>
        <td onDoubleClick={() => handleClickConsultarTipo(estado)}>
          {estado.habilitado ? "Habilitado" : "Inhabilitado"}
        </td>
        <td style={{ alignContent: "space-between" }}>
          <Stack direction="row" alignContent="space-around" alignItems="center">
            <Button variant="plain" onClick={() => handleClickEditarTipo(estado)} sx={{ p: "8px" }}>
              <Edit />
            </Button>
            <Button
              variant="plain"
              onClick={() => handleClickDarBajaTipo(estado)}
              sx={{ p: "8px" }}
            >
              {estado.habilitado ? <CheckCircle /> : <Unpublished />}
            </Button>
          </Stack>
        </td>
      </tr>
    ));
  };

  const renderEstadosPromocion = (): JSX.Element[] => {
    return estadosPromocion.map((estado) => (
      <tr key={estado.id}>
        <td>{estado.nombre}</td>
        <td onDoubleClick={() => handleClickConsultarTipo(estado)}>{estado.descripcion}</td>
        <td onDoubleClick={() => handleClickConsultarTipo(estado)}>
          {estado.habilitado ? "Habilitado" : "Inhabilitado"}
        </td>
        <td style={{ alignContent: "space-between" }}>
          <Stack direction="row" alignContent="space-around" alignItems="center">
            <Button variant="plain" onClick={() => handleClickEditarTipo(estado)} sx={{ p: "8px" }}>
              <Edit />
            </Button>
            <Button
              variant="plain"
              onClick={() => handleClickDarBajaTipo(estado)}
              sx={{ p: "8px" }}
            >
              {estado.habilitado ? <CheckCircle /> : <Unpublished />}
            </Button>
          </Stack>
        </td>
      </tr>
    ));
  };

  return (
    <Tabs
      aria-label="Otros maestros Tab"
      defaultValue={0}
      value={selectedTab}
      //@ts-ignore
      onChange={(e, value) => setSelectedTab(value)}
      sx={{ bgcolor: "transparent" }}
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
        <Tab value="TipoProducto">Tipos de producto</Tab>
        <Tab value="RolUsuario">Roles de usuario</Tab>
        <Tab value="EstadoUsuario">Estados de usuario</Tab>
        <Tab value="EstadoPromocion">Estados de promocion</Tab>
      </TabList>
      <TabPanel value="TipoProducto">
        <Container display="flex" justifyContent="space-between" alignItems="center">
          <Row xs={12}>
            <Column xs={12}>
              <Row justifyContent="space-evenly" alignItems="center" xs={12}>
                <Table aria-label="table" size="lg">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th style={{ width: "50%" }}>Descripcion</th>
                      <th>Habilitado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4} style={{ paddingInline: 0, paddingBlock: "5px" }}>
                        <Row xs={12} sx={{ margin: 0, padding: 0 }}>
                          <Column xs={12} sx={{ margin: 0, padding: 0 }}>
                            <Button
                              onClick={handleClickRegistrarTipo}
                              sx={{ margin: 0, padding: 0 }}
                            >
                              <Add /> Registrar nuevo {getlabel()}
                            </Button>
                          </Column>
                        </Row>
                      </td>
                    </tr>
                    {renderTiposProducto()}
                  </tbody>
                </Table>
              </Row>
            </Column>
          </Row>
        </Container>
      </TabPanel>
      <TabPanel value="RolUsuario">
        <Container display="flex" justifyContent="space-between" alignItems="center">
          <Row xs={12}>
            <Column xs={12}>
              <Row justifyContent="space-evenly" alignItems="center" xs={12}>
                <Table aria-label="table" size="lg">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th style={{ width: "50%" }}>Descripcion</th>
                      <th>Habilitado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4} style={{ paddingInline: 0, paddingBlock: "5px" }}>
                        <Row xs={12} sx={{ margin: 0, padding: 0 }}>
                          <Column xs={12} sx={{ margin: 0, padding: 0 }}>
                            <Button
                              onClick={handleClickRegistrarTipo}
                              sx={{ margin: 0, padding: 0 }}
                            >
                              <Add /> Registrar nuevo {getlabel()}
                            </Button>
                          </Column>
                        </Row>
                      </td>
                    </tr>
                    {renderRolesUsuario()}
                  </tbody>
                </Table>
              </Row>
            </Column>
          </Row>
        </Container>
      </TabPanel>
      <TabPanel value="EstadoUsuario">
        <Container display="flex" justifyContent="space-between" alignItems="center">
          <Row xs={12}>
            <Column xs={12}>
              <Row justifyContent="space-evenly" alignItems="center" xs={12}>
                <Table aria-label="table" size="lg">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th style={{ width: "50%" }}>Descripcion</th>
                      <th>Habilitado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4} style={{ paddingInline: 0, paddingBlock: "5px" }}>
                        <Row xs={12} sx={{ margin: 0, padding: 0 }}>
                          <Column xs={12} sx={{ margin: 0, padding: 0 }}>
                            <Button
                              onClick={handleClickRegistrarTipo}
                              sx={{ margin: 0, padding: 0 }}
                            >
                              <Add /> Registrar nuevo {getlabel()}
                            </Button>
                          </Column>
                        </Row>
                      </td>
                    </tr>
                    {renderEstadosUsuario()}
                  </tbody>
                </Table>
              </Row>
            </Column>
          </Row>
        </Container>
      </TabPanel>
      <TabPanel value="EstadoPromocion">
        <Container display="flex" justifyContent="space-between" alignItems="center">
          <Row xs={12}>
            <Column xs={12}>
              <Row justifyContent="space-evenly" alignItems="center" xs={12}>
                <Table aria-label="table" size="lg">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th style={{ width: "50%" }}>Descripcion</th>
                      <th>Habilitado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4} style={{ paddingInline: 0, paddingBlock: "5px" }}>
                        <Row xs={12} sx={{ margin: 0, padding: 0 }}>
                          <Column xs={12} sx={{ margin: 0, padding: 0 }}>
                            <Button
                              onClick={handleClickRegistrarTipo}
                              sx={{ margin: 0, padding: 0 }}
                            >
                              <Add /> Registrar nuevo {getlabel()}
                            </Button>
                          </Column>
                        </Row>
                      </td>
                    </tr>
                    {renderEstadosPromocion()}
                  </tbody>
                </Table>
              </Row>
            </Column>
          </Row>
        </Container>
      </TabPanel>

      <ModalFormOtrosMaestros
        open={openModalTipo}
        setOpen={setOpenModalTipo}
        tipoSeleccionado={tipoSeleccionado}
        modo={modoModalTipo}
        MostrarNotificacion={MostrarNotificacion}
        tipoAuxiliar={selectedTab}
      />
      <ModalDarBaja
        titulo={`${tipoSeleccionado.habilitado ? "Dar de baja" : "Dar de alta"} producto`}
        texto={`Esta seguro que desea ${
          tipoSeleccionado.habilitado ? "dar de baja" : "dar de alta"
        } el producto seleccionado?`}
        colorBotonNo="neutral"
        colorBotonSi="warning"
        textoBotonNo="Cancelar"
        textoBotonSi={tipoSeleccionado.habilitado ? "Dar de baja" : "Dar de alta"}
        open={openModalDarBajaTipo}
        setOpen={setOpenModalDarBajaTipo}
        handleClickConfirmar={enableDisableTipoSeleccionado}
      />
    </Tabs>
  );
};

export default TabOtrosMaestros;
