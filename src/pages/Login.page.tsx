import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CssBaseline,
  CssVarsProvider,
  FormControl,
  FormLabel,
  GlobalStyles,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useUrlAxio from "../hooks/urlAxio.hook";
import { useNotificacion } from "../hooks/notificaciones.hook";
import { Column, Container, Row } from "../components/GridComponents";
import CustomToast from "../components/CustomToast/CustomToast";
import useSesion from "../hooks/usuarioLogueado.hook";

interface UsuarioInterface {
  usuario: string;
  password: string;
  token?: string;
}

const Login = () => {
  // const [cargando, setCargando] = useState<boolean>(false);
  const [blnVerPassword, setBlnVerPassword] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msjError, setMsjError] = useState<string>("");

  const navigate = useNavigate();

  const { Notificacion, MostrarNotificacion, OcultarNotificacion } = useNotificacion();
  const { setSesion, removeSesion } = useSesion();
  const { getUrlAxio } = useUrlAxio();

  const handleChangeVisibilityOfPassword = () => {
    setBlnVerPassword(!blnVerPassword);
  };

  const blnGetUsuario = async (token: string): Promise<boolean> => {
    let blnLoguea: boolean = false;
    try {
      const response = await axios.get(`${getUrlAxio()}Empleado/getMe`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setSesion({ ...response.data, token: token });
      }

      blnLoguea = true;
    } catch (error) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Error: no se pudo recuperar los datos del usuario",
        color: "rojo",
      });
    }
    return blnLoguea;
  };

  const blnLoginUsuario = async (usuario: UsuarioInterface): Promise<boolean> => {
    let blnLoguea: boolean = false;
    try {
      const response = await axios.post(`${getUrlAxio()}auth/Login`, {
        user: usuario.usuario,
        pass: usuario.password,
      });
      setMsjError("");
      await blnGetUsuario(response.data);
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Sesion iniciada correctamente!",
        color: "verde",
      });

      blnLoguea = true;
    } catch (error) {
      setMsjError("Credenciales incorrectas");
      MostrarNotificacion({
        mostrar: true, //@ts-ignore
        mensaje: "Error: " + error.response.data,
        color: "rojo",
      });
    }
    return blnLoguea;
  };

  const handleClickLogin = async () => {
    // setCargando(true);
    let mensaje = "";
    if (usuario !== "" && password !== "") {
      const blnLogueado = await blnLoginUsuario({ usuario, password });
      if (blnLogueado) {
        navigate("/Portal/");
      }
    } else {
      if (usuario === "" && password === "") {
        mensaje = "Debe ingresar su usuario y contraseña";
      } else {
        if (usuario === "") {
          mensaje = "Debe ingresar su usuario";
        }
        if (password === "") {
          mensaje = "Debe ingresar su contraseña";
        }
      }
      MostrarNotificacion({
        mostrar: true, //@ts-ignore
        mensaje: "Error: " + mensaje,
        color: "rojo",
      });
      setMsjError(mensaje);
    }

    // setCargando(false);
  };

  const handleClickSubmit = async () => {
    // setCargando(true);
    await handleClickLogin();
    // setCargando(false);
  };

  useEffect(() => {
    removeSesion();
  }, []);

  return (
    <CssVarsProvider defaultMode="system">
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
        variant="solid"
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
          justifyContent: "center",
          alignItems: "center",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Container
          sx={{
            width: "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
          }}
        >
          <Column
            sx={{
              padding: "15px",
              my: "auto",
              mx: "auto",
              width: 400,
              backdropFilter: "blur(12px)",
            }}
          >
            <Row
              sx={{
                py: 3,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Column
                sx={{
                  alignItems: "center",
                }}
              >
                <Typography level="title-lg">Logo</Typography>
              </Column>
            </Row>
            <Stack gap={2} sx={{ mt: 2 }}>
              <FormControl required>
                <FormLabel>Usuario</FormLabel>
                <Input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
              </FormControl>
              <FormControl required>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type={blnVerPassword ? "text" : "password"}
                  endDecorator={
                    blnVerPassword ? (
                      <Visibility onClick={handleChangeVisibilityOfPassword} />
                    ) : (
                      <VisibilityOff onClick={handleChangeVisibilityOfPassword} />
                    )
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Typography>{msjError}</Typography>
              </FormControl>
              <Stack gap={4} sx={{ mt: 2 }}>
                <Button type="submit" onClick={handleClickSubmit} fullWidth>
                  Iniciar sesion
                </Button>
              </Stack>
            </Stack>
          </Column>
        </Container>
        {Notificacion.mostrar && (
          <CustomToast
            color={Notificacion.color}
            mensaje={Notificacion.mensaje}
            mostrar={Notificacion.mostrar}
            onClose={OcultarNotificacion}
          />
        )}
      </Card>
    </CssVarsProvider>
  );
};

export default Login;
