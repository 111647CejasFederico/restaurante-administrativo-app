import React, { useEffect, useState } from "react";
import {
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Option,
  Select,
} from "@mui/joy";
import {
  AccountCircleRounded,
  EmailRounded,
  InfoOutlined,
  PhoneRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import { Column, Container, Row } from "../../../components/GridComponents";
import { EmpleadoErrorInterface, EmpleadoInterface } from "../../../interfaces/empleado.interface";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import useUrlAxio from "../../../hooks/urlAxio.hook";
import useSesion from "../../../hooks/usuarioLogueado.hook";
import { NotificacionInterface } from "../../../hooks/notificaciones.hook";
import { TipoEstadoUsuarioInterface, TipoRolInterface } from "../../../interfaces/tipo.interface";

interface ContainerProps {
  modo?: "consulta" | "registrar" | "editar" | "cerrado";
  usuarioSeleccionado?: EmpleadoInterface;
  open: boolean;
  setOpen: (open: boolean) => void;
  MostrarNotificacion: (Notificacion: NotificacionInterface) => void;
}

const ModalFormUsuarios: React.FC<ContainerProps> = ({
  modo = "consulta",
  open,
  setOpen,
  usuarioSeleccionado,
  MostrarNotificacion,
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

  const [rolesUsuario, setRolesUsuario] = useState<TipoRolInterface[]>([]);
  const [estadosUsuario, setEstadosUsuario] = useState<TipoEstadoUsuarioInterface[]>([]);
  const [erroresEmpleados, setErroresEmpleado] = useState<EmpleadoErrorInterface>({
    user: false,
    pass: false,
    nombre: false,
    apellido: false,
    nroDocumento: false,
    rol: false,
    telefono: false,
    email: false,
    estado: false,
  });

  const { getUrlAxio } = useUrlAxio();
  const { getSesion } = useSesion();

  const getRolesUsuario = async () => {
    try {
      const config: AxiosRequestConfig = {
        // params: { },
        headers: {
          Authorization: `Bearer ${getSesion().token}`,
        },
      };
      let response: AxiosResponse = await axios.get(`${getUrlAxio()}tipoRol`, config);

      if (response.data.length !== 0) {
        let rolesUsuarioResponse: TipoRolInterface[] = [];
        response.data.forEach((rol: any) => {
          rolesUsuarioResponse.push({ ...rol });
        });
        setRolesUsuario(rolesUsuarioResponse);
      } else {
        MostrarNotificacion({
          mostrar: true,
          mensaje: "No se encontraron roles de usuario",
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

  const getEstadosUsuario = async () => {
    try {
      const config: AxiosRequestConfig = {
        // params: { },
        headers: {
          Authorization: `Bearer ${getSesion().token}`,
        },
      };
      let response: AxiosResponse = await axios.get(`${getUrlAxio()}tipoEstadoUsuario`, config);

      if (response.data.length !== 0) {
        let estadosUsuarioResponse: TipoEstadoUsuarioInterface[] = [];
        response.data.forEach((estado: any) => {
          estadosUsuarioResponse.push({ ...estado });
        });
        setEstadosUsuario(estadosUsuarioResponse);
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
    await getRolesUsuario();
    await getEstadosUsuario();
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
  };

  useEffect(() => {
    CargarFormulario();
  }, [usuarioSeleccionado, open]);

  const ValidarFormulario = (): boolean => {
    let errores: EmpleadoErrorInterface = {
      user: false,
      pass: false,
      nombre: false,
      apellido: false,
      nroDocumento: false,
      rol: false,
      telefono: false,
      email: false,
      estado: false,
    };

    let pasa = true;
    if (usuario.nombre === "" || usuario.nombre === null) {
      pasa = false;
      errores.nombre = true;
    }
    if (usuario.apellido === "" || usuario.apellido === null) {
      pasa = false;
      errores.apellido = true;
    }
    if (usuario.nroDocumento === 0 || usuario.nroDocumento === null) {
      pasa = false;
      errores.nroDocumento = true;
    }
    if (usuario.rol === null || !rolesUsuario.some((tipo) => tipo.id === usuario.rol)) {
      pasa = false;
      errores.rol = true;
    }
    if (usuario.estado === null || !estadosUsuario.some((estado) => estado.id === usuario.estado)) {
      pasa = false;
      errores.estado = true;
    }
    if (usuario.telefono === "" || usuario.telefono === null) {
      pasa = false;
      errores.telefono = true;
    }
    if (
      usuario?.email !== "" &&
      usuario?.email !== null &&
      !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
        usuario?.email
      )
    ) {
      pasa = false;
      errores.email = true;
    }
    if (modo === "registrar") {
      if (usuario.user === "" || usuario.user === null) {
        pasa = false;
        errores.user = true;
      }
      if (usuario.pass === "" || usuario.pass === null) {
        pasa = false;
        errores.pass = true;
      }
    }
    setErroresEmpleado(errores);
    return pasa;
  };

  const postUsuario = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getSesion().token}`,
      },
    };
    try {
      await axios.post(
        `${getUrlAxio()}Auth/Register`,
        {
          user: usuario.user,
          pass: usuario.pass,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          nroDocumento: usuario.nroDocumento,
          rol: usuario.rol,
          telefono: usuario.telefono,
          email: usuario.email,
          estado: usuario.estado,
        },
        config
      );
      MostrarNotificacion({ mostrar: true, mensaje: "Nuevo usuario registrado ", color: "verde" });
      setOpen(false);
    } catch (e: any) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Error: No se pudo registrar el usuario",
        color: "rojo",
      });
    }
  };

  const putUsuario = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${getSesion().token}`,
      },
    };
    try {
      await axios.put(
        `${getUrlAxio()}Empleado`,
        {
          id: usuario.id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          nroDocumento: usuario.nroDocumento,
          rol: usuario.rol,
          telefono: usuario.telefono,
          email: usuario.email,
          estado: usuario.estado,
        },
        config
      );
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Usuario modificado exitosamente",
        color: "verde",
      });
      setOpen(false);
    } catch (e: any) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Error: No se modifico el usuario",
        color: "rojo",
      });
    }
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
    if (ValidarFormulario()) {
      if (modo === "editar") {
        await putUsuario();
      }
      if (modo === "registrar") {
        await postUsuario();
      }
    } else {
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Hay datos invalidos en el formulario",
        color: "rojo",
      });
    }
  };

  const renderRoles = (): JSX.Element[] => {
    return rolesUsuario.map((rol) => (
      <Option value={rol.id} key={rol.id}>
        {rol.nombre}
      </Option>
    ));
  };

  const renderEstados = (): JSX.Element[] => {
    return estadosUsuario.map((estado) => (
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
            ? "Editando usuario"
            : modo === "registrar"
            ? "Registrando usuario"
            : "Informacion de usuario"}
        </DialogTitle>
        <DialogContent>
          <Container display="flex" justifyContent="space-between" alignItems="center">
            <Row xs={12}>
              <Column xs={12} md={6} sx={{ p: "5px" }}>
                <FormControl
                  disabled={modo === "consulta"}
                  required
                  error={erroresEmpleados.nombre}
                >
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    size="md"
                    required
                    placeholder="Nombre"
                    value={usuario.nombre}
                    onChange={(e) => handleChangeInput("nombre", e.target.value)}
                  />
                  {erroresEmpleados.nombre && (
                    <FormHelperText>
                      <InfoOutlined />
                      Dato invalido
                    </FormHelperText>
                  )}
                </FormControl>
              </Column>
              <Column xs={12} md={6} sx={{ p: "5px" }}>
                <FormControl
                  disabled={modo === "consulta"}
                  required
                  error={erroresEmpleados.apellido}
                >
                  <FormLabel>Apellido</FormLabel>
                  <Input
                    size="md"
                    required
                    placeholder="Apellido"
                    value={usuario.apellido}
                    onChange={(e) => handleChangeInput("apellido", e.target.value)}
                  />
                  {erroresEmpleados.apellido && (
                    <FormHelperText>
                      <InfoOutlined />
                      Dato invalido
                    </FormHelperText>
                  )}
                </FormControl>
              </Column>
            </Row>
            <Row xs={12}>
              <Column xs={12} md={6} sx={{ p: "5px" }}>
                <FormControl
                  disabled={modo === "consulta"}
                  required
                  error={erroresEmpleados.nroDocumento}
                >
                  <FormLabel>Nro Documento</FormLabel>
                  <Input
                    size="md"
                    required
                    placeholder="Nro Documento"
                    value={usuario.nroDocumento}
                    onChange={(e) => handleChangeInput("nroDocumento", e.target.value)}
                  />
                  {erroresEmpleados.nroDocumento && (
                    <FormHelperText>
                      <InfoOutlined />
                      Dato invalido
                    </FormHelperText>
                  )}
                </FormControl>
              </Column>
            </Row>
            <Row xs={12}>
              <Column xs={12} md={6} sx={{ p: "5px" }}>
                <FormControl
                  disabled={modo === "consulta"}
                  required
                  error={erroresEmpleados.telefono}
                >
                  <FormLabel>Telefono</FormLabel>
                  <Input
                    size="md"
                    type="tel"
                    placeholder="Telefono"
                    startDecorator={<PhoneRounded />}
                    required
                    value={usuario.telefono}
                    onChange={(e) => handleChangeInput("telefono", e.target.value)}
                  />
                  {erroresEmpleados.telefono && (
                    <FormHelperText>
                      <InfoOutlined />
                      Dato invalido
                    </FormHelperText>
                  )}
                </FormControl>
              </Column>
              <Column xs={12} md={6} sx={{ p: "5px" }}>
                <FormControl disabled={modo === "consulta"} error={erroresEmpleados.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="md"
                    type="email"
                    placeholder="Email"
                    value={usuario.email}
                    onChange={(e) => handleChangeInput("email", e.target.value)}
                    startDecorator={<EmailRounded />}
                  />
                  {erroresEmpleados.email && (
                    <FormHelperText>
                      <InfoOutlined />
                      Dato invalido
                    </FormHelperText>
                  )}
                </FormControl>
              </Column>
            </Row>
            <Row xs={12}>
              <Column xs={12} md={6} sx={{ p: "5px" }}>
                <FormControl disabled={modo === "consulta"} required error={erroresEmpleados.rol}>
                  <FormLabel>Rol</FormLabel>
                  <Select
                    size="md"
                    value={usuario.rol}
                    onChange={(e, value) => handleChangeInput("rol", value)}
                  >
                    {renderRoles()}
                  </Select>
                  {erroresEmpleados.rol && (
                    <FormHelperText>
                      <InfoOutlined />
                      Dato invalido
                    </FormHelperText>
                  )}
                </FormControl>
              </Column>
              <Column xs={12} md={6} sx={{ p: "5px" }}>
                <FormControl
                  disabled={modo === "consulta"}
                  required
                  error={erroresEmpleados.estado}
                >
                  <FormLabel>Estado</FormLabel>
                  <Select
                    size="md"
                    required
                    value={usuario.estado}
                    onChange={(e, value) => handleChangeInput("estado", value)}
                  >
                    {renderEstados()}
                  </Select>
                  {erroresEmpleados.estado && (
                    <FormHelperText>
                      <InfoOutlined />
                      Dato invalido
                    </FormHelperText>
                  )}
                </FormControl>
              </Column>
            </Row>
            <Row xs={12}>
              <Column xs={12} md={6} sx={{ p: "5px" }}>
                <FormControl disabled={modo !== "registrar"}>
                  <FormLabel>Usuario</FormLabel>
                  <Input
                    size="md"
                    required
                    value={usuario.user}
                    onChange={(e) => handleChangeInput("user", e.target.value)}
                    startDecorator={<AccountCircleRounded />}
                    placeholder="Usuario"
                  />
                  {erroresEmpleados.user && (
                    <FormHelperText>
                      <InfoOutlined />
                      Usuario invalida
                    </FormHelperText>
                  )}
                </FormControl>
              </Column>
              {modo === "registrar" && (
                <Column xs={12} md={6} sx={{ p: "5px" }}>
                  <FormControl>
                    <FormLabel>Contraseña</FormLabel>
                    <Input
                      size="md"
                      required
                      value={usuario.pass}
                      onChange={(e) => handleChangeInput("pass", e.target.value)}
                      type={blnVerPassword ? "text" : "password"}
                      startDecorator={
                        blnVerPassword ? (
                          <VisibilityRounded onClick={handleChangeVisibilityOfPassword} />
                        ) : (
                          <VisibilityOffRounded onClick={handleChangeVisibilityOfPassword} />
                        )
                      }
                      placeholder="Contraseña"
                    />
                    {erroresEmpleados.pass && (
                      <FormHelperText>
                        <InfoOutlined />
                        Contraseña invalida
                      </FormHelperText>
                    )}
                  </FormControl>
                </Column>
              )}
            </Row>
            <Row xs={12} marginTop={2}>
              <Column xs={6} sx={{ p: "5px" }}>
                <Button color="neutral" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
              </Column>
              {modo !== "consulta" && (
                <Column xs={6} sx={{ p: "5px" }}>
                  <Button color="success" onClick={handleClickSubmit}>
                    Grabar
                  </Button>
                </Column>
              )}
            </Row>
          </Container>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default ModalFormUsuarios;
