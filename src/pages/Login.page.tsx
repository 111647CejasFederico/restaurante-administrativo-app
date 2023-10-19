import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  Card,
  CssBaseline,
  CssVarsProvider,
  FormControl,
  GlobalStyles,
  Input,
  Stack,
  Typography,
  formLabelClasses,
} from "@mui/joy";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useUrlAxio from "../hooks/urlAxio.hook";
import useNotificacion from "../hooks/notificaciones.hook";

interface UsuarioInterface {
  usuario: string;
  password: string;
  token?: string;
}

const Login = () => {
  const [cargando, setCargando] = useState<boolean>(false);
  const [blnVerPassword, setBlnVerPassword] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msjError, setMsjError] = useState<string>("");

  const [openNumpadUsuario, setOpenNumpadUsuario] = useState<boolean>(false);
  const [openNumpadPassword, setOpenNumpadPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const { Notificacion, MostrarNotificacion, OcultarNotificacion } = useNotificacion();

  const { getUrlAxio } = useUrlAxio();

  const handleChangeVisibilityOfPassword = () => {
    setBlnVerPassword(!blnVerPassword);
  };

  const loginPaciente = async (usuario: UsuarioInterface) => {
    try {
      const response = await axios.post(`${getUrlAxio()}Usuarios/LoginPaciente`, {
        nombreUsuario: usuario.usuario,
        password: usuario.password,
      });
      return response.data.token;
    } catch (error) {
      setMsjError("Usuario o Password incorrecto");
      MostrarNotificacion({
        mostrar: true, //@ts-ignore
        mensaje: "Error: " + error.response.data,
        color: "rojo",
      });
    }
  };

  const obtenerPaciente = async (token: string, documento: string) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get(`${getUrlAxio()}Pacientes?documento=${documento}`, config);
      const data = response.data[0];
      return {
        codigo: data.codigo,
        hc: data.hc,
        documentoNro: data.documentoNro,
        documentoTipo: data.documentoTipo,
        documentoTipoNombre: data.documentoTipoNombre,
        nombre: data.nombre,
        apellido: data.apellido,
        mutual: data.mutual,
        mutualNombre: data.mutualNombre,
        telefono: data.telefono,
        celular: data.celular,
        email: data.email,
        mutualAfiliado: data.mutualAfiliado,
        nacimiento: data.nacimiento,
        password: password,
        token: token,
      };
    } catch (error) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Se produjo un error al intentar consultar los datos del paciente",
        color: "rojo",
      });
    }
  };

  const handleClickLogin = async () => {
    setCargando(true);
    console.log(getUrlAxio());
    if (usuario !== "" && password !== "") {
      const token = await loginPaciente({ usuario, password });
      const paciente: any = await obtenerPaciente(token, usuario);
      if (paciente) {
        MostrarNotificacion({
          mostrar: true,
          mensaje: "Sesión iniciada correctamente",
          color: "verde",
        });
        navigate("/NuevoTurno");
      }
    } else {
      if (usuario !== "" && password !== "") setMsjError("Debe ingresar su documento y contraseña");
      else {
        if (usuario !== "") {
          setMsjError("Debe ingresar su documento");
        }
        if (password !== "") {
          setMsjError("Debe ingresar su contraseña");
        }
      }
    }

    setCargando(false);
  };

  const handleClickSubmit = async () => {
    setCargando(true);
    await handleClickLogin();
    setCargando(false);
  };

  useEffect(() => {}, []);

  return (
    <CssVarsProvider defaultMode="dark">
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "50vw", // must be `vw` only
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.3s", // set to `none` to disable transition
          },
        }}
      />
      <Card
        sx={(theme) => ({
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

          width: "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint)) * 999, 100vw)",

          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            px: 2,
          }}
        >
          <Box
            component="main"
            sx={{
              // border: ".25px solid",
              padding: "15px",
              my: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              backdropFilter: "blur(12px)",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            <Box
              component="header"
              sx={{
                py: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  gap: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography level="title-lg">Logo</Typography>
              </Box>
            </Box>
            <Stack gap={2} sx={{ mt: 2 }}>
              <FormControl required>
                <Input
                  startDecorator={<Typography>Documento</Typography>}
                  type="number"
                  readOnly
                  onClick={() => setOpenNumpadUsuario(true)}
                  value={usuario}
                />
              </FormControl>
              <FormControl required>
                <Input
                  startDecorator={<Typography>Contraseña</Typography>}
                  type={blnVerPassword ? "number" : "password"}
                  endDecorator={
                    blnVerPassword ? (
                      <Visibility onClick={handleChangeVisibilityOfPassword} />
                    ) : (
                      <VisibilityOff onClick={handleChangeVisibilityOfPassword} />
                    )
                  }
                  readOnly
                  onClick={() => setOpenNumpadPassword(true)}
                  value={password}
                />
              </FormControl>
              <Stack gap={4} sx={{ mt: 2 }}>
                <Button type="submit" onClick={handleClickSubmit} fullWidth>
                  Iniciar sesion
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Card>
    </CssVarsProvider>
  );
};

export default Login;
