import React, { ReactNode, useEffect, useState } from "react";

import { Button, Stack, Table } from "@mui/joy";
import { Add, Edit, NoFood } from "@mui/icons-material";
import { Column, Container, Row } from "../../components/GridComponents";
import ModalFormProductos from "./ModalFormProductos";
import ModalDarBaja from "../../components/FeedbackComponents/ModalDarBaja";
import { ProductoInterface } from "../../interfaces/producto.interface";
import useUrlAxio from "../../hooks/urlAxio.hook";
import axios, { AxiosResponse } from "axios";
import useNotificacion from "../../hooks/notificaciones.hook";

export default function TabProductos() {
  const [openModalProducto, setOpenModalProducto] = useState<boolean>(false);
  const [modoModalProducto, setModoModalProducto] = useState<"consulta" | "registrar" | "editar">(
    "consulta"
  );
  const [openModalDarBajaProducto, setOpenModalDarBajaProducto] = useState<boolean>(false);
  const [productos, setProductos] = useState<ProductoInterface[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<ProductoInterface>({
    id: 0,
    nombre: "",
    descripcion: "",
    tipo: 0,
    precio: 0,
    habilitado: false,
  });

  const { getUrlAxio } = useUrlAxio();
  const { MostrarNotificacion } = useNotificacion();

  const getProductos = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImRhdGFWYWx1ZXMiOnsiaWQiOjIsInVzZXIiOiJGZWtpc28iLCJwYXNzIjoiJDJhJDA4JDlQV0l0dzZkRHVzY0czY3BUM3FnbS5UeWp4c1ZoS0RqVE13dWZHWGxVTkhTWjkzTUhsVnVHIiwibm9tYnJlIjoiRmVkZXJpY28gRW1tYW51ZWwiLCJhcGVsbGlkbyI6IkNlamFzIiwibnJvRG9jdW1lbnRvIjoiNDMyOTg0MjAiLCJyb2wiOjEsImVzdGFkbyI6MSwidGVsZWZvbm8iOiIzNTI1NjEwNjU3IiwiZW1haWwiOiJmY2VqYXM0ODRAZ21haWwuY29tIiwiZmVjaGFfY3JlYWNpb24iOiIyMDIzLTEwLTE5VDAyOjAzOjQ4LjAwMFoiLCJmZWNoYV9hY3R1YWxpemFjaW9uIjoiMjAyMy0xMC0xOVQwMjowMzo0OC4wMDBaIn0sIl9wcmV2aW91c0RhdGFWYWx1ZXMiOnsiaWQiOjIsInVzZXIiOiJGZWtpc28iLCJwYXNzIjoiJDJhJDA4JDlQV0l0dzZkRHVzY0czY3BUM3FnbS5UeWp4c1ZoS0RqVE13dWZHWGxVTkhTWjkzTUhsVnVHIiwibm9tYnJlIjoiRmVkZXJpY28gRW1tYW51ZWwiLCJhcGVsbGlkbyI6IkNlamFzIiwibnJvRG9jdW1lbnRvIjoiNDMyOTg0MjAiLCJyb2wiOjEsImVzdGFkbyI6MSwidGVsZWZvbm8iOiIzNTI1NjEwNjU3IiwiZW1haWwiOiJmY2VqYXM0ODRAZ21haWwuY29tIiwiZmVjaGFfY3JlYWNpb24iOiIyMDIzLTEwLTE5VDAyOjAzOjQ4LjAwMFoiLCJmZWNoYV9hY3R1YWxpemFjaW9uIjoiMjAyMy0xMC0xOVQwMjowMzo0OC4wMDBaIn0sInVuaXFubyI6MSwiX2NoYW5nZWQiOnt9LCJfb3B0aW9ucyI6eyJpc05ld1JlY29yZCI6ZmFsc2UsIl9zY2hlbWEiOm51bGwsIl9zY2hlbWFEZWxpbWl0ZXIiOiIiLCJyYXciOnRydWUsImF0dHJpYnV0ZXMiOlsiaWQiLCJ1c2VyIiwicGFzcyIsIm5vbWJyZSIsImFwZWxsaWRvIiwibnJvRG9jdW1lbnRvIiwicm9sIiwiZXN0YWRvIiwidGVsZWZvbm8iLCJlbWFpbCIsImZlY2hhX2NyZWFjaW9uIiwiZmVjaGFfYWN0dWFsaXphY2lvbiJdfSwiaXNOZXdSZWNvcmQiOmZhbHNlfSwiaWF0IjoxNjk3NjgxMDQ1LCJleHAiOjE2OTc3MDk4NDV9.vCM1ofUJ_ZCYyO_vGMb5HpMCt7ismmfNvV-Jdyn8JDw`,
        },
      };
      let response: AxiosResponse = await axios.get(`${getUrlAxio()}Producto`, config);

      if (response.data.length !== 0) {
        let productosResponse: ProductoInterface[] = [];
        response.data.forEach((producto: any) => {
          productosResponse.push({ ...producto });
        });
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

  useEffect(() => {
    getProductos();
  }, []);

  const handleClickRegistrarProducto = () => {
    setOpenModalProducto(true);
    setModoModalProducto("registrar");
  };

  const handleClickEditarProducto = (producto: ProductoInterface) => {
    setOpenModalProducto(true);
    setModoModalProducto("editar");
    setProductoSeleccionado(producto);
  };

  const handleClickDarBajaProducto = (producto: ProductoInterface) => {
    setOpenModalDarBajaProducto(true);
    setProductoSeleccionado(producto);
  };

  const renderProductos = (): JSX.Element[] => {
    return productos.map((producto) => (
      <tr key={producto.id}>
        <td>{producto.nombre}</td>
        <td>{producto.TipoProducto?.nombre}</td>
        <td>{producto.precio}</td>
        <td>{producto.habilitado ? "Habilitado" : "Inhabilitado"}</td>
        <td style={{ alignContent: "space-between" }}>
          <Stack direction="row" alignContent="space-around" alignItems="center">
            <Button
              variant="plain"
              onClick={() => handleClickEditarProducto(producto)}
              sx={{ p: "8px" }}
            >
              <Edit />
            </Button>
            <Button
              variant="plain"
              onClick={() => handleClickDarBajaProducto(producto)}
              sx={{ p: "8px" }}
            >
              <NoFood />
            </Button>
          </Stack>
        </td>
      </tr>
    ));
  };

  return (
    <Container direction="column" justifyContent="space-evenly" alignItems="center">
      <Row xs={12}>
        <Column xs={12}>
          <Button onClick={handleClickRegistrarProducto}>
            <Add /> Registrar nuevo producto
          </Button>
        </Column>
      </Row>
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
              <th>Tipo</th>
              <th>Precio</th>
              <th>Estado</th>
              <th style={{ width: "var(--Table-lastColumnWidth)" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>{renderProductos()}</tbody>
        </Table>
      </Row>
      <ModalFormProductos
        open={openModalProducto}
        setOpen={setOpenModalProducto}
        productoSeleccionado={productoSeleccionado}
        modo={modoModalProducto}
      />
      <ModalDarBaja
        titulo="Dar de baja producto"
        texto="Esta seguro que desea dar de baja el producto seleccionado?"
        open={openModalDarBajaProducto}
        setOpen={setOpenModalDarBajaProducto}
        handleClickConfirmar={console.log}
      />
    </Container>
  );
}
