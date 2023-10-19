import React, { useEffect, useState } from "react";
import { Column, Container, Row } from "../../components/GridComponents";
import axios from "axios";
import useUrlAxio from "../../hooks/urlAxio.hook";
import useSesion from "../../hooks/usuarioLogueado.hook";
import { ProductoInterface } from "../../interfaces/producto.interface";
import {
  Button,
  Checkbox,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Option,
  Select,
  Textarea,
  Typography,
} from "@mui/joy";
import { TipoProductoInterface } from "../../interfaces/tipo.interface";

interface ContainerProps {
  modo?: "consulta" | "registrar" | "editar";
  productoSeleccionado?: ProductoInterface;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalFormProductos: React.FC<ContainerProps> = ({
  modo = "consulta",
  open,
  setOpen,
  productoSeleccionado,
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
  const [tiposProducto, setTiposProductos] = useState<TipoProductoInterface[]>([]);
  const { getUrlAxio } = useUrlAxio();
  const { getSesion } = useSesion();

  const getTipoProducto = async () => {
    let config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImRhdGFWYWx1ZXMiOnsiaWQiOjIsInVzZXIiOiJGZWtpc28iLCJwYXNzIjoiJDJhJDA4JDlQV0l0dzZkRHVzY0czY3BUM3FnbS5UeWp4c1ZoS0RqVE13dWZHWGxVTkhTWjkzTUhsVnVHIiwibm9tYnJlIjoiRmVkZXJpY28gRW1tYW51ZWwiLCJhcGVsbGlkbyI6IkNlamFzIiwibnJvRG9jdW1lbnRvIjoiNDMyOTg0MjAiLCJyb2wiOjEsImVzdGFkbyI6MSwidGVsZWZvbm8iOiIzNTI1NjEwNjU3IiwiZW1haWwiOiJmY2VqYXM0ODRAZ21haWwuY29tIiwiZmVjaGFfY3JlYWNpb24iOiIyMDIzLTEwLTE5VDAyOjAzOjQ4LjAwMFoiLCJmZWNoYV9hY3R1YWxpemFjaW9uIjoiMjAyMy0xMC0xOVQwMjowMzo0OC4wMDBaIn0sIl9wcmV2aW91c0RhdGFWYWx1ZXMiOnsiaWQiOjIsInVzZXIiOiJGZWtpc28iLCJwYXNzIjoiJDJhJDA4JDlQV0l0dzZkRHVzY0czY3BUM3FnbS5UeWp4c1ZoS0RqVE13dWZHWGxVTkhTWjkzTUhsVnVHIiwibm9tYnJlIjoiRmVkZXJpY28gRW1tYW51ZWwiLCJhcGVsbGlkbyI6IkNlamFzIiwibnJvRG9jdW1lbnRvIjoiNDMyOTg0MjAiLCJyb2wiOjEsImVzdGFkbyI6MSwidGVsZWZvbm8iOiIzNTI1NjEwNjU3IiwiZW1haWwiOiJmY2VqYXM0ODRAZ21haWwuY29tIiwiZmVjaGFfY3JlYWNpb24iOiIyMDIzLTEwLTE5VDAyOjAzOjQ4LjAwMFoiLCJmZWNoYV9hY3R1YWxpemFjaW9uIjoiMjAyMy0xMC0xOVQwMjowMzo0OC4wMDBaIn0sInVuaXFubyI6MSwiX2NoYW5nZWQiOnt9LCJfb3B0aW9ucyI6eyJpc05ld1JlY29yZCI6ZmFsc2UsIl9zY2hlbWEiOm51bGwsIl9zY2hlbWFEZWxpbWl0ZXIiOiIiLCJyYXciOnRydWUsImF0dHJpYnV0ZXMiOlsiaWQiLCJ1c2VyIiwicGFzcyIsIm5vbWJyZSIsImFwZWxsaWRvIiwibnJvRG9jdW1lbnRvIiwicm9sIiwiZXN0YWRvIiwidGVsZWZvbm8iLCJlbWFpbCIsImZlY2hhX2NyZWFjaW9uIiwiZmVjaGFfYWN0dWFsaXphY2lvbiJdfSwiaXNOZXdSZWNvcmQiOmZhbHNlfSwiaWF0IjoxNjk3NjgxMDQ1LCJleHAiOjE2OTc3MDk4NDV9.vCM1ofUJ_ZCYyO_vGMb5HpMCt7ismmfNvV-Jdyn8JDw`,
      },
    };
    try {
      const response = await axios.get(`${getUrlAxio()}Tipoproducto`, config);

      let tiposProductosResponse: ProductoInterface[] = [];
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

  const postProducto = async () => {
    let config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImRhdGFWYWx1ZXMiOnsiaWQiOjIsInVzZXIiOiJGZWtpc28iLCJwYXNzIjoiJDJhJDA4JDlQV0l0dzZkRHVzY0czY3BUM3FnbS5UeWp4c1ZoS0RqVE13dWZHWGxVTkhTWjkzTUhsVnVHIiwibm9tYnJlIjoiRmVkZXJpY28gRW1tYW51ZWwiLCJhcGVsbGlkbyI6IkNlamFzIiwibnJvRG9jdW1lbnRvIjoiNDMyOTg0MjAiLCJyb2wiOjEsImVzdGFkbyI6MSwidGVsZWZvbm8iOiIzNTI1NjEwNjU3IiwiZW1haWwiOiJmY2VqYXM0ODRAZ21haWwuY29tIiwiZmVjaGFfY3JlYWNpb24iOiIyMDIzLTEwLTE5VDAyOjAzOjQ4LjAwMFoiLCJmZWNoYV9hY3R1YWxpemFjaW9uIjoiMjAyMy0xMC0xOVQwMjowMzo0OC4wMDBaIn0sIl9wcmV2aW91c0RhdGFWYWx1ZXMiOnsiaWQiOjIsInVzZXIiOiJGZWtpc28iLCJwYXNzIjoiJDJhJDA4JDlQV0l0dzZkRHVzY0czY3BUM3FnbS5UeWp4c1ZoS0RqVE13dWZHWGxVTkhTWjkzTUhsVnVHIiwibm9tYnJlIjoiRmVkZXJpY28gRW1tYW51ZWwiLCJhcGVsbGlkbyI6IkNlamFzIiwibnJvRG9jdW1lbnRvIjoiNDMyOTg0MjAiLCJyb2wiOjEsImVzdGFkbyI6MSwidGVsZWZvbm8iOiIzNTI1NjEwNjU3IiwiZW1haWwiOiJmY2VqYXM0ODRAZ21haWwuY29tIiwiZmVjaGFfY3JlYWNpb24iOiIyMDIzLTEwLTE5VDAyOjAzOjQ4LjAwMFoiLCJmZWNoYV9hY3R1YWxpemFjaW9uIjoiMjAyMy0xMC0xOVQwMjowMzo0OC4wMDBaIn0sInVuaXFubyI6MSwiX2NoYW5nZWQiOnt9LCJfb3B0aW9ucyI6eyJpc05ld1JlY29yZCI6ZmFsc2UsIl9zY2hlbWEiOm51bGwsIl9zY2hlbWFEZWxpbWl0ZXIiOiIiLCJyYXciOnRydWUsImF0dHJpYnV0ZXMiOlsiaWQiLCJ1c2VyIiwicGFzcyIsIm5vbWJyZSIsImFwZWxsaWRvIiwibnJvRG9jdW1lbnRvIiwicm9sIiwiZXN0YWRvIiwidGVsZWZvbm8iLCJlbWFpbCIsImZlY2hhX2NyZWFjaW9uIiwiZmVjaGFfYWN0dWFsaXphY2lvbiJdfSwiaXNOZXdSZWNvcmQiOmZhbHNlfSwiaWF0IjoxNjk3NjgxMDQ1LCJleHAiOjE2OTc3MDk4NDV9.vCM1ofUJ_ZCYyO_vGMb5HpMCt7ismmfNvV-Jdyn8JDw`,
      },
    };
    try {
      const response = await axios.post(
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
      console.log("objeto creado");
    } catch (e: any) {}
  };

  const putProducto = async () => {
    let config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImRhdGFWYWx1ZXMiOnsiaWQiOjIsInVzZXIiOiJGZWtpc28iLCJwYXNzIjoiJDJhJDA4JDlQV0l0dzZkRHVzY0czY3BUM3FnbS5UeWp4c1ZoS0RqVE13dWZHWGxVTkhTWjkzTUhsVnVHIiwibm9tYnJlIjoiRmVkZXJpY28gRW1tYW51ZWwiLCJhcGVsbGlkbyI6IkNlamFzIiwibnJvRG9jdW1lbnRvIjoiNDMyOTg0MjAiLCJyb2wiOjEsImVzdGFkbyI6MSwidGVsZWZvbm8iOiIzNTI1NjEwNjU3IiwiZW1haWwiOiJmY2VqYXM0ODRAZ21haWwuY29tIiwiZmVjaGFfY3JlYWNpb24iOiIyMDIzLTEwLTE5VDAyOjAzOjQ4LjAwMFoiLCJmZWNoYV9hY3R1YWxpemFjaW9uIjoiMjAyMy0xMC0xOVQwMjowMzo0OC4wMDBaIn0sIl9wcmV2aW91c0RhdGFWYWx1ZXMiOnsiaWQiOjIsInVzZXIiOiJGZWtpc28iLCJwYXNzIjoiJDJhJDA4JDlQV0l0dzZkRHVzY0czY3BUM3FnbS5UeWp4c1ZoS0RqVE13dWZHWGxVTkhTWjkzTUhsVnVHIiwibm9tYnJlIjoiRmVkZXJpY28gRW1tYW51ZWwiLCJhcGVsbGlkbyI6IkNlamFzIiwibnJvRG9jdW1lbnRvIjoiNDMyOTg0MjAiLCJyb2wiOjEsImVzdGFkbyI6MSwidGVsZWZvbm8iOiIzNTI1NjEwNjU3IiwiZW1haWwiOiJmY2VqYXM0ODRAZ21haWwuY29tIiwiZmVjaGFfY3JlYWNpb24iOiIyMDIzLTEwLTE5VDAyOjAzOjQ4LjAwMFoiLCJmZWNoYV9hY3R1YWxpemFjaW9uIjoiMjAyMy0xMC0xOVQwMjowMzo0OC4wMDBaIn0sInVuaXFubyI6MSwiX2NoYW5nZWQiOnt9LCJfb3B0aW9ucyI6eyJpc05ld1JlY29yZCI6ZmFsc2UsIl9zY2hlbWEiOm51bGwsIl9zY2hlbWFEZWxpbWl0ZXIiOiIiLCJyYXciOnRydWUsImF0dHJpYnV0ZXMiOlsiaWQiLCJ1c2VyIiwicGFzcyIsIm5vbWJyZSIsImFwZWxsaWRvIiwibnJvRG9jdW1lbnRvIiwicm9sIiwiZXN0YWRvIiwidGVsZWZvbm8iLCJlbWFpbCIsImZlY2hhX2NyZWFjaW9uIiwiZmVjaGFfYWN0dWFsaXphY2lvbiJdfSwiaXNOZXdSZWNvcmQiOmZhbHNlfSwiaWF0IjoxNjk3NjgxMDQ1LCJleHAiOjE2OTc3MDk4NDV9.vCM1ofUJ_ZCYyO_vGMb5HpMCt7ismmfNvV-Jdyn8JDw`,
      },
    };
    try {
      const response = await axios.put(
        `${getUrlAxio()}Producto/${producto.id}`,
        {
          tipo: producto.tipo,
          nombre: producto.nombre,
          descipcion: producto.descripcion,
          precio: producto.precio,
          habilitado: producto.habilitado,
        },
        config
      );
      console.log("objeto editado");
    } catch (e: any) {}
  };

  const handleChangeVisibilityOfPassword = () => {
    setBlnVerPassword(!blnVerPassword);
  };

  const handleChangeInput = (prop: keyof ProductoInterface, value: any) => {
    setProducto((prevProducto) => ({
      ...prevProducto,
      [prop]: value,
    }));
  };

  const handleClickSubmit = async () => {
    console.log(producto);
    if (modo === "editar") {
      await putProducto();
    }
    if (modo === "registrar") {
      await postProducto();
    }
  };

  const renderTiposProductos = (): JSX.Element[] => {
    return tiposProducto.map((tipo) => <Option value={tipo.id}>{tipo.nombre}</Option>);
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
          {modo === "consulta" ? (
            <Container display="flex" justifyContent="space-between" alignItems="center">
              <Row xs={12}>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Typography>{producto.nombre}</Typography>
                  </FormControl>
                </Column>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Desc</FormLabel>
                    <Typography>{producto.descripcion}</Typography>
                  </FormControl>
                </Column>
              </Row>
              <Row xs={12} marginTop={2}>
                <Column xs={6} sx={{ p: "5px" }}>
                  <Button color="neutral" onClick={() => setOpen(false)}>
                    Salir
                  </Button>
                </Column>
              </Row>
            </Container>
          ) : (
            <Container display="flex" justifyContent="space-between" alignItems="center">
              <Row xs={12}>
                <Column xs={12} md={6}>
                  <Row xs={12}>
                    <Column xs={12} sx={{ p: "5px" }}>
                      <FormControl>
                        <FormLabel>Nombre</FormLabel>
                        <Input
                          size="sm"
                          required
                          placeholder="Nombre"
                          value={producto.nombre}
                          onChange={(e) => handleChangeInput("nombre", e.target.value)}
                        />
                      </FormControl>
                    </Column>
                  </Row>
                  <Row xs={12} sx={{ p: "5px" }}>
                    <Column xs={12} sx={{ p: "5px" }}>
                      <FormControl>
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
                      <FormControl>
                        <FormLabel>Tipo Producto</FormLabel>
                        <Select
                          size="sm"
                          required
                          value={producto.tipo}
                          onChange={(e, value) => handleChangeInput("tipo", value)}
                        >
                          {renderTiposProductos()}
                        </Select>
                      </FormControl>
                    </Column>
                  </Row>
                  <Row xs={12}>
                    <Column xs={12} sx={{ p: "5px" }}>
                      <FormControl>
                        <FormLabel>Precio</FormLabel>
                        <Textarea
                          size="sm"
                          placeholder="Precio"
                          value={producto.precio}
                          onChange={(e) => handleChangeInput("precio", e.target.value)}
                        />
                      </FormControl>
                    </Column>
                  </Row>
                  <Row xs={12}>
                    <Column xs={12} sx={{ p: "5px" }}>
                      <FormControl>
                        <Checkbox
                          label="Habilitado"
                          size="lg"
                          sx={{ border: "0px" }}
                          checked={producto.habilitado}
                          onChange={(e) => handleChangeInput("habilitado", e.target.value)}
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
                <Column xs={6} sx={{ p: "5px" }}>
                  <Button color="success" onClick={handleClickSubmit}>
                    Grabar
                  </Button>
                </Column>
              </Row>
            </Container>
          )}
          {/* </Box> */}
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default ModalFormProductos;
