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
  Modal,
  ModalDialog,
  Option,
  Select,
} from "@mui/joy";
import { Column, Container, Row } from "../../components/GridComponents";
import { InfoOutlined } from "@mui/icons-material";
import { NotificacionInterface } from "../../hooks/notificaciones.hook";
import useUrlAxio from "../../hooks/urlAxio.hook";
import useSesion from "../../hooks/usuarioLogueado.hook";
import {
  DetalleCartaErrorInterface,
  DetalleCartaInterface,
} from "../../interfaces/detalleCarta.interface";
import { ProductoInterface } from "../../interfaces/producto.interface";
import { PromocionInterface } from "../../interfaces/promocion.interface";
import { TipoProductoInterface } from "../../interfaces/tipo.interface";
import { borrarObjetosDuplicados } from "../../utils/Arrays.util";

interface ContainerProps {
  modo?: "consulta" | "registrar" | "editar" | "cerrado";
  detalleCartaSeleccionado?: DetalleCartaInterface;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleClickCancelar?: () => void;
  handleClickGrabar?: (detalle: DetalleCartaInterface) => void;
  MostrarNotificacion: (Notificacion: NotificacionInterface) => void;
}

const ModalFormDetalleCarta: React.FC<ContainerProps> = ({
  modo = "consulta",
  detalleCartaSeleccionado,
  open,
  setOpen,
  handleClickCancelar,
  handleClickGrabar,
  MostrarNotificacion,
}) => {
  const [detalleCarta, setDetalleCarta] = useState<DetalleCartaInterface>({
    id: 0,
    carta: 0,
    promocion: 0,
    producto: 0,
    cantidadDisponible: 0,
    disponible: true,
    visible: true,
  });
  const [detalleCartaError, setDetalleCartaError] = useState<DetalleCartaErrorInterface>({
    carta: false,
    promocion: false,
    producto: false,
    cantidadDisponible: false,
  });

  const [productos, setProductos] = useState<ProductoInterface[]>([]);
  const [promociones, setPromociones] = useState<PromocionInterface[]>([]);

  const [tipoProductoSeleccionado, setTipoProductoSeleccionado] = useState<TipoProductoInterface>({
    id: 0,
    nombre: "",
    descripcion: "",
    habilitado: true,
  });
  const [tiposProducto, setTiposProductos] = useState<TipoProductoInterface[]>([]);

  const { getUrlAxio } = useUrlAxio();
  const { getSesion } = useSesion();

  const getProductos = async () => {
    try {
      const config: AxiosRequestConfig = {
        // params: { },
        headers: {
          Authorization: `Bearer ${getSesion().token}`,
        },
      };
      let response: AxiosResponse = await axios.get(`${getUrlAxio()}Producto`, config);

      if (response.data.length !== 0) {
        let productosResponse: ProductoInterface[] = [];
        response.data.forEach((producto: any) => {
          productosResponse.push({ ...producto });
        });
        productosResponse = productosResponse.filter((producto) => producto.habilitado);

        setProductos(productosResponse);
      } else {
        MostrarNotificacion({
          mostrar: true,
          mensaje: "No se encontraron productos",
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
        promocionesResponse = promocionesResponse.filter((promocion) => promocion.estado === 1);
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

  const getTipoProducto = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${getSesion().token}`,
      },
    };
    try {
      const response = await axios.get(`${getUrlAxio()}TipoProducto`, config);

      let tiposProductosResponse: TipoProductoInterface[] = [
        { id: 0, nombre: "Promocion", descripcion: "", habilitado: true },
      ];
      response.data.forEach((tipo: any) => {
        productos.map((producto) => {
          if (producto.tipo === tipo.id) {
            tiposProductosResponse.push({ ...tipo });
          }
        });
      });
      tiposProductosResponse = tiposProductosResponse.filter((tipo) => tipo.habilitado === true);
      tiposProductosResponse = borrarObjetosDuplicados<TipoProductoInterface>(
        tiposProductosResponse,
        "id",
        false
      );
      setTiposProductos(tiposProductosResponse);
    } catch (e: any) {}
  };

  const CargarFormulario = async () => {
    if (detalleCartaSeleccionado && open) {
      await getProductos();
      await getPromociones();
      await getTipoProducto();
      setDetalleCarta({ ...detalleCartaSeleccionado });
    }
    if (!open)
      setDetalleCarta({
        id: 0,
        carta: 0,
        promocion: 0,
        producto: 0,
        cantidadDisponible: 0,
        disponible: false,
        visible: false,
      });
  };

  useEffect(() => {
    CargarFormulario();
  }, [detalleCartaSeleccionado, open]);

  const ValidarFormulario = (): boolean => {
    let pasa = true;
    let errores: DetalleCartaErrorInterface = {
      carta: false,
      promocion: false,
      producto: false,
      cantidadDisponible: false,
    };

    if (detalleCarta.promocion === 0 && detalleCarta.producto === 0) {
      pasa = false;
      errores.producto = true;
      errores.promocion = true;
    }

    if (detalleCarta.promocion !== 0 && detalleCarta.producto !== 0) {
      pasa = false;
      errores.producto = true;
      errores.promocion = true;
    }

    if (
      (detalleCarta.promocion !== 0 && detalleCarta.producto === null) ||
      (detalleCarta.promocion === null && detalleCarta.producto !== 0)
    ) {
      pasa = true;
      errores.producto = false;
      errores.promocion = false;
    }

    if (detalleCarta.cantidadDisponible === null || detalleCarta.cantidadDisponible <= 0) {
      pasa = false;
      errores.cantidadDisponible = true;
    }

    setDetalleCartaError(errores);
    return pasa;
  };

  const handleChangeInput = (prop: keyof DetalleCartaInterface, value: any) => {
    setDetalleCarta((prevdetalleCarta) => {
      let detalle = prevdetalleCarta;

      if (prop === "promocion" || prop === "producto") {
        if (prop === "promocion") {
          detalle.DetalleCartaPromocion = promociones.filter((promo) => promo.id === value)[0];
          detalle.DetalleCartaProducto = null;
        }

        if (prop === "producto") {
          detalle.DetalleCartaProducto = productos.filter((producto) => producto.id === value)[0];
          detalle.DetalleCartaPromocion = null;
        }
      }

      if (prop === "cantidadDisponible" && value !== "") {
        detalle.cantidadDisponible = Number(value);
      }

      return {
        ...detalle,
        [prop]: value,
      };
    });
  };

  const handleChangeInputTipoProducto = (value: number | null) => {
    let tipo = tiposProducto.filter((tipo) => tipo?.id === value)[0];
    setTipoProductoSeleccionado(tipo);
  };

  const handleClickSubmit = async () => {
    if (ValidarFormulario()) {
      if (handleClickGrabar && (modo === "editar" || modo === "registrar")) {
        handleClickGrabar(detalleCarta);
      }

      setDetalleCarta({
        id: 0,
        carta: 0,
        promocion: 0,
        producto: 0,
        cantidadDisponible: 0,
        disponible: true,
        visible: true,
      });
    } else {
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Hay datos no validos en el formulario",
        color: "rojo",
      });
    }
  };

  const renderTiposProductos = (): JSX.Element[] => {
    return tiposProducto.map((tipo) => (
      <Option value={tipo?.id} key={tipo?.id}>
        {tipo.nombre}
      </Option>
    ));
  };

  const renderProductos = (): JSX.Element[] => {
    if (tipoProductoSeleccionado.id === -1) {
      return productos.map((producto) => (
        <Option value={producto?.id} key={producto?.id}>
          {producto.nombre}
        </Option>
      ));
    } else if (tipoProductoSeleccionado.id !== 0) {
      return productos.map((producto) => {
        if (producto.tipo === tipoProductoSeleccionado.id)
          return (
            <Option value={producto?.id} key={producto?.id}>
              {producto.nombre}
            </Option>
          );
        else return <></>;
      });
    } else return [];
  };

  const renderPromociones = (): JSX.Element[] => {
    if (tipoProductoSeleccionado.id === -1 || tipoProductoSeleccionado.id === 0) {
      return promociones.map((promocion) => (
        <Option value={promocion?.id} key={promocion?.id}>
          {promocion.nombre}
        </Option>
      ));
    } else return [];
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog size="lg">
        <DialogTitle>
          {modo === "editar"
            ? "Editando detalle carta"
            : modo === "registrar"
            ? "Registrando detalle carta"
            : "Informacion de detalle carta"}
        </DialogTitle>
        <DialogContent>
          <Container display="flex" justifyContent="space-between" alignItems="center">
            <Row xs={12}>
              <Column xs={12} sx={{ p: "5px" }}>
                <FormControl disabled={modo === "consulta" || modo === "editar"}>
                  <FormLabel>Tipo Producto</FormLabel>
                  <Select
                    size="sm"
                    required
                    value={tipoProductoSeleccionado?.id}
                    onChange={(e, value) => handleChangeInputTipoProducto(value)}
                  >
                    {renderTiposProductos()}
                  </Select>
                </FormControl>
              </Column>
            </Row>
            <Row xs={12}>
              <Column xs={12} md={6} sx={{ p: "5px" }}>
                <FormControl
                  disabled={
                    modo === "consulta" || tipoProductoSeleccionado?.id === 0 || modo === "editar"
                  }
                  error={detalleCartaError.producto}
                >
                  <FormLabel>Producto</FormLabel>
                  <Select
                    size="sm"
                    required
                    value={detalleCarta.producto}
                    onChange={(e, value) => handleChangeInput("producto", value)}
                  >
                    {renderProductos()}
                  </Select>
                  {detalleCartaError.producto && (
                    <FormHelperText>
                      <InfoOutlined />
                      Dato invalido
                    </FormHelperText>
                  )}
                </FormControl>
              </Column>
              <Column xs={12} md={6} sx={{ p: "5px" }}>
                <FormControl
                  disabled={
                    modo === "consulta" ||
                    !(tipoProductoSeleccionado?.id === 0 || tipoProductoSeleccionado?.id === -1) ||
                    modo === "editar"
                  }
                  error={detalleCartaError.promocion}
                >
                  <FormLabel>Promocion</FormLabel>
                  <Select
                    size="sm"
                    required
                    value={detalleCarta.promocion}
                    onChange={(e, value) => handleChangeInput("promocion", value)}
                  >
                    {renderPromociones()}
                  </Select>
                  {detalleCartaError.promocion && (
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
                <FormControl
                  disabled={modo === "consulta"}
                  required
                  error={detalleCartaError.cantidadDisponible}
                >
                  <FormLabel>Cantidad x Jornada</FormLabel>
                  <Input
                    size="sm"
                    type="number"
                    placeholder="Cantidad x Jornada"
                    value={
                      detalleCarta.cantidadDisponible !== null ? detalleCarta.cantidadDisponible : 0
                    }
                    onFocus={(e) => handleChangeInput("cantidadDisponible", "")}
                    onChange={(e) => handleChangeInput("cantidadDisponible", e.target.value)}
                  />
                  {detalleCartaError.cantidadDisponible && (
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
                  <Checkbox
                    label="Visible"
                    size="lg"
                    sx={{ border: "0px" }}
                    checked={detalleCarta.visible}
                    onChange={(e) => handleChangeInput("visible", e.target.checked)}
                  />
                </FormControl>
              </Column>
            </Row>
            <Row xs={12} marginTop={2}>
              <Column xs={6} sx={{ p: "5px" }}>
                <Button color="neutral" onClick={handleClickCancelar}>
                  Cancelar
                </Button>
              </Column>
              <Column xs={6} sx={{ p: "5px" }}>
                <Button color="success" onClick={handleClickSubmit}>
                  Grabar
                </Button>
              </Column>
            </Row>
          </Container>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default ModalFormDetalleCarta;
