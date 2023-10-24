import { useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { Button, Sheet, Stack, Table } from "@mui/joy";
import { Add, Edit, NoAccounts } from "@mui/icons-material";
import ModalFormUsuarios from "./ModalFormUsuarios";
import ModalDarBaja from "../../components/FeedbackComponents/ModalDarBaja";
import { Column, Container, Row } from "../../components/GridComponents";
import { NotificacionInterface } from "../../hooks/notificaciones.hook";

interface ContainerProps {
  MostrarNotificacion: (Notificacion: NotificacionInterface) => void;
}
const TabUsuarios: React.FC<ContainerProps> = ({ MostrarNotificacion }) => {
  const [openModalUsuario, setOpenModalUsuario] = useState<boolean>(false);
  const [modoModalUsuario, setModoModalUsuario] = useState<"consulta" | "registrar" | "editar">(
    "consulta"
  );
  const [openModalDarBajaUsuario, setOpenModalDarBajaUsuario] = useState<boolean>(false);

  const handleClickRegistrarUsuario = () => {
    setOpenModalUsuario(true);
    setModoModalUsuario("registrar");
  };

  const handleClickEditarUsuario = () => {
    setOpenModalUsuario(true);
    setModoModalUsuario("editar");
  };

  return (
    <Container direction="column" justifyContent="space-evenly" alignItems="center">
      <Row xs={12}>
        <Column xs={12}>
          <Button onClick={handleClickRegistrarUsuario}>
            <Add /> Registrar nuevo usuario
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td style={{ alignContent: "space-between" }}>
                <Stack direction="row" alignContent="space-around" alignItems="center">
                  <Button variant="plain" onClick={handleClickEditarUsuario} sx={{ p: "8px" }}>
                    <Edit />
                  </Button>
                  <Button
                    variant="plain"
                    onClick={() => setOpenModalDarBajaUsuario(true)}
                    sx={{ p: "8px" }}
                  >
                    <NoAccounts />
                  </Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <Stack direction="row" alignContent="space-around" alignItems="center">
                  <Button variant="plain" onClick={handleClickEditarUsuario} sx={{ p: "8px" }}>
                    <Edit />
                  </Button>
                  <Button
                    variant="plain"
                    onClick={() => setOpenModalDarBajaUsuario(true)}
                    sx={{ p: "8px" }}
                  >
                    <NoAccounts />
                  </Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <Stack direction="row" alignContent="space-around" alignItems="center">
                  <Button variant="plain" onClick={handleClickEditarUsuario} sx={{ p: "8px" }}>
                    <Edit />
                  </Button>
                  <Button
                    variant="plain"
                    onClick={() => setOpenModalDarBajaUsuario(true)}
                    sx={{ p: "8px" }}
                  >
                    <NoAccounts />
                  </Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <Stack direction="row" alignContent="space-around" alignItems="center">
                  <Button variant="plain" onClick={handleClickEditarUsuario} sx={{ p: "8px" }}>
                    <Edit />
                  </Button>
                  <Button
                    variant="plain"
                    onClick={() => setOpenModalDarBajaUsuario(true)}
                    sx={{ p: "8px" }}
                  >
                    <NoAccounts />
                  </Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <Stack direction="row" alignContent="space-around" alignItems="center">
                  <Button variant="plain" onClick={handleClickEditarUsuario} sx={{ p: "8px" }}>
                    <Edit />
                  </Button>
                  <Button
                    variant="plain"
                    onClick={() => setOpenModalDarBajaUsuario(true)}
                    sx={{ p: "8px" }}
                  >
                    <NoAccounts />
                  </Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <Stack direction="row" alignContent="space-around" alignItems="center">
                  <Button variant="plain" onClick={handleClickEditarUsuario} sx={{ p: "8px" }}>
                    <Edit />
                  </Button>
                  <Button
                    variant="plain"
                    onClick={() => setOpenModalDarBajaUsuario(true)}
                    sx={{ p: "8px" }}
                  >
                    <NoAccounts />
                  </Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <Stack direction="row" alignContent="space-around" alignItems="center">
                  <Button variant="plain" onClick={handleClickEditarUsuario} sx={{ p: "8px" }}>
                    <Edit />
                  </Button>
                  <Button
                    variant="plain"
                    onClick={() => setOpenModalDarBajaUsuario(true)}
                    sx={{ p: "8px" }}
                  >
                    <NoAccounts />
                  </Button>
                </Stack>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <ModalFormUsuarios
        open={openModalUsuario}
        setOpen={setOpenModalUsuario}
        modo={modoModalUsuario}
      />
      {/* <ModalDarBaja
        titulo="Dar de baja a usuario"
        texto="Esta seguro que desea dar de baja al usuario seleccionado?"
        open={openModalDarBajaUsuario}
        setOpen={setOpenModalDarBajaUsuario}
        handleClickConfirmar={console.log}
      /> */}
      {/* <ModalDarBaja
        titulo={`${productoSeleccionado.habilitado ? "Dar de baja" : "Dar de alta"} usuario`}
        texto={`Esta seguro que desea ${
          productoSeleccionado.habilitado ? "dar de baja" : "dar de alta"
        } al usuario seleccionado?`}
        colorBotonNo="neutral"
        colorBotonSi={productoSeleccionado.habilitado ? "danger" : "warning"}
        textoBotonNo="Cancelar"
        textoBotonSi={productoSeleccionado.habilitado ? "Dar de baja" : "Dar de alta"}
        open={openModalDarBajaProducto}
        setOpen={setOpenModalDarBajaProducto}
        handleClickConfirmar={enableDisableProducto}
      /> */}
    </Container>
  );
};

export default TabUsuarios;
