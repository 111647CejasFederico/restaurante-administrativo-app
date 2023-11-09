import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  Button,
  Checkbox,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  ListItem,
  ListItemContent,
  Modal,
  ModalDialog,
  Option,
  Select,
  Stack,
  Switch,
  Textarea,
  Typography,
} from "@mui/joy";
import { Column, Container, Row } from "../../components/GridComponents";
import {
  Edit,
  Fastfood,
  InfoOutlined,
  NoFood,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { NotificacionInterface } from "../../hooks/notificaciones.hook";
import dayjs from "dayjs";
import { CartaErrorInterface, CartaInterface } from "../../interfaces/carta.interface";
import useUrlAxio from "../../hooks/urlAxio.hook";
import useSesion from "../../hooks/usuarioLogueado.hook";
import { DetalleCartaInterface } from "../../interfaces/detalleCarta.interface";
import createExtendedInterfaceForTables from "../../utils/Interfaces.util";
import { BodyRow, CustomTable, HeadCell } from "../../components/CustomTable";

interface ContainerProps {
  cartaSeleccionada?: CartaInterface;
  MostrarNotificacion: (Notificacion: NotificacionInterface) => void;
}

const FormCarta: React.FC<ContainerProps> = ({ cartaSeleccionada, MostrarNotificacion }) => {
  const [carta, setCarta] = useState<CartaInterface>({
    id: 0,
    nombre: "",
    descripcion: "",
    fechaInicioValidez: "",
    fechaFinValidez: "",
    habilitado: false,
  });
  const [cartaError, setCartaError] = useState<CartaErrorInterface>({
    nombre: false,
    descripcion: false,
    fechaInicioValidez: false,
    fechaFinValidez: false,
    habilitado: false,
  });
  const [detallesCarta, setDetallesCarta] = useState<DetalleCartaInterface[]>([]);
  const [detalleCartaSeleccionado, setDetalleCartaSeleccionado] = useState<DetalleCartaInterface>({
    carta: carta.id || 0,
    producto: 0,
    promocion: 0,
    cantidadDisponible: 0,
    disponible: true,
    visible: true,
  });

  const [modo, setModo] = useState<"consulta" | "registrar" | "editar" | "cerrado">("consulta");
  const [modoDetalleCarta, setModoDetalleCarta] = useState<
    "consulta" | "registrar" | "editar" | "cerrado"
  >("consulta");
  const [abrirModalFormDetalle, setAbrirModalFormDetalle] = useState<boolean>(false);

  const { getUrlAxio } = useUrlAxio();
  const { getSesion } = useSesion();

  // const getEstadosPromocion = async () => {
  //   try {
  //     const config: AxiosRequestConfig = {
  //       // params: { },
  //       headers: {
  //         Authorization: `Bearer ${getSesion().token}`,
  //       },
  //     };
  //     let response: AxiosResponse = await axios.get(`${getUrlAxio()}tipoEstadoPromocion`, config);

  //     if (response.data.length !== 0) {
  //       let estadosPromocionResponse: TipoEstadoPromocionInterface[] = [];
  //       response.data.forEach((estado: any) => {
  //         estadosPromocionResponse.push({ ...estado });
  //       });
  //       setEstadosPromocioPromocion(estadosPromocionResponse);
  //     } else {
  //       MostrarNotificacion({
  //         mostrar: true,
  //         mensaje: "No se encontraron estados de usuario",
  //         color: "amarillo",
  //       });
  //     }
  //   } catch (e) {
  //     //@ts-ignore
  //     MostrarNotificacion({
  //       mostrar: true,
  //       //@ts-ignore
  //       mensaje: "Error: " + e.response.message,
  //       color: "rojo",
  //     });
  //   }
  // };

  const CargarFormulario = async () => {
    // await getEstadosPromocion();
    if (cartaSeleccionada) {
      setCarta({ ...cartaSeleccionada });
      setModo("consulta");
    }
    if (!open)
      setCarta({
        id: 0,
        nombre: "",
        descripcion: "",
        fechaInicioValidez: "",
        fechaFinValidez: "",
        habilitado: false,
      });
    setModo("registrar");
  };

  useEffect(() => {
    CargarFormulario();
  }, [cartaSeleccionada]);

  // const ValidarFormulario = (): boolean => {
  //   let errores: cartaErrorInterface = {
  //     nombre: false,
  //     descripcion: false,
  //     precio: false,
  //     fechaInicio: false,
  //     fechaFin: false,
  //     horaInicio: false,
  //     horaFin: false,
  //     validoLunes: false,
  //     validoMartes: false,
  //     validoMiercoles: false,
  //     validoJueves: false,
  //     validoViernes: false,
  //     validoSabado: false,
  //     validoDomingo: false,
  //     estado: false,
  //   };

  //   let pasa = true;
  //   if (carta.nombre === "") {
  //     pasa = false;
  //     errores.nombre = true;
  //   }
  //   if (carta.descripcion === "") {
  //     pasa = false;
  //     errores.descripcion = true;
  //   }
  //   if (carta.precio < 0) {
  //     pasa = false;
  //     errores.precio = true;
  //   }
  //   if (carta.estado === 0 || !estadosPromocion.some((estado) => estado.id === carta.estado)) {
  //     pasa = false;
  //     errores.estado = true;
  //   }
  //   if (
  //     dayjs(carta.fechaInicio).isSame(dayjs(carta.fechaFin)) &&
  //     dayjs(carta.fechaInicio).isBefore(dayjs(carta.fechaFin))
  //   ) {
  //     pasa = false;
  //     errores.fechaInicio = true;
  //   }
  //   if (
  //     dayjs(carta.fechaInicio).isSame(dayjs(carta.fechaFin)) &&
  //     dayjs(carta.fechaInicio).isBefore(dayjs(carta.fechaFin))
  //   ) {
  //     pasa = false;
  //     errores.fechaFin = true;
  //   }
  //   if (carta.horaInicio === "") {
  //     pasa = false;
  //     errores.horaInicio = true;
  //   }
  //   if (carta.horaFin === "") {
  //     pasa = false;
  //     errores.horaFin = true;
  //   }

  //   setcartaError(errores);
  //   return pasa;
  // };

  // const postPromocion = async () => {
  //   let config = {
  //     headers: { Authorization: `Bearer ${getSesion().token}` },
  //   };
  //   try {
  //     await axios.post(
  //       `${getUrlAxio()}Promocion`,
  //       {
  //         nombre: carta.nombre,
  //         descripcion: carta.descripcion,
  //         precio: typeof Number(carta.precio) === "number" ? carta.precio : null,
  //         fechaInicio: carta.fechaInicio,
  //         fechaFin: carta.fechaFin,
  //         horaInicio: carta.horaInicio,
  //         horaFin: carta.horaFin,
  //         validoLunes: carta.validoLunes,
  //         validoMartes: carta.validoMartes,
  //         validoMiercoles: carta.validoMiercoles,
  //         validoJueves: carta.validoJueves,
  //         validoViernes: carta.validoViernes,
  //         validoSabado: carta.validoSabado,
  //         validoDomingo: carta.validoDomingo,
  //         estado: carta.estado,
  //       },
  //       config
  //     );
  //     MostrarNotificacion({ mostrar: true, mensaje: "Nueva carta registrada", color: "verde" });
  //     setOpen(false);
  //   } catch (e: any) {
  //     MostrarNotificacion({
  //       mostrar: true,
  //       mensaje: "Error: No se pudo registrar la carta",
  //       color: "rojo",
  //     });
  //   }
  // };

  // const putPromocion = async () => {
  //   let config = {
  //     headers: { Authorization: `Bearer ${getSesion().token}` },
  //   };
  //   try {
  //     await axios.put(
  //       `${getUrlAxio()}Promocion`,
  //       {
  //         id: carta.id,
  //         nombre: carta.nombre,
  //         descripcion: carta.descripcion,
  //         precio: carta.precio,
  //         fechaInicio: carta.fechaInicio,
  //         fechaFin: carta.fechaFin,
  //         horaInicio: carta.horaInicio,
  //         horaFin: carta.horaFin,
  //         validoLunes: carta.validoLunes,
  //         validoMartes: carta.validoMartes,
  //         validoMiercoles: carta.validoMiercoles,
  //         validoJueves: carta.validoJueves,
  //         validoViernes: carta.validoViernes,
  //         validoSabado: carta.validoSabado,
  //         validoDomingo: carta.validoDomingo,
  //         estado: carta.estado,
  //       },
  //       config
  //     );
  //     MostrarNotificacion({
  //       mostrar: true,
  //       mensaje: "Promocion modificada exitosamente",
  //       color: "verde",
  //     });
  //     setOpen(false);
  //   } catch (e: any) {
  //     MostrarNotificacion({
  //       mostrar: true,
  //       mensaje: "Error: No se modifico la",
  //       color: "rojo",
  //     });
  //   }
  // };

  // const handleChangeInput = (prop: keyof CartaInterface, value: any) => {
  //   setCarta((prevCarta) => ({
  //     ...prevCarta,
  //     [prop]: value,
  //   }));
  // };

  // const handleClickSubmit = async () => {
  //   if (ValidarFormulario()) {
  //     if (modo === "editar") {
  //       await putPromocion();
  //     }
  //     if (modo === "registrar") {
  //       await postPromocion();
  //     }
  //   } else {
  //     MostrarNotificacion({
  //       mostrar: true,
  //       mensaje: "Hay datos no validos en el formulario",
  //       color: "rojo",
  //     });
  //   }
  // };

  const handleClickRegistrarDetalleCarta = () => {
    setModoDetalleCarta("registrar");
    setAbrirModalFormDetalle(true);
  };

  const handleClickEditarDetalleCarta = (detalleCarta: DetalleCartaInterface) => {
    setModoDetalleCarta("editar");
    setAbrirModalFormDetalle(true);
    setDetalleCartaSeleccionado(detalleCarta);
  };

  const handleClickConsultarDetalleCarta = (detalleCarta: DetalleCartaInterface) => {
    setModoDetalleCarta("consulta");
    setAbrirModalFormDetalle(true);
    setDetalleCartaSeleccionado(detalleCarta);
  };

  const handleClickCloseDetalleCarta = () => {
    setModoDetalleCarta("cerrado");
    setAbrirModalFormDetalle(false);
  };

  const enableDisableDetalleCartaSeleccionado = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${getSesion().token}`,
      },
    };
    try {
      const response = await axios.put(
        `${getUrlAxio()}Promocion`,
        {
          id: detalleCartaSeleccionado.id,
          disponible: !detalleCartaSeleccionado.disponible,
        },
        config
      );
      MostrarNotificacion({
        mostrar: true,
        mensaje: `Estado de promocion modificado exitosamente`,
        color: "verde",
      });
      // await getPromociones();
    } catch (e: any) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: `Error: No se pudo modificar el estado del promocion`,
        color: "rojo",
      });
    }
  };

  const renderTableProductos = (): JSX.Element => {
    type DetalleCartaTableInterface = ReturnType<
      typeof createExtendedInterfaceForTables<DetalleCartaInterface>
    >;
    let cabecera: HeadCell<DetalleCartaTableInterface>[] = [
      { id: "nombre", label: "Nombre", numeric: false, ordenable: true },
      { id: "tipo", label: "Tipo Producto", numeric: false, ordenable: true },
      { id: "cantidadDisponible", label: "Cant Disp", numeric: false, ordenable: true },
      { id: "disponible", label: "Disponible", numeric: false, ordenable: true },
      { id: "visible", label: "Visible", numeric: false, ordenable: true },
      { id: "acciones", label: "Acciones", numeric: false, ordenable: false },
    ];
    const filas: BodyRow<DetalleCartaTableInterface>[] = [];
    // detallesCarta.forEach((detalleCarta) => {
    //   const rowId = `row-${detalleCarta.id}`;
    //   filas.push({
    //     id: rowId,
    //     row: [
    //       {
    //         id: "nombre",
    //         numeric: false,
    //         //@ts-ignore
    //         value:
    //           detalleCarta.producto !== 0
    //             ? detalleCarta.Producto?.nombre
    //             : detalleCarta.Promocion?.nombre,
    //         render: (
    //           <Typography>
    //             {detalleCarta.producto !== 0
    //               ? detalleCarta.Producto?.nombre
    //               : detalleCarta.Promocion?.nombre}
    //           </Typography>
    //         ),
    //       },
    //       {
    //         id: "tipo",
    //         numeric: false,
    //         //@ts-ignore
    //         value:
    //           detalleCarta.producto !== 0
    //             ? detalleCarta.Producto?.TipoProducto?.nombre
    //             : "Promocion",
    //         render: (
    //           <Typography>
    //             {detalleCarta.producto !== 0
    //               ? detalleCarta.Producto?.TipoProducto?.nombre
    //               : "Promocion"}
    //           </Typography>
    //         ),
    //       },
    //       {
    //         id: "cantidadDisponible",
    //         numeric: true,
    //         value: detalleCarta.cantidadDisponible,
    //         render: <Typography>{detalleCarta.cantidadDisponible}</Typography>,
    //       },
    //       {
    //         id: "disponible",
    //         numeric: false,
    //         value: detalleCarta.disponible ? "Habilitado" : "Inhabilitado",
    //         render: (
    //           <Typography> {detalleCarta.disponible ? "Habilitado" : "Inhabilitado"}</Typography>
    //         ),
    //       },
    //       {
    //         id: "visible",
    //         numeric: false,
    //         value: detalleCarta.visible ? "Habilitado" : "Inhabilitado",
    //         render: (
    //           <Typography> {detalleCarta.visible ? "Habilitado" : "Inhabilitado"}</Typography>
    //         ),
    //       },
    //       {
    //         id: "acciones",
    //         numeric: false,
    //         value: null,
    //         render: (
    //           <Stack direction="row" alignContent="space-around" alignItems="center">
    //             <Button
    //               variant="plain"
    //               onClick={() => handleClickEditarDetalleCarta(detalleCarta)}
    //               sx={{ p: "8px" }}
    //             >
    //               <Edit />
    //             </Button>
    //             <Button
    //               variant="plain"
    //               onClick={() => handleClickChangeVisibilityDetalleCarta(detalleCarta)}
    //               sx={{ p: "8px" }}
    //             >
    //               {detalleCarta.visible ? <Visibility /> : <VisibilityOff />}
    //             </Button>
    //             <Button
    //               variant="plain"
    //               onClick={() => handleChangeDisponibilityDetalleCarta(detalleCarta)}
    //               sx={{ p: "8px" }}
    //             >
    //               {detalleCarta.disponible ? <Fastfood /> : <NoFood />}
    //             </Button>
    //           </Stack>
    //         ),
    //       },
    //     ],
    //     rowProps: { onDoubleClick: () => handleClickConsultarDetalleCarta(detalleCarta) },
    //   });
    // });

    return (
      <CustomTable<DetalleCartaTableInterface>
        data={filas}
        headCells={cabecera}
        showCheckbox={false}
        visibleColumns={
          new Set(["nombre", "tipo", "cantidadDisponible", "disponible", "visible", "acciones"])
        }
        labelAgregar="Agregar item"
        handleClickRegistrar={handleClickRegistrarDetalleCarta}
        SheetProperties={{
          variant: "outlined",
          sx: {
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
          },
        }}
        TableProperties={{
          // size: "lg",
          hoverRow: true,
          sx: {
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
          },
        }}
      />
    );
  };

  return (
    <Container display="flex" justifyContent="space-between" alignItems="center">
      {/* <Row xs={12}>
        <Column xs={12} md={6}>
          <Row xs={12}>
            <Column xs={12} sx={{ p: "5px" }}>
              <FormControl disabled={modo === "consulta"} required error={cartaError.nombre}>
                <FormLabel>Nombre</FormLabel>
                <Input
                  size="sm"
                  placeholder="Nombre"
                  value={carta.nombre}
                  onChange={(e) => handleChangeInput("nombre", e.target.value)}
                />
                {cartaError.nombre && (
                  <FormHelperText>
                    <InfoOutlined />
                    Dato invalido
                  </FormHelperText>
                )}
              </FormControl>
            </Column>
          </Row>
          <Row xs={12}>
            <Column xs={12} sx={{ p: "5px" }}>
              <FormControl disabled={modo === "consulta"}>
                <FormLabel>Descripcion</FormLabel>
                <Textarea
                  size="sm"
                  minRows={2.5}
                  placeholder="Descripcion"
                  value={carta.descripcion}
                  onChange={(e) => handleChangeInput("descripcion", e.target.value)}
                />
              </FormControl>
            </Column>
          </Row>
          <Row xs={12}>
            <Column xs={12} sx={{ p: "5px" }}>
              <FormControl disabled={modo === "consulta"}>
                <Checkbox
                  label="Habilitado"
                  size="lg"
                  sx={{ border: "0px" }}
                  checked={carta.habilitado}
                  onChange={(e) => handleChangeInput("habilitado", e.target.checked)}
                />
              </FormControl>
            </Column>
          </Row>
        </Column>
        <Column xs={12} md={6} sx={{ p: "5px" }}>
          <FormLabel>Periodo validez</FormLabel>
          <Row xs={12}>
            <Column xs={12} md={6} sx={{ p: "5px" }}>
              <FormControl disabled={modo === "consulta"} error={cartaError.fechaInicioValidez}>
                <FormLabel>Fecha inicio (MM/DD/YYYY)</FormLabel>
                <Input
                  size="sm"
                  placeholder="Fecha desde"
                  type="date"
                  value={carta.fechaInicioValidez}
                  onChange={(e) => handleChangeInput("fechaInicioValidez", e.target.value)}
                />
                {cartaError.fechaInicioValidez && (
                  <FormHelperText>
                    <InfoOutlined />
                    Fecha invalida
                  </FormHelperText>
                )}
              </FormControl>
            </Column>
            <Column xs={12} md={6} sx={{ p: "5px" }}>
              <FormControl disabled={modo === "consulta"} error={cartaError.fechaFinValidez}>
                <FormLabel>Fecha Fin (MM/DD/YYYY)</FormLabel>
                <Input
                  size="sm"
                  placeholder="Fecha hasta"
                  type="date"
                  value={carta.fechaFinValidez}
                  onChange={(e) => handleChangeInput("fechaFinValidez", e.target.value)}
                />
                {cartaError.fechaFinValidez && (
                  <FormHelperText>
                    <InfoOutlined />
                    Fecha invalida
                  </FormHelperText>
                )}
              </FormControl>
            </Column>
          </Row>
        </Column>
      </Row>
      <Row xs={12} marginTop={2}>
        <Column xs={6} sx={{ p: "5px" }}>
          <Button color="neutral" onClick={() => setModo("consulta")}>
            Cancelar
          </Button>
        </Column>
        {(modo === "registrar" || modo === "editar") && (
          <Column xs={6} sx={{ p: "5px" }}>
            <Button color="success" onClick={handleClickSubmit}>
              Grabar
            </Button>
          </Column>
        )}
      </Row> */}
    </Container>
  );
};

export default FormCarta;
