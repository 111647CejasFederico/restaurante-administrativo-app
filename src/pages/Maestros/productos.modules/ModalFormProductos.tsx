import React, { useEffect, useState } from "react";
import { Column, Container, Row } from "../../../components/GridComponents";
import axios from "axios";
import useUrlAxio from "../../../hooks/urlAxio.hook";
import useSesion from "../../../hooks/usuarioLogueado.hook";
import { ProductoErrorInterface, ProductoInterface } from "../../../interfaces/producto.interface";
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
  Textarea,
} from "@mui/joy";
import { TipoProductoInterface } from "../../../interfaces/tipo.interface";
import { NotificacionInterface, useNotificacion } from "../../../hooks/notificaciones.hook";
import { InfoOutlined } from "@mui/icons-material";

interface ContainerProps {
  modo?: "consulta" | "registrar" | "editar" | "cerrado";
  productoSeleccionado?: ProductoInterface;
  open: boolean;
  setOpen: (open: boolean) => void;
  MostrarNotificacion: (Notificacion: NotificacionInterface) => void;
}

const ModalFormProductos: React.FC<ContainerProps> = ({
  modo = "consulta",
  open,
  setOpen,
  productoSeleccionado,
  MostrarNotificacion,
}) => {
  const [blnVerPassword, setBlnVerPassword] = useState(false);
  const [producto, setProducto] = useState<ProductoInterface>({
    id: 0,
    nombre: "",
    descripcion: "",
    tipo: 0,
    precio: 0,
    habilitado: false,
  });
  const [productoError, setProductoError] = useState<ProductoErrorInterface>({
    nombre: false,
    descripcion: false,
    tipo: false,
    precio: false,
    habilitado: false,
  });

  const [tiposProducto, setTiposProductos] = useState<TipoProductoInterface[]>([]);

  const { getSesion } = useSesion();
  const { getUrlAxio } = useUrlAxio();

  const getTipoProducto = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${getSesion().token}`,
      },
    };
    try {
      const response = await axios.get(`${getUrlAxio()}Tipoproducto`, config);

      let tiposProductosResponse: TipoProductoInterface[] = [];
      response.data.forEach((tipos: any) => {
        tiposProductosResponse.push({ ...tipos });
      });
      setTiposProductos(tiposProductosResponse);
    } catch (e: any) {}
  };

  useEffect(() => {
    if (productoSeleccionado && open) {
      setProducto(productoSeleccionado);
      getTipoProducto();
    }
    if (!open)
      setProducto({
        id: 0,
        nombre: "",
        descripcion: "",
        tipo: 0,
        precio: 0,
        habilitado: false,
      });
  }, [productoSeleccionado, open]);

  const ValidarFormulario = (): boolean => {
    let errores: ProductoErrorInterface = {
      nombre: false,
      descripcion: false,
      tipo: false,
      precio: false,
      habilitado: false,
    };

    let pasa = true;
    if (producto.nombre === "") {
      pasa = false;
      errores.nombre = true;
    }
    if (producto.precio <= 0) {
      pasa = false;
      errores.precio = true;
    }
    if (producto.tipo === 0 || !tiposProducto.some((tipo) => tipo.id === producto.tipo)) {
      pasa = false;
      errores.tipo = true;
    }

    setProductoError(errores);
    return pasa;
  };
  const postProducto = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${getSesion().token}`,
      },
    };
    try {
      await axios.post(
        `${getUrlAxio()}Producto`,
        {
          tipo: producto.tipo,
          nombre: producto.nombre,
          descipcion: producto.descripcion,
          precio: producto.precio,
          habilitado: producto.habilitado,
        },
        config
      );
      MostrarNotificacion({ mostrar: true, mensaje: "Nuevo producto registrado ", color: "verde" });
      setOpen(false);
    } catch (e: any) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Error: No se pudo registrar el producto",
        color: "rojo",
      });
    }
  };

  const putProducto = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${getSesion().token}`,
      },
    };
    try {
      await axios.put(
        `${getUrlAxio()}Producto`,
        {
          id: producto.id,
          tipo: producto.tipo,
          nombre: producto.nombre,
          descipcion: producto.descripcion,
          precio: producto.precio,
          habilitado: producto.habilitado,
        },
        config
      );
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Producto modificado exitosamente",
        color: "verde",
      });
      setOpen(false);
    } catch (e: any) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Error: No se modifico el producto",
        color: "rojo",
      });
    }
  };

  const handleChangeInput = (prop: keyof ProductoInterface, value: any) => {
    setProducto((prevProducto) => ({
      ...prevProducto,
      [prop]: value,
    }));
  };

  const handleClickSubmit = async () => {
    if (ValidarFormulario()) {
      if (modo === "editar") {
        await putProducto();
      }
      if (modo === "registrar") {
        await postProducto();
      }
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
      <Option value={tipo.id} key={tipo.id}>
        {tipo.nombre}
      </Option>
    ));
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog size="lg">
        <DialogTitle>
          {modo === "editar"
            ? "Editando producto"
            : modo === "registrar"
            ? "Registrando producto"
            : "Informacion de producto"}
        </DialogTitle>
        <DialogContent>
          <Container display="flex" justifyContent="space-between" alignItems="center">
            <Row xs={12}>
              <Column xs={12} md={6}>
                <Row xs={12}>
                  <Column xs={12} sx={{ p: "5px" }}>
                    <FormControl
                      disabled={modo === "consulta"}
                      required
                      error={productoError.nombre}
                    >
                      <FormLabel>Nombre</FormLabel>
                      <Input
                        size="sm"
                        required
                        placeholder="Nombre"
                        value={producto.nombre}
                        onChange={(e) => handleChangeInput("nombre", e.target.value)}
                      />
                      {productoError.nombre && (
                        <FormHelperText>
                          <InfoOutlined />
                          Dato invalido
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Column>
                </Row>
                <Row xs={12} sx={{ p: "5px" }}>
                  <Column xs={12} sx={{ p: "5px" }}>
                    <FormControl disabled={modo === "consulta"}>
                      <FormLabel>Descripcion</FormLabel>
                      <Textarea
                        size="sm"
                        minRows={2.5}
                        placeholder="Descripcion"
                        value={producto.descripcion}
                        onChange={(e) => handleChangeInput("descripcion", e.target.value)}
                      />
                    </FormControl>
                  </Column>
                </Row>
              </Column>
              <Column xs={12} md={6}>
                <Row xs={12}>
                  <Column xs={12} sx={{ p: "5px" }}>
                    <FormControl disabled={modo === "consulta"} required error={productoError.tipo}>
                      <FormLabel>Tipo Producto</FormLabel>
                      <Select
                        size="sm"
                        required
                        value={producto.tipo}
                        onChange={(e, value) => handleChangeInput("tipo", value)}
                      >
                        {renderTiposProductos()}
                      </Select>
                      {productoError.tipo && (
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
                      error={productoError.precio}
                    >
                      <FormLabel>Precio</FormLabel>
                      <Textarea
                        size="sm"
                        placeholder="Precio"
                        value={producto.precio}
                        onChange={(e) => handleChangeInput("precio", e.target.value)}
                      />
                      {productoError.precio && (
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
                        label="Habilitado"
                        size="lg"
                        sx={{ border: "0px" }}
                        checked={producto.habilitado}
                        onChange={(e) => handleChangeInput("habilitado", e.target.checked)}
                      />
                    </FormControl>
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row xs={12} marginTop={2}>
              <Column xs={6} sx={{ p: "5px" }}>
                <Button color="neutral" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
              </Column>
              {modo !== "consulta" && (
                <Column xs={6} sx={{ p: "5px" }}>
                  <Button color="success" onClick={handleClickSubmit}>
                    Grabar
                  </Button>
                </Column>
              )}
            </Row>
          </Container>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default ModalFormProductos;
