import { useEffect, useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { Button, Stack, TabPanel, Typography } from "@mui/joy";
import { Column, Container, Row } from "../../../components/GridComponents";
import { NotificacionInterface } from "../../../hooks/notificaciones.hook";
import ModalDarBaja from "../../../components/FeedbackComponents/ModalDarBaja";
import ModalFormOtrosMaestros from "./ModalFormOtrosMaestros";
import {
  AuxiliarInterface,
  TipoEstadoPromocionInterface,
  TipoEstadoUsuarioInterface,
  TipoProductoInterface,
  TipoRolInterface,
} from "../../../interfaces/tipo.interface";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import useSesion from "../../../hooks/usuarioLogueado.hook";
import useUrlAxio from "../../../hooks/urlAxio.hook";
import { CheckCircle, Edit, Unpublished } from "@mui/icons-material";
import { BodyRow, HeadCell, CustomTable } from "../../../components/CustomTable";
import createExtendedInterfaceForTables from "../../../utils/Interfaces.util";

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

  const renderTableTiposProducto = (): JSX.Element => {
    type TipoProductoTableInterface = ReturnType<
      typeof createExtendedInterfaceForTables<TipoProductoInterface>
    >;
    let cabecera: HeadCell<TipoProductoTableInterface>[] = [
      { id: "nombre", label: "Nombre", numeric: false, ordenable: true },
      { id: "descripcion", label: "Descripcion", numeric: false, ordenable: true },
      { id: "habilitado", label: "Habilitado", numeric: false, ordenable: true },
      { id: "acciones", label: "Acciones", numeric: false, ordenable: false },
    ];
    const filas: BodyRow<TipoProductoTableInterface>[] = [];
    tiposProductos.forEach((tipo) => {
      const rowId = `row-${tipo.id}`;
      filas.push({
        id: rowId,
        row: [
          {
            id: "nombre",
            numeric: false,
            value: tipo.nombre,
            render: <Typography>{tipo.nombre}</Typography>,
          },
          {
            id: "descripcion",
            numeric: false,
            value: tipo.descripcion,

            render: <Typography>{tipo.descripcion}</Typography>,
          },
          {
            id: "habilitado",
            numeric: false,
            value: tipo.habilitado,

            render: <Typography>{tipo.habilitado ? "Habilitado" : "Inhabilitado"}</Typography>,
          },
          {
            id: "acciones",
            numeric: false,
            value: null,
            render: (
              // <td style={{ alignContent: "space-between" }}>
              <Stack direction="row" alignContent="space-between" alignItems="center">
                <Button
                  variant="plain"
                  onClick={() => handleClickEditarTipo(tipo)}
                  sx={{ p: "8px" }}
                >
                  <Edit />
                </Button>
                <Button
                  variant="plain"
                  onClick={() => handleClickDarBajaTipo(tipo)}
                  sx={{ p: "8px" }}
                >
                  {tipo.habilitado ? <CheckCircle /> : <Unpublished />}
                </Button>
              </Stack>
              // </td>
            ),
          },
        ],
        rowProps: { onDoubleClick: () => handleClickConsultarTipo(tipo) },
      });
    });

    return (
      <CustomTable<TipoProductoTableInterface>
        data={filas}
        headCells={cabecera}
        showCheckbox={false}
        //@ts-ignore
        visibleColumns={new Set(["nombre", "descripcion", "habilitado", "acciones"])}
        labelAgregar="Agregar tipo producto"
        handleClickRegistrar={handleClickRegistrarTipo}
        SheetProperties={{
          variant: "outlined",
          sx: { boxShadow: "sm", borderRadius: "sm", p: "5px", overflowX: "auto" },
        }}
        TableProperties={{
          // size: "lg",
          sx: {
            "& tbody p": "5px",
            "--TableCell-selectedBackground": (theme) => theme.vars.palette.success.softBg,
            "& thead th:nth-of-type(2)": { width: "50%" },
            "& tr > *:nth-of-type(n+3)": { alignContent: "center", alignItems: "center" },
          },
        }}
      />
    );
  };

  const renderTableRolesUsuario = (): JSX.Element => {
    type TipoRolTableInterface = ReturnType<
      typeof createExtendedInterfaceForTables<TipoRolInterface>
    >;
    let cabecera: HeadCell<TipoRolTableInterface>[] = [
      { id: "nombre", label: "Nombre", numeric: false, ordenable: true },
      { id: "descripcion", label: "Descripcion", numeric: false, ordenable: true },
      { id: "habilitado", label: "Habilitado", numeric: false, ordenable: true },
      { id: "acciones", label: "Acciones", numeric: false, ordenable: false },
    ];
    const filas: BodyRow<TipoRolTableInterface>[] = [];
    rolesUsuario.forEach((tipo) => {
      const rowId = `row-${tipo.id}`;
      filas.push({
        id: rowId,
        row: [
          {
            id: "nombre",
            numeric: false,
            value: tipo.nombre,
            render: <Typography>{tipo.nombre}</Typography>,
          },
          {
            id: "descripcion",
            numeric: false,
            value: tipo.descripcion,

            render: <Typography>{tipo.descripcion}</Typography>,
          },
          {
            id: "habilitado",
            numeric: false,
            value: tipo.habilitado,

            render: <Typography>{tipo.habilitado ? "Habilitado" : "Inhabilitado"}</Typography>,
          },
          {
            id: "acciones",
            numeric: false,
            value: null,
            render: (
              // <td style={{ alignContent: "space-between" }}>
              <Stack direction="row" alignContent="space-between" alignItems="center">
                <Button
                  variant="plain"
                  onClick={() => handleClickEditarTipo(tipo)}
                  sx={{ p: "8px" }}
                >
                  <Edit />
                </Button>
                <Button
                  variant="plain"
                  onClick={() => handleClickDarBajaTipo(tipo)}
                  sx={{ p: "8px" }}
                >
                  {tipo.habilitado ? <CheckCircle /> : <Unpublished />}
                </Button>
              </Stack>
              // </td>
            ),
          },
        ],
        rowProps: { onDoubleClick: () => handleClickConsultarTipo(tipo) },
      });
    });

    return (
      <CustomTable<TipoRolTableInterface>
        data={filas}
        headCells={cabecera}
        showCheckbox={false}
        //@ts-ignore
        visibleColumns={new Set(["nombre", "descripcion", "habilitado", "acciones"])}
        labelAgregar="Agregar rol de usuario"
        handleClickRegistrar={handleClickRegistrarTipo}
        SheetProperties={{
          variant: "outlined",
          sx: { boxShadow: "sm", borderRadius: "sm", p: "5px", overflowX: "auto" },
        }}
        TableProperties={{
          // size: "lg",
          sx: {
            "& tbody p": "5px",
            "--TableCell-selectedBackground": (theme) => theme.vars.palette.success.softBg,
            "& thead th:nth-of-type(2)": { width: "50%" },
            "& tr > *:nth-of-type(n+3)": { alignContent: "center", alignItems: "center" },
          },
        }}
      />
    );
  };

  const renderTableEstadoUsuario = (): JSX.Element => {
    type TipoEstadoUsuarioTableInterface = ReturnType<
      typeof createExtendedInterfaceForTables<TipoEstadoUsuarioInterface>
    >;
    let cabecera: HeadCell<TipoEstadoUsuarioTableInterface>[] = [
      { id: "nombre", label: "Nombre", numeric: false, ordenable: true },
      { id: "descripcion", label: "Descripcion", numeric: false, ordenable: true },
      { id: "habilitado", label: "Habilitado", numeric: false, ordenable: true },
      { id: "acciones", label: "Acciones", numeric: false, ordenable: false },
    ];
    const filas: BodyRow<TipoEstadoUsuarioTableInterface>[] = [];
    estadosUsuario.forEach((tipo) => {
      const rowId = `row-${tipo.id}`;
      filas.push({
        id: rowId,
        row: [
          {
            id: "nombre",
            numeric: false,
            value: tipo.nombre,
            render: <Typography>{tipo.nombre}</Typography>,
          },
          {
            id: "descripcion",
            numeric: false,
            value: tipo.descripcion,

            render: <Typography>{tipo.descripcion}</Typography>,
          },
          {
            id: "habilitado",
            numeric: false,
            value: tipo.habilitado,

            render: <Typography>{tipo.habilitado ? "Habilitado" : "Inhabilitado"}</Typography>,
          },
          {
            id: "acciones",
            numeric: false,
            value: null,
            render: (
              // <td style={{ alignContent: "space-between" }}>
              <Stack direction="row" alignContent="space-between" alignItems="center">
                <Button
                  variant="plain"
                  onClick={() => handleClickEditarTipo(tipo)}
                  sx={{ p: "8px" }}
                >
                  <Edit />
                </Button>
                <Button
                  variant="plain"
                  onClick={() => handleClickDarBajaTipo(tipo)}
                  sx={{ p: "8px" }}
                >
                  {tipo.habilitado ? <CheckCircle /> : <Unpublished />}
                </Button>
              </Stack>
              // </td>
            ),
          },
        ],
        rowProps: { onDoubleClick: () => handleClickConsultarTipo(tipo) },
      });
    });

    return (
      <CustomTable<TipoEstadoUsuarioTableInterface>
        data={filas}
        headCells={cabecera}
        showCheckbox={false}
        //@ts-ignore
        visibleColumns={new Set(["nombre", "descripcion", "habilitado", "acciones"])}
        labelAgregar="Agregar rol de usuario"
        handleClickRegistrar={handleClickRegistrarTipo}
        SheetProperties={{
          variant: "outlined",
          sx: { boxShadow: "sm", borderRadius: "sm", p: "5px", overflowX: "auto" },
        }}
        TableProperties={{
          // size: "lg",
          sx: {
            "& tbody p": "5px",
            "--TableCell-selectedBackground": (theme) => theme.vars.palette.success.softBg,
            "& thead th:nth-of-type(2)": { width: "50%" },
            "& tr > *:nth-of-type(n+3)": { alignContent: "center", alignItems: "center" },
          },
        }}
      />
    );
  };

  const renderTableEstadoPromocion = (): JSX.Element => {
    type TipoEstadoPromocionTableInterface = ReturnType<
      typeof createExtendedInterfaceForTables<TipoEstadoPromocionInterface>
    >;
    let cabecera: HeadCell<TipoEstadoPromocionTableInterface>[] = [
      { id: "nombre", label: "Nombre", numeric: false, ordenable: true },
      { id: "descripcion", label: "Descripcion", numeric: false, ordenable: true },
      { id: "habilitado", label: "Habilitado", numeric: false, ordenable: true },
      { id: "acciones", label: "Acciones", numeric: false, ordenable: false },
    ];
    const filas: BodyRow<TipoEstadoPromocionTableInterface>[] = [];
    estadosPromocion.forEach((tipo) => {
      const rowId = `row-${tipo.id}`;
      filas.push({
        id: rowId,
        row: [
          {
            id: "nombre",
            numeric: false,
            value: tipo.nombre,
            render: <Typography>{tipo.nombre}</Typography>,
          },
          {
            id: "descripcion",
            numeric: false,
            value: tipo.descripcion,

            render: <Typography>{tipo.descripcion}</Typography>,
          },
          {
            id: "habilitado",
            numeric: false,
            value: tipo.habilitado,

            render: <Typography>{tipo.habilitado ? "Habilitado" : "Inhabilitado"}</Typography>,
          },
          {
            id: "acciones",
            numeric: false,
            value: null,
            render: (
              // <td style={{ alignContent: "space-between" }}>
              <Stack direction="row" alignContent="space-between" alignItems="center">
                <Button
                  variant="plain"
                  onClick={() => handleClickEditarTipo(tipo)}
                  sx={{ p: "8px" }}
                >
                  <Edit />
                </Button>
                <Button
                  variant="plain"
                  onClick={() => handleClickDarBajaTipo(tipo)}
                  sx={{ p: "8px" }}
                >
                  {tipo.habilitado ? <CheckCircle /> : <Unpublished />}
                </Button>
              </Stack>
              // </td>
            ),
          },
        ],
        rowProps: { onDoubleClick: () => handleClickConsultarTipo(tipo) },
      });
    });

    return (
      <CustomTable<TipoEstadoPromocionTableInterface>
        data={filas}
        headCells={cabecera}
        showCheckbox={false}
        //@ts-ignore
        visibleColumns={new Set(["nombre", "descripcion", "habilitado", "acciones"])}
        labelAgregar="Agregar rol de usuario"
        handleClickRegistrar={handleClickRegistrarTipo}
        SheetProperties={{
          variant: "outlined",
          sx: { boxShadow: "sm", borderRadius: "sm", p: "5px", overflowX: "auto" },
        }}
        TableProperties={{
          // size: "lg",
          sx: {
            "& tbody p": "5px",
            "--TableCell-selectedBackground": (theme) => theme.vars.palette.success.softBg,
            "& thead th:nth-of-type(2)": { width: "50%" },
            "& tr > *:nth-of-type(n+3)": { alignContent: "center", alignItems: "center" },
          },
        }}
      />
    );
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
                {renderTableTiposProducto()}
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
                {renderTableRolesUsuario()}
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
                {renderTableEstadoUsuario()}
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
                {renderTableEstadoPromocion()}
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
