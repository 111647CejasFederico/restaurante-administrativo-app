import React, { useEffect, useState } from "react";
import { PromocionInterface } from "../../interfaces/promocion.interface";
import useUrlAxio from "../../hooks/urlAxio.hook";
import useSesion from "../../hooks/usuarioLogueado.hook";
import axios from "axios";
import {
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  List,
  ListDivider,
  ListItem,
  ListItemContent,
  Modal,
  ModalDialog,
  Option,
  Select,
  Sheet,
  Switch,
  Table,
  Textarea,
  Typography,
} from "@mui/joy";
import { Column, Container, Row } from "../../components/GridComponents";
import { Add, Backspace, Edit } from "@mui/icons-material";
interface ContainerProps {
  modo?: "consulta" | "registrar" | "editar";
  promocionSeleccionada?: PromocionInterface;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalFormPromociones: React.FC<ContainerProps> = ({
  modo = "consulta",
  open,
  setOpen,
  promocionSeleccionada,
}) => {
  const [blnVerPassword, setBlnVerPassword] = useState(false);
  const [promocion, setPromocion] = useState<PromocionInterface>({
    id: 0,
    nombre: "",
    descripcion: "",
    precio: 0,
    fechaInicio: "",
    fechaFin: "",
    horaInicio: "",
    horaFin: "",
    validoLunes: false,
    validoMartes: false,
    validoMiercoles: false,
    validoJueves: false,
    validoViernes: false,
    validoSabado: false,
    validoDomingo: false,
    estado: 0,
  });
  const { getUrlAxio } = useUrlAxio();
  const { getSesion } = useSesion();

  const getRoles = async () => {
    let config = {
      headers: { Authorization: `Bearer ${getSesion().token}` },
    };
    try {
      const response = await axios.get(`${getUrlAxio()}/Roles`, config);
    } catch (e: any) {}
  };
  const getEstadosUsuario = async () => {
    let config = {
      headers: { Authorization: `Bearer ${getSesion().token}` },
    };
    try {
      const response = await axios.get(`${getUrlAxio()}/Roles`, config);
      console.log("Estados usuarios buscados");
    } catch (e: any) {}
  };

  useEffect(() => {
    if (promocionSeleccionada && open) {
      setPromocion(promocionSeleccionada);
    }
    if (!open)
      setPromocion({
        id: 0,
        nombre: "",
        descripcion: "",
        precio: 0,
        fechaInicio: "",
        fechaFin: "",
        horaInicio: "",
        horaFin: "",
        validoLunes: false,
        validoMartes: false,
        validoMiercoles: false,
        validoJueves: false,
        validoViernes: false,
        validoSabado: false,
        validoDomingo: false,
        estado: 0,
      });
  }, [promocionSeleccionada, open]);

  const postPromocion = async () => {
    let config = {
      headers: { Authorization: `Bearer ${getSesion().token}` },
    };
    try {
      const response = await axios.post(`${getUrlAxio()}/Promocion`, { promocion }, config);
      console.log("objeto creado");
    } catch (e: any) {}
  };

  const putPromocion = async () => {
    let config = {
      headers: { Authorization: `Bearer ${getSesion().token}` },
    };
    try {
      const response = await axios.put(`${getUrlAxio()}/Promocion`, { promocion }, config);
      console.log("objeto editado");
    } catch (e: any) {}
  };

  const handleChangeVisibilityOfPassword = () => {
    setBlnVerPassword(!blnVerPassword);
  };

  const handleChangeInput = (prop: keyof PromocionInterface, value: any) => {
    setPromocion((prevPromocion) => ({
      ...prevPromocion,
      [prop]: value,
    }));
  };

  const handleClickSubmit = async () => {
    console.log(promocion);
    // if (modo === "editar") {
    //   await EditarUsuario();
    // }
    // if (modo === "registrar") {
    //   await RegistrarUsuario();
    // }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog size="lg">
        <DialogTitle>
          {modo === "editar"
            ? "Editando promocion"
            : modo === "registrar"
            ? "Registrando promocion"
            : "Informacion de promocion"}
        </DialogTitle>
        <DialogContent>
          {modo === "consulta" ? (
            <Container display="flex" justifyContent="space-between" alignItems="center">
              <Row xs={12}>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Typography>{promocion.nombre}</Typography>
                  </FormControl>
                </Column>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Desc</FormLabel>
                    <Typography>{promocion.descripcion}</Typography>
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
                          value={promocion.nombre}
                          onChange={(e) => handleChangeInput("nombre", e.target.value)}
                        />
                      </FormControl>
                    </Column>
                  </Row>
                  <Row xs={12}>
                    <Column xs={12} sx={{ p: "5px" }}>
                      <FormControl>
                        <FormLabel>Descripcion</FormLabel>
                        <Textarea
                          size="sm"
                          minRows={2.5}
                          placeholder="Descripcion"
                          value={promocion.descripcion}
                          onChange={(e) => handleChangeInput("descripcion", e.target.value)}
                        />
                      </FormControl>
                    </Column>
                  </Row>
                  <Row xs={12}>
                    <Column xs={12} sx={{ p: "5px" }}>
                      <FormControl>
                        <FormLabel>Estado</FormLabel>
                        <Select
                          size="sm"
                          required
                          defaultValue={promocion.estado}
                          onChange={(e, value) => handleChangeInput("estado", value)}
                        >
                          <Option value={0}>Dog</Option>
                          <Option value={1}>Cat</Option>
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
                          value={promocion.precio}
                          onChange={(e) => handleChangeInput("precio", e.target.value)}
                        />
                      </FormControl>
                    </Column>
                  </Row>
                </Column>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormLabel>Periodo validez</FormLabel>
                  <Row xs={12}>
                    <Column xs={12} md={6} sx={{ p: "5px" }}>
                      <FormControl>
                        <Input
                          size="sm"
                          required
                          startDecorator={<Typography>Desde</Typography>}
                          placeholder="Fecha desde"
                          type="date"
                          value={promocion.fechaInicio}
                          onChange={(e) => handleChangeInput("fechaInicio", e.target.value)}
                        />
                      </FormControl>
                    </Column>
                    <Column xs={12} md={6} sx={{ p: "5px" }}>
                      <FormControl>
                        <Input
                          size="sm"
                          required
                          startDecorator={<Typography>Hasta</Typography>}
                          placeholder="Fecha hasta"
                          type="date"
                          value={promocion.fechaFin}
                          onChange={(e) => handleChangeInput("fechaFin", e.target.value)}
                        />
                      </FormControl>
                    </Column>
                  </Row>

                  <FormLabel>Horarios validez</FormLabel>
                  <Row xs={12}>
                    <Column xs={12} md={6} sx={{ p: "5px" }}>
                      <FormControl>
                        <Input
                          size="sm"
                          required
                          startDecorator={<Typography>Desde</Typography>}
                          placeholder="Hora desde"
                          type="time"
                          value={promocion.horaInicio}
                          onChange={(e) => handleChangeInput("horaInicio", e.target.value)}
                        />
                      </FormControl>
                    </Column>
                    <Column xs={12} md={6} sx={{ p: "5px" }}>
                      <FormControl>
                        <Input
                          size="sm"
                          required
                          startDecorator={<Typography>Hasta</Typography>}
                          placeholder="Hora hasta"
                          type="time"
                          value={promocion.horaFin}
                          onChange={(e) => handleChangeInput("horaFin", e.target.value)}
                        />
                      </FormControl>
                    </Column>
                  </Row>
                  <Row
                    container
                    xs={12}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Column xs={12} sx={{ p: "5px" }}>
                      <FormLabel>Dias validos</FormLabel>
                      <Row xs={12}>
                        <Column xs={12} md={6} sx={{ p: "5px" }}>
                          <ListItem>
                            <ListItemContent htmlFor="validezLunes" component="label">
                              Lunes
                            </ListItemContent>
                            <Switch
                              id="validezLunes"
                              size="lg"
                              sx={{ ml: "15px" }}
                              color={promocion.validoLunes ? "success" : "neutral"}
                              checked={promocion.validoLunes}
                              onChange={({ target }) =>
                                handleChangeInput("validoLunes", target.checked)
                              }
                            />
                          </ListItem>
                        </Column>
                        <Column xs={12} md={6} sx={{ p: "5px" }}>
                          <ListItem>
                            <ListItemContent htmlFor="validezMartes" component="label">
                              Martes
                            </ListItemContent>
                            <Switch
                              id="validezMartes"
                              size="lg"
                              sx={{ ml: "15px" }}
                              color={promocion.validoMartes ? "success" : "neutral"}
                              checked={promocion.validoMartes}
                              onChange={({ target }) =>
                                handleChangeInput("validoMartes", target.checked)
                              }
                            />
                          </ListItem>
                        </Column>
                        <Column xs={12} md={6} sx={{ p: "5px" }}>
                          <ListItem>
                            <ListItemContent htmlFor="validezLunes" component="label">
                              Miercoles
                            </ListItemContent>
                            <Switch
                              id="validezMiercoles"
                              size="lg"
                              sx={{ ml: "15px" }}
                              color={promocion.validoMiercoles ? "success" : "neutral"}
                              checked={promocion.validoMiercoles}
                              onChange={({ target }) =>
                                handleChangeInput("validoMiercoles", target.checked)
                              }
                            />
                          </ListItem>
                        </Column>
                        <Column xs={12} md={6} sx={{ p: "5px" }}>
                          <ListItem>
                            <ListItemContent htmlFor="validezJueves" component="label">
                              Jueves
                            </ListItemContent>
                            <Switch
                              id="validezJueves"
                              size="lg"
                              sx={{ ml: "15px" }}
                              color={promocion.validoJueves ? "success" : "neutral"}
                              checked={promocion.validoJueves}
                              onChange={({ target }) =>
                                handleChangeInput("validoJueves", target.checked)
                              }
                            />
                          </ListItem>
                        </Column>
                        <Column xs={12} md={6} sx={{ p: "5px" }}>
                          <ListItem>
                            <ListItemContent htmlFor="validezViernes" component="label">
                              Viernes
                            </ListItemContent>
                            <Switch
                              id="validezViernes"
                              size="lg"
                              sx={{ ml: "15px" }}
                              color={promocion.validoViernes ? "success" : "neutral"}
                              checked={promocion.validoViernes}
                              onChange={({ target }) =>
                                handleChangeInput("validoViernes", target.checked)
                              }
                            />
                          </ListItem>
                        </Column>
                        <Column xs={12} md={6} sx={{ p: "5px" }}>
                          <ListItem>
                            <ListItemContent htmlFor="validezSabado" component="label">
                              Sabado
                            </ListItemContent>
                            <Switch
                              id="validezSabado"
                              size="lg"
                              sx={{ ml: "15px" }}
                              color={promocion.validoSabado ? "success" : "neutral"}
                              checked={promocion.validoSabado}
                              onChange={({ target }) =>
                                handleChangeInput("validoSabado", target.checked)
                              }
                            />
                          </ListItem>
                        </Column>
                        <Column xs={12} md={6} sx={{ p: "5px" }}>
                          <ListItem>
                            <ListItemContent htmlFor="validezDomingo" component="label">
                              Domingo
                            </ListItemContent>
                            <Switch
                              id="validezDomingo"
                              size="lg"
                              sx={{ ml: "15px" }}
                              color={promocion.validoDomingo ? "success" : "neutral"}
                              checked={promocion.validoDomingo}
                              onChange={({ target }) =>
                                handleChangeInput("validoDomingo", target.checked)
                              }
                            />
                          </ListItem>
                        </Column>
                      </Row>
                    </Column>
                  </Row>
                </Column>
              </Row>
              {/* <Row xs={12}>
                <Column xs={12} sx={{ p: "5px" }}>
                  <Row xs={12}>
                    <Column xs={12} sx={{ p: "5px" }}>
                      <Row
                        // variant="outlined"
                        sx={{
                          "--TableCell-height": "5px",
                          // the number is the amount of the header rows.
                          "--TableHeader-height": "calc(1 * var(--TableCell-height))",
                          "--Table-firstColumnWidth": "90px",
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
                          size="md"
                          hoverRow
                          sx={{
                            "& tr > *:first-of-type": {
                              position: "sticky",
                              left: 0,
                              boxShadow: "1px 0 var(--TableCell-borderColor)",
                              bgcolor: "background.surface",
                            },
                          }}
                        >
                          <thead>
                            <tr>
                              <th style={{ width: "var(--Table-firstColumnWidth)" }}>Acciones</th>
                              <th>Producto</th>
                              <th>Cantidad</th>
                              <th>Precio</th>
                              <th>Subimporte</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ alignContent: "space-between" }}>
                                <Row xs={12} alignContent="space-around" alignItems="center">
                                  <Button variant="plain" sx={{ p: "8px" }}>
                                    <Edit />
                                  </Button>
                                  <Button
                                    variant="plain"
                                    // onClick={() => setOpenModalDarBajaPromocion(true)}
                                    sx={{ p: "8px" }}
                                  >
                                    <Backspace />
                                  </Button>
                                </Row>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td style={{ alignContent: "space-between" }}>
                                <Row xs={12} alignContent="space-around" alignItems="center">
                                  <Button variant="plain" sx={{ p: "8px" }}>
                                    <Edit />
                                  </Button>
                                  <Button
                                    variant="plain"
                                    // onClick={() => setOpenModalDarBajaPromocion(true)}
                                    sx={{ p: "8px" }}
                                  >
                                    <Backspace />
                                  </Button>
                                </Row>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td style={{ alignContent: "space-between" }}>
                                <Row xs={12} alignContent="space-around" alignItems="center">
                                  <Button variant="plain" sx={{ p: "8px" }}>
                                    <Edit />
                                  </Button>
                                  <Button
                                    variant="plain"
                                    // onClick={() => setOpenModalDarBajaPromocion(true)}
                                    sx={{ p: "8px" }}
                                  >
                                    <Backspace />
                                  </Button>
                                </Row>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td style={{ alignContent: "space-between" }}>
                                <Row xs={12} alignContent="space-around" alignItems="center">
                                  <Button variant="plain" sx={{ p: "8px" }}>
                                    <Edit />
                                  </Button>
                                  <Button
                                    variant="plain"
                                    // onClick={() => setOpenModalDarBajaPromocion(true)}
                                    sx={{ p: "8px" }}
                                  >
                                    <Backspace />
                                  </Button>
                                </Row>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td style={{ alignContent: "space-between" }}>
                                <Row xs={12} alignContent="space-around" alignItems="center">
                                  <Button variant="plain" sx={{ p: "8px" }}>
                                    <Edit />
                                  </Button>
                                  <Button
                                    variant="plain"
                                    // onClick={() => setOpenModalDarBajaPromocion(true)}
                                    sx={{ p: "8px" }}
                                  >
                                    <Backspace />
                                  </Button>
                                </Row>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </Table>
                      </Row>
                    </Column>
                  </Row>
                  <Row xs={12}>
                    <Column xs={6} sx={{ p: "5px" }}>
                      <Button>
                        <Add /> Agregar producto
                      </Button>
                    </Column>
                    <Column xs={6} sx={{ p: "5px" }}>
                      <Row xs={12}>
                        <Column xs={12} sx={{ p: "5px" }}>
                          <Typography>Sub Importe:</Typography>
                        </Column>
                      </Row>
                      <Row xs={12}>
                        <Column xs={12} sx={{ p: "5px" }}>
                          <FormControl>
                            <Input type="number" startDecorator={<Typography>Porc desc:</Typography>} endDecorator={<Typography>%</Typography>}
                            value={promocion.precio}
                          </FormControl>
                        </Column>
                      </Row>
                      <ListDivider />
                      <Row xs={12}>
                        <Column xs={12} sx={{ p: "5px" }}></Column>
                      </Row>
                    </Column>
                  </Row>
                </Column>
              </Row> */}
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

export default ModalFormPromociones;
