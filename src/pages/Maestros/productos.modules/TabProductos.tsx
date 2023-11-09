import React, { useEffect, useState } from "react";

import { Button, Stack, Typography } from "@mui/joy";
import { Edit, Fastfood, NoFood } from "@mui/icons-material";
import { Container } from "../../../components/GridComponents";
import ModalFormProductos from "./ModalFormProductos";
import ModalDarBaja from "../../../components/FeedbackComponents/ModalDarBaja";
import { ProductoInterface } from "../../../interfaces/producto.interface";
import useUrlAxio from "../../../hooks/urlAxio.hook";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { NotificacionInterface } from "../../../hooks/notificaciones.hook";
import useSesion from "../../../hooks/usuarioLogueado.hook";
import createExtendedInterfaceForTables from "../../../utils/Interfaces.util";
import { BodyRow, CustomTable, HeadCell } from "../../../components/CustomTable";

interface ContainerProps {
  MostrarNotificacion: (Notificacion: NotificacionInterface) => void;
}

const TabProductos: React.FC<ContainerProps> = ({ MostrarNotificacion }) => {
  const [openModalProducto, setOpenModalProducto] = useState<boolean>(false);
  const [modoModalProducto, setModoModalProducto] = useState<
    "consulta" | "registrar" | "editar" | "cerrado"
  >("cerrado");
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

  const { getSesion } = useSesion();
  const { getUrlAxio } = useUrlAxio();

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

  const enableDisableProducto = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${getSesion().token}`,
      },
    };
    try {
      const response = await axios.put(
        `${getUrlAxio()}Producto`,
        {
          id: productoSeleccionado.id,
          habilitado: !productoSeleccionado.habilitado,
        },
        config
      );
      MostrarNotificacion({
        mostrar: true,
        mensaje: `Producto ${
          !productoSeleccionado.habilitado ? "dado de baja" : "dado de alta"
        } exitosamente`,
        color: "verde",
      });
      await getProductos();
    } catch (e: any) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Error: No se modifico el producto",
        color: "rojo",
      });
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  useEffect(() => {
    if (modoModalProducto !== "cerrado" && !openModalDarBajaProducto && !openModalProducto) {
      getProductos();
      setModoModalProducto("cerrado");
    }
  }, [openModalDarBajaProducto, openModalProducto, modoModalProducto]);

  const handleClickRegistrarProducto = () => {
    setOpenModalProducto(true);
    setModoModalProducto("registrar");
    setProductoSeleccionado({
      id: 0,
      nombre: "",
      descripcion: "",
      tipo: 0,
      precio: 0,
      habilitado: false,
    });
  };
  const handleClickConsultarProducto = (producto: ProductoInterface) => {
    setOpenModalProducto(true);
    setModoModalProducto("consulta");
    setProductoSeleccionado(producto);
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
        <td onDoubleClick={() => handleClickConsultarProducto(producto)}>
          {producto.TipoProducto?.nombre}
        </td>
        <td onDoubleClick={() => handleClickConsultarProducto(producto)}>{producto.precio}</td>
        <td onDoubleClick={() => handleClickConsultarProducto(producto)}>
          {producto.habilitado ? "Habilitado" : "Inhabilitado"}
        </td>
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
              {producto.habilitado ? <Fastfood /> : <NoFood />}
            </Button>
          </Stack>
        </td>
      </tr>
    ));
  };

  const renderTableProductos = (): JSX.Element => {
    type ProductoTableInterface = ReturnType<
      typeof createExtendedInterfaceForTables<ProductoInterface>
    >;
    let cabecera: HeadCell<ProductoTableInterface>[] = [
      { id: "nombre", label: "Nombre", numeric: false, ordenable: true },
      { id: "tipo", label: "Tipo Producto", numeric: false, ordenable: true },
      { id: "precio", label: "Precio", numeric: true, ordenable: true },
      { id: "habilitado", label: "Habilitado", numeric: false, ordenable: true },
      { id: "acciones", label: "Acciones", numeric: false, ordenable: false },
    ];
    const filas: BodyRow<ProductoTableInterface>[] = [];
    productos.forEach((producto) => {
      const rowId = `row-${producto.id}`;
      filas.push({
        id: rowId,
        row: [
          {
            id: "nombre",
            numeric: false,
            value: producto.nombre,
            render: <Typography>{producto.nombre}</Typography>,
          },
          {
            id: "tipo",
            numeric: false,
            //@ts-ignore
            value: producto.TipoProducto?.nombre,
            render: <Typography>{producto.TipoProducto?.nombre}</Typography>,
          },
          {
            id: "precio",
            numeric: true,
            value: producto.precio,
            render: <Typography>{producto.precio}</Typography>,
          },
          {
            id: "habilitado",
            numeric: false,
            value: producto.habilitado,
            render: <Typography>{producto.habilitado ? "Habilitado" : "Inhabilitado"}</Typography>,
          },
          {
            id: "acciones",
            numeric: false,
            value: null,
            render: (
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
                  {producto.habilitado ? <Fastfood /> : <NoFood />}
                </Button>
              </Stack>
            ),
          },
        ],
        rowProps: { onDoubleClick: () => handleClickConsultarProducto(producto) },
      });
    });

    return (
      <CustomTable<ProductoTableInterface>
        data={filas}
        headCells={cabecera}
        showCheckbox={false}
        visibleColumns={new Set(["nombre", "tipo", "precio", "habilitado", "acciones"])}
        labelAgregar="Agregar producto"
        handleClickRegistrar={handleClickRegistrarProducto}
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
    <Container direction="column" justifyContent="space-evenly" alignItems="center">
      {/* <Row
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
          <tbody>
            <tr>
              <td colSpan={5} style={{ paddingInline: 0, paddingBlock: "5px" }}>
                <Row xs={12} sx={{ margin: 0, padding: 0 }}>
                  <Column xs={12} sx={{ margin: 0, padding: 0 }}>
                    <Button onClick={handleClickRegistrarProducto} sx={{ margin: 0, padding: 0 }}>
                      <Add /> Registrar nuevo producto
                    </Button>
                  </Column>
                </Row>
              </td>
            </tr>
            {renderProductos()}
          </tbody>
        </Table>
      </Row> */}
      {renderTableProductos()}
      <ModalFormProductos
        open={openModalProducto}
        setOpen={setOpenModalProducto}
        productoSeleccionado={productoSeleccionado}
        modo={modoModalProducto}
        MostrarNotificacion={MostrarNotificacion}
      />
      <ModalDarBaja
        titulo={`${productoSeleccionado.habilitado ? "Dar de baja" : "Dar de alta"} producto`}
        texto={`Esta seguro que desea ${
          productoSeleccionado.habilitado ? "dar de baja" : "dar de alta"
        } el producto seleccionado?`}
        colorBotonNo="neutral"
        colorBotonSi="warning"
        textoBotonNo="Cancelar"
        textoBotonSi={productoSeleccionado.habilitado ? "Dar de baja" : "Dar de alta"}
        open={openModalDarBajaProducto}
        setOpen={setOpenModalDarBajaProducto}
        handleClickConfirmar={enableDisableProducto}
      />
    </Container>
  );
};

export default TabProductos;
