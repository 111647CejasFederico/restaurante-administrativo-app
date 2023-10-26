import React, { useEffect, useState } from "react";
import { PromocionInterface } from "../../interfaces/promocion.interface";
import useUrlAxio from "../../hooks/urlAxio.hook";
import useSesion from "../../hooks/usuarioLogueado.hook";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
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
import { NotificacionInterface } from "../../hooks/notificaciones.hook";
import { TipoEstadoPromocionInterface } from "../../interfaces/tipo.interface";
import dayjs from "dayjs";
interface ContainerProps {
  modo?: "consulta" | "registrar" | "editar" | "cerrado";
  promocionSeleccionada?: PromocionInterface;
  open: boolean;
  setOpen: (open: boolean) => void;
  MostrarNotificacion: (Notificacion: NotificacionInterface) => void;
}

const ModalFormPromociones: React.FC<ContainerProps> = ({
  modo = "consulta",
  open,
  setOpen,
  promocionSeleccionada,
  MostrarNotificacion,
}) => {
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
  const [estadosPromocion, setEstadosPromocioPromocion] = useState<TipoEstadoPromocionInterface[]>(
    []
  );
  const { getUrlAxio } = useUrlAxio();
  const { getSesion } = useSesion();

  const getEstadosPromocion = async () => {
    try {
      const config: AxiosRequestConfig = {
        // params: { },
        headers: {
          Authorization: `Bearer ${getSesion().token}`,
        },
      };
      let response: AxiosResponse = await axios.get(`${getUrlAxio()}tipoEstadoPromocion`, config);

      if (response.data.length !== 0) {
        let estadosPromocionResponse: TipoEstadoPromocionInterface[] = [];
        response.data.forEach((estado: any) => {
          estadosPromocionResponse.push({ ...estado });
        });
        setEstadosPromocioPromocion(estadosPromocionResponse);
      } else {
        MostrarNotificacion({
          mostrar: true,
          mensaje: "No se encontraron estados de usuario",
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

  const CargarFormulario = async () => {
    await getEstadosPromocion();
    if (promocionSeleccionada && open) {
      setPromocion({ ...promocionSeleccionada });
    }
    if (!open)
      setPromocion({
        id: 0,
        nombre: "",
        descripcion: "",
        precio: 0,
        fechaInicio: dayjs().format("MM/DD/YYYY"),
        fechaFin: dayjs().format("MM/DD/YYYY"),
        horaInicio: "00:00",
        horaFin: "00:00",
        validoLunes: false,
        validoMartes: false,
        validoMiercoles: false,
        validoJueves: false,
        validoViernes: false,
        validoSabado: false,
        validoDomingo: false,
        estado: 0,
      });
  };

  useEffect(() => {
    CargarFormulario();
  }, [promocionSeleccionada, open]);

  const postPromocion = async () => {
    let config = {
      headers: { Authorization: `Bearer ${getSesion().token}` },
    };
    try {
      const response = await axios.post(
        `${getUrlAxio()}Promocion`,
        {
          nombre: promocion.nombre,
          descripcion: promocion.descripcion,
          precio: typeof Number(promocion.precio) === "number" ? promocion.precio : null,
          fechaInicio: promocion.fechaInicio,
          fechaFin: promocion.fechaFin,
          horaInicio: promocion.horaInicio,
          horaFin: promocion.horaFin,
          validoLunes: promocion.validoLunes,
          validoMartes: promocion.validoMartes,
          validoMiercoles: promocion.validoMiercoles,
          validoJueves: promocion.validoJueves,
          validoViernes: promocion.validoViernes,
          validoSabado: promocion.validoSabado,
          validoDomingo: promocion.validoDomingo,
          estado: promocion.estado,
        },
        config
      );
      MostrarNotificacion({ mostrar: true, mensaje: "Nueva promocion registrada", color: "verde" });
      setOpen(false);
    } catch (e: any) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Error: No se pudo registrar la promocion",
        color: "rojo",
      });
    }
  };

  const putPromocion = async () => {
    let config = {
      headers: { Authorization: `Bearer ${getSesion().token}` },
    };
    try {
      const response = await axios.put(
        `${getUrlAxio()}Promocion`,
        {
          id: promocion.id,
          nombre: promocion.nombre,
          descripcion: promocion.descripcion,
          precio: promocion.precio,
          fechaInicio: promocion.fechaInicio,
          fechaFin: promocion.fechaFin,
          horaInicio: promocion.horaInicio,
          horaFin: promocion.horaFin,
          validoLunes: promocion.validoLunes,
          validoMartes: promocion.validoMartes,
          validoMiercoles: promocion.validoMiercoles,
          validoJueves: promocion.validoJueves,
          validoViernes: promocion.validoViernes,
          validoSabado: promocion.validoSabado,
          validoDomingo: promocion.validoDomingo,
          estado: promocion.estado,
        },
        config
      );
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Promocion modificada exitosamente",
        color: "verde",
      });
      setOpen(false);
    } catch (e: any) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Error: No se modifico la",
        color: "rojo",
      });
    }
  };

  const handleChangeInput = (prop: keyof PromocionInterface, value: any) => {
    setPromocion((prevPromocion) => ({
      ...prevPromocion,
      [prop]: value,
    }));
  };

  const handleClickSubmit = async () => {
    console.log(promocion);
    if (modo === "editar") {
      await putPromocion();
    }
    if (modo === "registrar") {
      await postPromocion();
    }
  };

  const renderEstados = (): JSX.Element[] => {
    return estadosPromocion.map((estado) => (
      <Option value={estado.id} key={estado.id}>
        {estado.nombre}
      </Option>
    ));
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
          <Container display="flex" justifyContent="space-between" alignItems="center">
            <Row xs={12}>
              <Column xs={12} md={6}>
                <Row xs={12}>
                  <Column xs={12} sx={{ p: "5px" }}>
                    <FormControl disabled={modo === "consulta"}>
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
                    <FormControl disabled={modo === "consulta"}>
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
                    <FormControl disabled={modo === "consulta"}>
                      <FormLabel>Estado</FormLabel>
                      <Select
                        size="sm"
                        required
                        value={promocion.estado}
                        onChange={(e, value) => handleChangeInput("estado", value)}
                      >
                        {renderEstados()}
                      </Select>
                    </FormControl>
                  </Column>
                </Row>
                <Row xs={12}>
                  <Column xs={12} sx={{ p: "5px" }}>
                    <FormControl disabled={modo === "consulta"}>
                      <FormLabel>Precio</FormLabel>
                      <Input
                        size="sm"
                        placeholder="Precio"
                        type="number"
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
                    <FormControl disabled={modo === "consulta"}>
                      <FormLabel>Fecha inicio (MM/DD/YYYY)</FormLabel>
                      <Input
                        size="sm"
                        required
                        placeholder="Fecha desde"
                        type="date"
                        value={promocion.fechaInicio}
                        onChange={(e) => handleChangeInput("fechaInicio", e.target.value)}
                      />
                    </FormControl>
                  </Column>
                  <Column xs={12} md={6} sx={{ p: "5px" }}>
                    <FormControl disabled={modo === "consulta"}>
                      <FormLabel>Fecha Fin (MM/DD/YYYY)</FormLabel>
                      <Input
                        size="sm"
                        required
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
                    <FormControl disabled={modo === "consulta"}>
                      <FormLabel>Fecha inicio (HH:MM AM/PM)</FormLabel>
                      <Input
                        size="sm"
                        required
                        placeholder="Hora desde"
                        type="time"
                        value={promocion.horaInicio}
                        onChange={(e) => handleChangeInput("horaInicio", e.target.value)}
                      />
                    </FormControl>
                  </Column>
                  <Column xs={12} md={6} sx={{ p: "5px" }}>
                    <FormControl disabled={modo === "consulta"}>
                      <FormLabel>Fecha Fin (HH:MM AM/PM)</FormLabel>
                      <Input
                        size="sm"
                        required
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
                            Lun
                          </ListItemContent>
                          <Switch
                            disabled={modo === "consulta"}
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
                            Mar
                          </ListItemContent>
                          <Switch
                            disabled={modo === "consulta"}
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
                            Mie
                          </ListItemContent>
                          <Switch
                            disabled={modo === "consulta"}
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
                            Jue
                          </ListItemContent>
                          <Switch
                            disabled={modo === "consulta"}
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
                            Vie
                          </ListItemContent>
                          <Switch
                            disabled={modo === "consulta"}
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
                            Sab
                          </ListItemContent>
                          <Switch
                            disabled={modo === "consulta"}
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
                            Dom
                          </ListItemContent>
                          <Switch
                            disabled={modo === "consulta"}
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
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default ModalFormPromociones;
