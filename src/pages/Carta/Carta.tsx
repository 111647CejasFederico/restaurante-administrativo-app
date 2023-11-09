import { Tab, TabList, TabPanel, Tabs, tabClasses } from "@mui/joy";
import { useState, useEffect } from "react";
import CustomToast from "../../components/CustomToast/CustomToast";
import { useNotificacion } from "../../hooks/notificaciones.hook";

const Carta = () => {
  const { Notificacion, MostrarNotificacion, OcultarNotificacion } = useNotificacion();
  return (
    <Tabs
      orientation="vertical"
      aria-label="Carta tabs"
      sx={{ bgcolor: "transparent" }}
      defaultValue={0}
    >
      <TabList
        disableUnderline
        sx={{
          p: 0.5,
          gap: 0.5,
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            boxShadow: "sm",
            bgcolor: "background.surface",
          },
        }}
      >
        <Tab>Productos</Tab>
      </TabList>
      <TabPanel value={0}>
        <Container display="flex" justifyContent="space-between" alignItems="center">
          <Row xs={12}>
            <Column xs={12} md={6}>
              <Row xs={12}>
                <Column xs={12} sx={{ p: "5px" }}>
                  <FormControl
                    disabled={modo === "consulta"}
                    required
                    error={promocionError.nombre}
                  >
                    <FormLabel>Nombre</FormLabel>
                    <Input
                      size="sm"
                      placeholder="Nombre"
                      value={promocion.nombre}
                      onChange={(e) => handleChangeInput("nombre", e.target.value)}
                    />
                    {promocionError.nombre && (
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
                  <FormControl
                    disabled={modo === "consulta"}
                    required
                    error={promocionError.estado}
                  >
                    <FormLabel>Estado</FormLabel>
                    <Select
                      size="sm"
                      value={promocion.estado}
                      onChange={(e, value) => handleChangeInput("estado", value)}
                    >
                      {renderEstados()}
                    </Select>
                    {promocionError.estado && (
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
                  <FormControl disabled={modo === "consulta"} error={promocionError.fechaInicio}>
                    <FormLabel>Fecha inicio (MM/DD/YYYY)</FormLabel>
                    <Input
                      size="sm"
                      placeholder="Fecha desde"
                      type="date"
                      value={promocion.fechaInicio}
                      onChange={(e) => handleChangeInput("fechaInicio", e.target.value)}
                    />
                    {promocionError.fechaInicio && (
                      <FormHelperText>
                        <InfoOutlined />
                        Fecha invalida
                      </FormHelperText>
                    )}
                  </FormControl>
                </Column>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl disabled={modo === "consulta"} error={promocionError.fechaFin}>
                    <FormLabel>Fecha Fin (MM/DD/YYYY)</FormLabel>
                    <Input
                      size="sm"
                      placeholder="Fecha hasta"
                      type="date"
                      value={promocion.fechaFin}
                      onChange={(e) => handleChangeInput("fechaFin", e.target.value)}
                    />
                    {promocionError.fechaFin && (
                      <FormHelperText>
                        <InfoOutlined />
                        Fecha invalida
                      </FormHelperText>
                    )}
                  </FormControl>
                </Column>
              </Row>

              <FormLabel>Horarios validez</FormLabel>
              <Row xs={12}>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl disabled={modo === "consulta"} error={promocionError.horaInicio}>
                    <FormLabel>Hora inicio (HH:MM AM/PM)</FormLabel>
                    <Input
                      size="sm"
                      placeholder="Hora desde"
                      type="time"
                      value={promocion.horaInicio}
                      onChange={(e) => handleChangeInput("horaInicio", e.target.value)}
                    />
                    {promocionError.horaInicio && (
                      <FormHelperText>
                        <InfoOutlined />
                        Hora invalido
                      </FormHelperText>
                    )}
                  </FormControl>
                </Column>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl disabled={modo === "consulta"} error={promocionError.horaFin}>
                    <FormLabel>Hora Fin (HH:MM AM/PM)</FormLabel>
                    <Input
                      size="sm"
                      placeholder="Hora hasta"
                      type="time"
                      value={promocion.horaFin}
                      onChange={(e) => handleChangeInput("horaFin", e.target.value)}
                    />
                    {promocionError.horaFin && (
                      <FormHelperText>
                        <InfoOutlined />
                        Hora invalido
                      </FormHelperText>
                    )}
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
      </TabPanel>
      {Notificacion.mostrar && (
        <CustomToast
          color={Notificacion.color}
          mensaje={Notificacion.mensaje}
          mostrar={Notificacion.mostrar}
          onClose={OcultarNotificacion}
        />
      )}
    </Tabs>
  );
};

export default Carta;
