import React, { useEffect, useState } from "react";
import {
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Option,
  Select,
  Typography,
} from "@mui/joy";
import {
  AccountCircleRounded,
  EmailRounded,
  PhoneRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import { Column, Container, Row } from "../../components/GridComponents";
import { EmpleadoInterface } from "../../interfaces/empleado.interface";
import axios from "axios";
import useUrlAxio from "../../hooks/urlAxio.hook";
import useSesion from "../../hooks/usuarioLogueado.hook";

interface ContainerProps {
  modo?: "consulta" | "registrar" | "editar";
  usuarioSeleccionado?: EmpleadoInterface;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalFormUsuarios: React.FC<ContainerProps> = ({
  modo = "consulta",
  open,
  setOpen,
  usuarioSeleccionado,
}) => {
  const [blnVerPassword, setBlnVerPassword] = useState(false);
  const [usuario, setUsuario] = useState<EmpleadoInterface>({
    id: 0,
    user: "",
    pass: "",
    nombre: "",
    apellido: "",
    nroDocumento: 0,
    rol: 0,
    telefono: "",
    email: "",
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
      console.log("Roles buscados");
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
    if (usuarioSeleccionado && open) {
      setUsuario(usuarioSeleccionado);
    }
    if (!open)
      setUsuario({
        id: 0,
        user: "",
        pass: "",
        nombre: "",
        apellido: "",
        nroDocumento: 0,
        rol: 0,
        telefono: "",
        email: "",
        estado: 0,
      });
  }, [usuarioSeleccionado, open]);

  const postRegistrarUsuario = async () => {
    let config = {
      headers: { Authorization: `Bearer ${getSesion().token}` },
    };
    try {
      const response = await axios.post(`${getUrlAxio()}/Empleado`, { usuario }, config);
      console.log("objeto creado");
    } catch (e: any) {}
  };

  const putUsuario = async () => {
    let config = {
      headers: { Authorization: `Bearer ${getSesion().token}` },
    };
    try {
      const response = await axios.put(`${getUrlAxio()}/Empleado`, { usuario }, config);
      console.log("objeto editado");
    } catch (e: any) {}
  };

  const handleChangeVisibilityOfPassword = () => {
    setBlnVerPassword(!blnVerPassword);
  };

  const handleChangeInput = (prop: keyof EmpleadoInterface, value: any) => {
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [prop]: value,
    }));
  };

  const handleClickSubmit = async () => {
    console.log(usuario);
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
            ? "Editando usuario"
            : modo === "registrar"
            ? "Registrando usuario"
            : "Informacion de usuario"}
        </DialogTitle>
        <DialogContent>
          {modo === "consulta" ? (
            <Container display="flex" justifyContent="space-between" alignItems="center">
              <Row xs={12}>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Typography>{usuario.nombre}</Typography>
                  </FormControl>
                </Column>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Apellido</FormLabel>
                    <Typography>{usuario.apellido}</Typography>
                  </FormControl>
                </Column>
              </Row>
              <Row xs={12}>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Nro Documento</FormLabel>
                    <Typography>{usuario.nroDocumento}</Typography>
                  </FormControl>
                </Column>
              </Row>
              <Row xs={12}>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Telefono</FormLabel>
                    <Typography>{usuario.telefono}</Typography>
                  </FormControl>
                </Column>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Typography>{usuario.email === "" ? " - " : usuario.email}</Typography>
                  </FormControl>
                </Column>
              </Row>
              <Row xs={12}>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Rol</FormLabel>
                    <Typography>{usuario.TipoRol?.nombre}</Typography>
                  </FormControl>
                </Column>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Estado</FormLabel>
                    <Typography>{usuario.Estado?.nombre}</Typography>
                  </FormControl>
                </Column>
              </Row>
              <Row xs={12}>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Usuario</FormLabel>
                    <Typography>{usuario.user}</Typography>
                  </FormControl>
                </Column>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>
                      Contraseña
                      {blnVerPassword ? (
                        <VisibilityRounded onClick={handleChangeVisibilityOfPassword} />
                      ) : (
                        <VisibilityOffRounded onClick={handleChangeVisibilityOfPassword} />
                      )}
                    </FormLabel>
                    <Typography>{blnVerPassword && usuario.pass}</Typography>
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
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Input
                      size="md"
                      required
                      placeholder="Nombre"
                      value={usuario.nombre}
                      onChange={(e) => handleChangeInput("nombre", e.target.value)}
                    />
                  </FormControl>
                </Column>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Apellido</FormLabel>
                    <Input
                      size="md"
                      required
                      placeholder="Apellido"
                      value={usuario.apellido}
                      onChange={(e) => handleChangeInput("apellido", e.target.value)}
                    />
                  </FormControl>
                </Column>
              </Row>
              <Row xs={12}>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Nro Documento</FormLabel>
                    <Input
                      size="md"
                      required
                      placeholder="Nro Documento"
                      value={usuario.nroDocumento}
                      onChange={(e) => handleChangeInput("nroDocumento", e.target.value)}
                    />
                  </FormControl>
                </Column>
              </Row>
              <Row xs={12}>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Telefono</FormLabel>
                    <Input
                      size="md"
                      type="tel"
                      required
                      value={usuario.telefono}
                      onChange={(e) => handleChangeInput("telefono", e.target.value)}
                      startDecorator={<PhoneRounded />}
                      placeholder="Telefono"
                    />
                  </FormControl>
                </Column>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      size="md"
                      type="email"
                      value={usuario.email}
                      onChange={(e) => handleChangeInput("email", e.target.value)}
                      startDecorator={<EmailRounded />}
                      placeholder="Email"
                    />
                  </FormControl>
                </Column>
              </Row>
              <Row xs={12}>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Rol</FormLabel>
                    <Select
                      size="md"
                      required
                      defaultValue={usuario.rol}
                      onChange={(e, value) => handleChangeInput("rol", value)}
                    >
                      <Option value={0}>Dog</Option>
                      <Option value={1}>Cat</Option>
                    </Select>
                  </FormControl>
                </Column>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Estado</FormLabel>
                    <Select
                      size="md"
                      required
                      defaultValue={usuario.estado}
                      onChange={(e, value) => handleChangeInput("estado", value)}
                    >
                      <Option value={0}>Dog</Option>
                      <Option value={1}>Cat</Option>
                    </Select>
                  </FormControl>
                </Column>
              </Row>
              <Row xs={12}>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Usuario</FormLabel>
                    <Input
                      size="md"
                      required
                      value={usuario.user}
                      onChange={(e) => handleChangeInput("user", e.target.value)}
                      type="number"
                      startDecorator={<AccountCircleRounded />}
                      placeholder="Usuario"
                    />
                  </FormControl>
                </Column>
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Contraseña</FormLabel>
                    <Input
                      size="md"
                      required
                      value={usuario.pass}
                      onChange={(e) => handleChangeInput("pass", e.target.value)}
                      type={blnVerPassword ? "number" : "password"}
                      startDecorator={
                        blnVerPassword ? (
                          <VisibilityRounded onClick={handleChangeVisibilityOfPassword} />
                        ) : (
                          <VisibilityOffRounded onClick={handleChangeVisibilityOfPassword} />
                        )
                      }
                      placeholder="Contraseña"
                    />
                  </FormControl>
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

export default ModalFormUsuarios;
