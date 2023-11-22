import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { Column, Container, Row } from "../../components/GridComponents";
import {
  Delete,
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
import ModalFormDetalleCarta from "./ModalFormDetalleCarta";
import ModalDarBaja from "../../components/FeedbackComponents/ModalDarBaja";

interface ContainerProps {
  modo: "consulta" | "registrar";
  cargarCarta: (cartaPreseleccionada: CartaInterface) => void;
  cartaSeleccionada?: CartaInterface;
  MostrarNotificacion: (Notificacion: NotificacionInterface) => void;
}

const FormCarta: React.FC<ContainerProps> = ({
  modo = "consulta",
  cargarCarta,
  cartaSeleccionada,
  MostrarNotificacion,
}) => {
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
    carta: carta?.id || 0,
    producto: 0,
    promocion: 0,
    cantidadDisponible: 0,
    disponible: true,
    visible: true,
  });

  const [modoCarta, setModoCarta] = useState<"consulta" | "registrar" | "editar" | "cerrado">(
    "consulta"
  );
  const [modoDetalleCarta, setModoDetalleCarta] = useState<
    "consulta" | "registrar" | "editar" | "cerrado"
  >("consulta");
  const [abrirModalFormDetalle, setAbrirModalFormDetalle] = useState<boolean>(false);
  const [ocultarItemCarta, setOcultarItemCarta] = useState<boolean>(false);

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
    if (modo === "consulta" && cartaSeleccionada) {
      setCarta(cartaSeleccionada);
      let detalleCarta = cartaSeleccionada.DetallesCarta || [];
      setDetallesCarta(detalleCarta);
      setModoCarta("consulta");
    }
    if (modo === "registrar") {
      setCarta({
        id: 0,
        nombre: "",
        descripcion: "",
        fechaInicioValidez: "",
        fechaFinValidez: "",
        habilitado: false,
      });
      setDetallesCarta([]);
      setModoCarta("registrar");
    }
  };

  useEffect(() => {
    CargarFormulario();
  }, [cartaSeleccionada, modo]);

  const ValidarFormulario = (): boolean => {
    let errores: CartaErrorInterface = {
      nombre: false,
      descripcion: false,
      fechaInicioValidez: false,
      fechaFinValidez: false,
      habilitado: false,
    };
    let pasa = true;
    if (carta.nombre === "") {
      pasa = false;
      errores.nombre = true;
    }
    if (carta.fechaInicioValidez !== "" || carta.fechaFinValidez !== "") {
      if (carta.fechaInicioValidez !== "" && carta.fechaFinValidez === "") {
        pasa = false;
        errores.fechaFinValidez = true;
      }
      if (carta.fechaInicioValidez === "" && carta.fechaFinValidez !== "") {
        pasa = false;
        errores.fechaInicioValidez = true;
      }

      if (
        dayjs(carta.fechaInicioValidez).isSame(dayjs(carta.fechaFinValidez)) &&
        dayjs(carta.fechaInicioValidez).isBefore(dayjs(carta.fechaFinValidez))
      ) {
        pasa = false;
        errores.fechaInicioValidez = true;
      }
      if (
        dayjs(carta.fechaInicioValidez).isSame(dayjs(carta.fechaFinValidez)) &&
        dayjs(carta.fechaInicioValidez).isBefore(dayjs(carta.fechaFinValidez))
      ) {
        pasa = false;
        errores.fechaFinValidez = true;
      }
    }

    setCartaError(errores);
    return pasa;
  };

  const postCarta = async () => {
    let config = {
      headers: { Authorization: `Bearer ${getSesion().token}` },
    };
    try {
      let responseCarta = await axios.post(
        `${getUrlAxio()}Carta`,
        {
          id: carta.id,
          nombre: carta.nombre,
          descripcion: carta.descripcion,
          fechaInicioValidez: carta.fechaInicioValidez,
          fechaFinValidez: carta.fechaFinValidez,
          habilitado: carta.habilitado,
          DetallesCarta: detallesCarta,
        },
        config
      );
      if (responseCarta.status === 201) {
        setCarta(responseCarta.data[0]);
      }
      MostrarNotificacion({ mostrar: true, mensaje: "Nueva carta registrada", color: "verde" });
    } catch (e: any) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Error: No se pudo registrar la carta",
        color: "rojo",
      });
    }
  };

  const putCarta = async () => {
    let config = {
      headers: { Authorization: `Bearer ${getSesion().token}` },
    };
    try {
      await axios.put(
        `${getUrlAxio()}Carta`,
        {
          id: carta.id,
          nombre: carta.nombre,
          descripcion: carta.descripcion,
          fechaInicioValidez: carta.fechaInicioValidez,
          fechaFinValidez: carta.fechaFinValidez,
          habilitado: carta.habilitado,
          DetallesCarta: detallesCarta,
        },
        config
      );
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Promocion modificada exitosamente",
        color: "verde",
      });
      // setOpen(false);
    } catch (e: any) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Error: No se modifico la",
        color: "rojo",
      });
    }
  };

  const visibilidadDetalleCartaSeleccionado = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${getSesion().token}`,
      },
    };
    try {
      const response = await axios.put(
        `${getUrlAxio()}DetalleCarta`,
        {
          id: detalleCartaSeleccionado.id,
          visible: !detalleCartaSeleccionado.visible,
        },
        config
      );
      MostrarNotificacion({
        mostrar: true,
        mensaje: `Visibilidad de item de carta modificado exitosamente`,
        color: "verde",
      });
      // await getPromociones();
    } catch (e: any) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: `Error: No se pudo modificar la visibilidad del item de carta seleccionado`,
        color: "rojo",
      });
    }
  };

  const handleChangeInput = (prop: keyof CartaInterface, value: any) => {
    setCarta((prevCarta) => ({
      ...prevCarta,
      [prop]: value,
    }));
  };

  const handleClickSubmit = async () => {
    if (ValidarFormulario()) {
      if (modoCarta === "editar") {
        await putCarta();
      }
      if (modo === "registrar") {
        await postCarta();
      }
      cargarCarta(carta);
    } else {
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Hay datos no validos en el formulario",
        color: "rojo",
      });
    }
  };

  const handleClickRegistrarDetalleCarta = () => {
    setModoDetalleCarta("registrar");
    setAbrirModalFormDetalle(true);
  };

  const handleClickEditarCarta = () => {
    setModoCarta("editar");
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

  const handleClickVisibilityDetalleCarta = (detalleCarta: DetalleCartaInterface) => {
    setOcultarItemCarta(true);
    setDetalleCartaSeleccionado(detalleCarta);
  };

  const handleClickOcultarDetalleCarta = async () => {
    if (detalleCartaSeleccionado.id) {
      await visibilidadDetalleCartaSeleccionado();
      setDetalleCartaSeleccionado({
        carta: carta.id || 0,
        producto: 0,
        promocion: 0,
        cantidadDisponible: 0,
        disponible: true,
        visible: true,
      });
      cargarCarta(carta);
    } else {
      setDetallesCarta((prevDetalles) =>
        prevDetalles.filter((detalle) => detalle !== detalleCartaSeleccionado)
      );
    }
  };

  const handleClickConfirmarModalDetalleCarta = (itemCarta: DetalleCartaInterface) => {
    let detallesItemsTemp: DetalleCartaInterface[] = [...detallesCarta];
    let indexItem: number | null = null;
    console.log(itemCarta);
    if (itemCarta.id) {
      indexItem = detallesCarta.findIndex((detalle) => detalle.id === itemCarta.id);
    } else {
      if (itemCarta.producto && itemCarta.producto !== 0) {
        indexItem = detallesCarta.findIndex((detalle) => detalle.producto === itemCarta.producto);
      } else {
        if (itemCarta.promocion && itemCarta.promocion !== 0) {
          indexItem = detallesCarta.findIndex(
            (detalle) => detalle.promocion === itemCarta.promocion
          );
        }
      }
    }

    if (indexItem !== -1 && indexItem !== null) {
      detallesItemsTemp[indexItem] = itemCarta;
    } else {
      detallesItemsTemp.push(itemCarta);
    }

    setDetallesCarta(detallesItemsTemp);
    setDetalleCartaSeleccionado({
      carta: carta.id || 0,
      producto: 0,
      promocion: 0,
      cantidadDisponible: 0,
      disponible: true,
      visible: true,
    });
    setModoDetalleCarta("cerrado");
    setAbrirModalFormDetalle(false);
  };

  const handleClickCancelarModalDetalleCarta = () => {
    setDetalleCartaSeleccionado({
      carta: carta.id || 0,
      producto: 0,
      promocion: 0,
      cantidadDisponible: 0,
      disponible: true,
      visible: true,
    });
    setModoDetalleCarta("cerrado");
    setAbrirModalFormDetalle(false);
  };

  const renderTableProductos = (): JSX.Element => {
    type DetalleCartaTableInterface = ReturnType<
      typeof createExtendedInterfaceForTables<DetalleCartaInterface>
    >;

    let visibleColumns: Set<keyof DetalleCartaTableInterface> = new Set([
      "nombre",
      "tipo",
      "cantidadDisponible",
      "disponible",
      "visible",
    ]);

    let cabecera: HeadCell<DetalleCartaTableInterface>[] = [
      { id: "nombre", label: "Nombre", numeric: false, ordenable: true },
      { id: "tipo", label: "Tipo Producto", numeric: false, ordenable: true },
      { id: "cantidadDisponible", label: "Cant Disp", numeric: false, ordenable: true },
      // { id: "disponible", label: "Disponible", numeric: false, ordenable: true },
      { id: "visible", label: "Visible", numeric: false, ordenable: true },
    ];

    if (modoCarta === "editar" || modoCarta === "registrar") {
      cabecera.push({ id: "acciones", label: "Acciones", numeric: false, ordenable: false });
      visibleColumns.add("acciones");
    }

    let filas: BodyRow<DetalleCartaTableInterface>[] = [];
    if (detallesCarta.length > 0) {
      detallesCarta.map((detalleCarta) => {
        const rowId = `row-${detalleCarta.producto}-${detalleCarta.promocion}`;
        filas.push({
          id: rowId,
          row: [
            {
              id: "nombre",
              numeric: false,
              //@ts-ignore
              value:
                detalleCarta.producto !== null && detalleCarta.producto !== 0
                  ? detalleCarta.DetalleCartaProducto?.nombre
                  : detalleCarta.DetalleCartaPromocion?.nombre,
              render: (
                <Typography>
                  {detalleCarta.producto !== null && detalleCarta.producto !== 0
                    ? detalleCarta.DetalleCartaProducto?.nombre
                    : detalleCarta.DetalleCartaPromocion?.nombre}
                </Typography>
              ),
            },
            {
              id: "tipo",
              numeric: false,
              //@ts-ignore
              value:
                detalleCarta.producto !== null && detalleCarta.producto !== 0
                  ? detalleCarta.DetalleCartaProducto?.TipoProducto?.nombre
                  : "Promocion",
              render: (
                <Typography>
                  {detalleCarta.producto !== null && detalleCarta.producto !== 0
                    ? detalleCarta.DetalleCartaProducto?.TipoProducto?.nombre
                    : "Promocion"}
                </Typography>
              ),
            },
            {
              id: "cantidadDisponible",
              numeric: true,
              value: detalleCarta.cantidadDisponible,
              render: <Typography>{detalleCarta.cantidadDisponible}</Typography>,
            },
            // {
            //   id: "disponible",
            //   numeric: false,
            //   value: detalleCarta.disponible ? "Habilitado" : "Inhabilitado",
            //   render: (
            //     <Typography> {detalleCarta.disponible ? "Habilitado" : "Inhabilitado"}</Typography>
            //   ),
            // },
            {
              id: "visible",
              numeric: false,
              value: detalleCarta.visible ? "Visible" : "No visible",
              render: <Typography> {detalleCarta.visible ? "Visible" : "No visible"}</Typography>,
            },
            {
              id: "acciones",
              numeric: false,
              value: null,
              render: (
                <Stack direction="row" alignContent="space-around" alignItems="center">
                  {(modoCarta === "editar" || modoCarta === "registrar") && (
                    <>
                      <Button
                        variant="plain"
                        onClick={() => handleClickEditarDetalleCarta(detalleCarta)}
                        sx={{ p: "8px" }}
                      >
                        <Edit />
                      </Button>
                      {/* <Button variant="plain" onClick={() => handlechan(detalleCarta)} sx={{ p: "8px" }}>
                  {detalleCarta.visible ? <Visibility /> : <VisibilityOff />}
                </Button> */}
                      <Button
                        variant="plain"
                        onClick={() => handleClickVisibilityDetalleCarta(detalleCarta)}
                        sx={{ p: "8px" }}
                      >
                        {detalleCarta.id ? (
                          detalleCarta.visible ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )
                        ) : (
                          <Delete />
                        )}
                      </Button>
                    </>
                  )}
                </Stack>
              ),
            },
          ],
          rowProps: { onDoubleClick: () => handleClickConsultarDetalleCarta(detalleCarta) },
        });
      });
    }

    return (
      <CustomTable<DetalleCartaTableInterface>
        data={filas}
        headCells={cabecera}
        showCheckbox={false}
        mostrarAgregar={modoCarta === "registrar" || modoCarta === "editar"}
        visibleColumns={visibleColumns}
        labelAgregar="Agregar item"
        handleClickRegistrar={handleClickRegistrarDetalleCarta}
        SheetProperties={{
          variant: "outlined",
          sx: {
            borderRadius: "8px",
            margin: "5px",
            padding: "5px",
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
      <Row xs={12}>
        <Column xs={12} md={6}>
          <Row xs={12}>
            <Column xs={12} sx={{ p: "5px" }}>
              <FormControl disabled={modoCarta === "consulta"} required error={cartaError.nombre}>
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
              <FormControl disabled={modoCarta === "consulta"}>
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
        </Column>
        <Column xs={12} md={6} sx={{ p: "5px" }}>
          <FormLabel>Periodo validez</FormLabel>
          <Row xs={12}>
            <Column xs={12} sm={6} lg={4} sx={{ p: "5px" }}>
              <FormControl
                disabled={modoCarta === "consulta"}
                error={cartaError.fechaInicioValidez}
              >
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
            <Column xs={12} sm={6} lg={4} sx={{ p: "5px" }}>
              <FormControl disabled={modoCarta === "consulta"} error={cartaError.fechaFinValidez}>
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
      {renderTableProductos()}
      {modoCarta === "registrar" || modoCarta === "editar" ? (
        <Row xs={12} marginTop={2}>
          <Column xs={6} sx={{ p: "5px" }}>
            <Button color="neutral" onClick={() => setModoCarta("consulta")}>
              Cancelar
            </Button>
          </Column>
          <Column xs={6} sx={{ p: "5px" }}>
            <Button color="success" onClick={handleClickSubmit}>
              Grabar
            </Button>
          </Column>
        </Row>
      ) : (
        <Row xs={12} marginTop={2}>
          <Column xs={12} sx={{ p: "5px" }}>
            <Button color="success" onClick={handleClickEditarCarta}>
              Editar
            </Button>
          </Column>
        </Row>
      )}
      <ModalFormDetalleCarta
        MostrarNotificacion={MostrarNotificacion}
        open={abrirModalFormDetalle}
        setOpen={setAbrirModalFormDetalle}
        detalleCartaSeleccionado={detalleCartaSeleccionado}
        handleClickCancelar={handleClickCancelarModalDetalleCarta}
        handleClickGrabar={handleClickConfirmarModalDetalleCarta}
        modo={modoDetalleCarta}
      />
      <ModalDarBaja
        titulo={`${detalleCartaSeleccionado.visible ? "Ocultar" : "Mostrar"} item carta`}
        texto={`Esta seguro que desea ${
          detalleCartaSeleccionado.visible ? "ocultar" : "mostrar"
        } el item de carta seleccionado?`}
        colorBotonNo="neutral"
        colorBotonSi="warning"
        textoBotonNo="Cancelar"
        textoBotonSi={detalleCartaSeleccionado.visible ? "Ocultar" : "Mostrar"}
        open={ocultarItemCarta}
        setOpen={setOcultarItemCarta}
        handleClickConfirmar={handleClickOcultarDetalleCarta}
      />
    </Container>
  );
};

export default FormCarta;
