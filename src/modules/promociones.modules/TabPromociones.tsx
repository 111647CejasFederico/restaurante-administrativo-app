import { useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { Button, Stack, Table } from "@mui/joy";
import { Add, Edit, NoMeals } from "@mui/icons-material";
import { Column, Container, Row } from "../../components/GridComponents";
import ModalFormPromociones from "./ModalFormPromociones";
import ModalDarBaja from "../../components/FeedbackComponents/ModalDarBaja";

export default function TabPromociones() {
  const [openModalPromocion, setOpenModalPromocion] = useState<boolean>(false);
  const [modoModalPromocion, setModoModalPromocion] = useState<"consulta" | "registrar" | "editar">(
    "consulta"
  );
  const [openModalDarBajaPromocion, setOpenModalDarBajaPromocion] = useState<boolean>(false);

  const handleClickRegistrarPromocion = () => {
    setOpenModalPromocion(true);
    setModoModalPromocion("registrar");
  };

  const handleClickEditarPromocion = () => {
    setOpenModalPromocion(true);
    setModoModalPromocion("editar");
  };
  return (
    <Container direction="column" justifyContent="space-evenly" alignItems="center">
      <Row xs={12}>
        <Column xs={12}>
          <Button onClick={handleClickRegistrarPromocion}>
            <Add /> Registrar nueva promocion
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
              <th>Perido validez</th>
              <th>Horario validez</th>
              <th>Estado</th>
              <th style={{ width: "var(--Table-lastColumnWidth)" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td style={{ alignContent: "space-between" }}>
                <Stack direction="row" alignContent="space-around" alignItems="center">
                  <Button variant="plain" onClick={handleClickEditarPromocion} sx={{ p: "8px" }}>
                    <Edit />
                  </Button>
                  <Button
                    variant="plain"
                    onClick={() => setOpenModalDarBajaPromocion(true)}
                    sx={{ p: "8px" }}
                  >
                    <NoMeals />
                  </Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <Stack direction="row" alignContent="space-around" alignItems="center">
                  <Button variant="plain" onClick={handleClickEditarPromocion} sx={{ p: "8px" }}>
                    <Edit />
                  </Button>
                  <Button
                    variant="plain"
                    onClick={() => setOpenModalDarBajaPromocion(true)}
                    sx={{ p: "8px" }}
                  >
                    <NoMeals />
                  </Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <Stack direction="row" alignContent="space-around" alignItems="center">
                  <Button variant="plain" onClick={handleClickEditarPromocion} sx={{ p: "8px" }}>
                    <Edit />
                  </Button>
                  <Button
                    variant="plain"
                    onClick={() => setOpenModalDarBajaPromocion(true)}
                    sx={{ p: "8px" }}
                  >
                    <NoMeals />
                  </Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <Stack direction="row" alignContent="space-around" alignItems="center">
                  <Button variant="plain" onClick={handleClickEditarPromocion} sx={{ p: "8px" }}>
                    <Edit />
                  </Button>
                  <Button
                    variant="plain"
                    onClick={() => setOpenModalDarBajaPromocion(true)}
                    sx={{ p: "8px" }}
                  >
                    <NoMeals />
                  </Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <Stack direction="row" alignContent="space-around" alignItems="center">
                  <Button variant="plain" onClick={handleClickEditarPromocion} sx={{ p: "8px" }}>
                    <Edit />
                  </Button>
                  <Button
                    variant="plain"
                    onClick={() => setOpenModalDarBajaPromocion(true)}
                    sx={{ p: "8px" }}
                  >
                    <NoMeals />
                  </Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <Stack direction="row" alignContent="space-around" alignItems="center">
                  <Button variant="plain" onClick={handleClickEditarPromocion} sx={{ p: "8px" }}>
                    <Edit />
                  </Button>
                  <Button
                    variant="plain"
                    onClick={() => setOpenModalDarBajaPromocion(true)}
                    sx={{ p: "8px" }}
                  >
                    <NoMeals />
                  </Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <Stack direction="row" alignContent="space-around" alignItems="center">
                  <Button variant="plain" onClick={handleClickEditarPromocion} sx={{ p: "8px" }}>
                    <Edit />
                  </Button>
                  <Button
                    variant="plain"
                    onClick={() => setOpenModalDarBajaPromocion(true)}
                    sx={{ p: "8px" }}
                  >
                    <NoMeals />
                  </Button>
                </Stack>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <ModalFormPromociones
        open={openModalPromocion}
        setOpen={setOpenModalPromocion}
        modo={modoModalPromocion}
      />
      <ModalDarBaja
        titulo="Dar de baja promocion"
        texto="Esta seguro que desea dar de baja el promocion seleccionado?"
        open={openModalDarBajaPromocion}
        setOpen={setOpenModalDarBajaPromocion}
        handleClickConfirmar={console.log}
      />
    </Container>
  );
}
