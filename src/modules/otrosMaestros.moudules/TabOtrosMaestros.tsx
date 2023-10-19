import { useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  Grid,
  Input,
  Stack,
  TabPanel,
  Table,
  Textarea,
  Typography,
} from "@mui/joy";
import { Column, Container, Row } from "../../components/GridComponents";

export default function TabOtrosMaestros() {
  const [selectedTab, setSelectedTab] = useState<number | string | null>("TiposProducto");
  return (
    <Tabs
      aria-label="Otros maestros Tab"
      defaultValue={0}
      value={selectedTab}
      onChange={(e, value) => setSelectedTab(value)}
      sx={{ bgcolor: "transparent" }}
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
        <Tab value="TiposProducto">Tipos de producto</Tab>
        <Tab value="RolesUsuario">Roles de usuario</Tab>
        <Tab value="EstadosUsuario">Estados de usuario</Tab>
      </TabList>
      <TabPanel value="TiposProducto">
        <Container display="flex" justifyContent="space-between" alignItems="center">
          <Row xs={12}>
            <Column xs={12}>
              <Row justifyContent="space-evenly" alignItems="center" xs={12}>
                <Table aria-label="table" size="lg">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th style={{ width: "50%" }}>Descripcion</th>
                      <th>Habilitado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
              <Row justifyContent="space-between" alignItems="center" xs={12}>
                <Column xs={12} md={8.3} justifyContent="space-between">
                  <Card>
                    <CardContent>
                      <Row
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        xs={12}
                        columnSpacing={1}
                        sx={{ flexGrow: 1 }}
                      >
                        <Column xs={8.3}>
                          <FormControl>
                            <Input placeholder="Nombre" size="md" />
                          </FormControl>
                          <FormControl>
                            <Textarea placeholder="Descripcion" size="md" minRows={3} />
                          </FormControl>
                        </Column>
                        <Column
                          xs={3.3}
                          justifyContent="space-between"
                          sx={{
                            gap: 1,
                          }}
                        >
                          <Row xs={12}>
                            <Column xs={12}>
                              <FormControl>
                                <Input
                                  startDecorator={
                                    <Typography sx={{ cursor: "pointer" }}>Habilitado</Typography>
                                  }
                                  type="checkbox"
                                  size="md"
                                  sx={{ border: "0px" }}
                                />
                              </FormControl>
                            </Column>
                          </Row>
                          <Row xs={12}>
                            <Column xs={12}>
                              <FormControl>
                                <Button size="md" variant="outlined" color="neutral">
                                  <Typography>Cancelar</Typography>
                                </Button>
                              </FormControl>
                            </Column>
                          </Row>
                          <Row xs={12}>
                            <Column xs={12}>
                              <FormControl>
                                <Button size="md" variant="solid" color="success">
                                  <Typography>Grabar</Typography>
                                </Button>
                              </FormControl>
                            </Column>
                          </Row>
                        </Column>
                      </Row>
                    </CardContent>
                  </Card>
                </Column>
                <Column
                  xs={12}
                  md={3.3}
                  justifyContent="space-between"
                  sx={{
                    gap: 1,
                  }}
                >
                  <Row xs={12}>
                    <Column xs={4} md={12}>
                      <Button size="lg" variant="outlined" color="success">
                        Nuevo tipo de producto
                      </Button>
                    </Column>
                    <Column xs={4} md={12}>
                      <Button size="lg" variant="outlined" color="warning">
                        Editar tipo seleccionado
                      </Button>
                    </Column>
                    <Column xs={4} md={12}>
                      <Button size="lg" variant="outlined" color="danger">
                        Dar de baja al tipo seleccionado
                      </Button>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </Column>
          </Row>
        </Container>
      </TabPanel>
      <TabPanel value="RolesUsuario">
        <Container display="flex" justifyContent="space-between" alignItems="center">
          <Row xs={12}>
            <Column xs={12}>
              <Row justifyContent="space-evenly" alignItems="center" xs={12}>
                <Table aria-label="table" size="lg">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th style={{ width: "50%" }}>Descripcion</th>
                      <th>Habilitado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
              <Row justifyContent="space-between" alignItems="center" xs={12}>
                <Column xs={12} md={8.3} justifyContent="space-between">
                  <Card>
                    <CardContent>
                      <Row
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        xs={12}
                        columnSpacing={1}
                        sx={{ flexGrow: 1 }}
                      >
                        <Column xs={8.3}>
                          <FormControl>
                            <Input placeholder="Nombre" size="md" />
                          </FormControl>
                          <FormControl>
                            <Textarea placeholder="Descripcion" size="md" minRows={3} />
                          </FormControl>
                        </Column>
                        <Column
                          xs={3.3}
                          justifyContent="space-between"
                          sx={{
                            gap: 1,
                          }}
                        >
                          <Row xs={12}>
                            <Column xs={12}>
                              <FormControl>
                                <Input
                                  startDecorator={
                                    <Typography sx={{ cursor: "pointer" }}>Habilitado</Typography>
                                  }
                                  type="checkbox"
                                  size="md"
                                  sx={{ border: "0px" }}
                                />
                              </FormControl>
                            </Column>
                          </Row>
                          <Row xs={12}>
                            <Column xs={12}>
                              <FormControl>
                                <Button size="md" variant="outlined" color="neutral">
                                  <Typography>Cancelar</Typography>
                                </Button>
                              </FormControl>
                            </Column>
                          </Row>
                          <Row xs={12}>
                            <Column xs={12}>
                              <FormControl>
                                <Button size="md" variant="solid" color="success">
                                  <Typography>Grabar</Typography>
                                </Button>
                              </FormControl>
                            </Column>
                          </Row>
                        </Column>
                      </Row>
                    </CardContent>
                  </Card>
                </Column>
                <Column
                  xs={12}
                  md={3.3}
                  justifyContent="space-between"
                  sx={{
                    gap: 1,
                  }}
                >
                  <Row xs={12}>
                    <Column xs={4} md={12}>
                      <Button size="lg" variant="outlined" color="success">
                        Nuevo rol de usuario
                      </Button>
                    </Column>
                    <Column xs={4} md={12}>
                      <Button size="lg" variant="outlined" color="warning">
                        Editar rol seleccionado
                      </Button>
                    </Column>
                    <Column xs={4} md={12}>
                      <Button size="lg" variant="outlined" color="danger">
                        Dar de baja al rol seleccionado
                      </Button>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </Column>
          </Row>
        </Container>
      </TabPanel>
      <TabPanel value="EstadosUsuario">
        <Container display="flex" justifyContent="space-between" alignItems="center">
          <Row xs={12}>
            <Column xs={12}>
              <Row justifyContent="space-evenly" alignItems="center" xs={12}>
                <Table aria-label="table" size="lg">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th style={{ width: "50%" }}>Descripcion</th>
                      <th>Habilitado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
              <Row justifyContent="space-between" alignItems="center" xs={12}>
                <Column xs={12} md={8.3} justifyContent="space-between">
                  <Card>
                    <CardContent>
                      <Row
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        xs={12}
                        columnSpacing={1}
                        sx={{ flexGrow: 1 }}
                      >
                        <Column xs={8.3}>
                          <FormControl>
                            <Input placeholder="Nombre" size="md" />
                          </FormControl>
                          <FormControl>
                            <Textarea placeholder="Descripcion" size="md" minRows={3} />
                          </FormControl>
                        </Column>
                        <Column
                          xs={3.3}
                          justifyContent="space-between"
                          sx={{
                            gap: 1,
                          }}
                        >
                          <Row xs={12}>
                            <Column xs={12}>
                              <FormControl>
                                <Input
                                  startDecorator={
                                    <Typography sx={{ cursor: "pointer" }}>Habilitado</Typography>
                                  }
                                  type="checkbox"
                                  size="md"
                                  sx={{ border: "0px" }}
                                />
                              </FormControl>
                            </Column>
                          </Row>
                          <Row xs={12}>
                            <Column xs={12}>
                              <FormControl>
                                <Button size="md" variant="outlined" color="neutral">
                                  <Typography>Cancelar</Typography>
                                </Button>
                              </FormControl>
                            </Column>
                          </Row>
                          <Row xs={12}>
                            <Column xs={12}>
                              <FormControl>
                                <Button size="md" variant="solid" color="success">
                                  <Typography>Grabar</Typography>
                                </Button>
                              </FormControl>
                            </Column>
                          </Row>
                        </Column>
                      </Row>
                    </CardContent>
                  </Card>
                </Column>
                <Column
                  xs={12}
                  md={3.3}
                  justifyContent="space-between"
                  sx={{
                    gap: 1,
                  }}
                >
                  <Row xs={12}>
                    <Column xs={4} md={12}>
                      <Button size="lg" variant="outlined" color="success">
                        Nuevo estado de usuario
                      </Button>
                    </Column>
                    <Column xs={4} md={12}>
                      <Button size="lg" variant="outlined" color="warning">
                        Editar estado seleccionado
                      </Button>
                    </Column>
                    <Column xs={4} md={12}>
                      <Button size="lg" variant="outlined" color="danger">
                        Dar de baja al estado seleccionado
                      </Button>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </Column>
          </Row>
        </Container>
      </TabPanel>
    </Tabs>
  );
}
