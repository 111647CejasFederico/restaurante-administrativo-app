import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import DocumentScannerRounded from "@mui/icons-material/DocumentScannerRounded";
import DeckRounded from "@mui/icons-material/DeckRounded";
import ViewListRounded from "@mui/icons-material/ViewListRounded";
import AdminPanelSettingsRounded from "@mui/icons-material/AdminPanelSettingsRounded";
import EqualizerRounded from "@mui/icons-material/EqualizerRounded";
import PointOfSaleRounded from "@mui/icons-material/PointOfSaleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { closeSidebar } from "../../utils/Sideber.util";
import useSesion from "../../hooks/usuarioLogueado.hook";
import { useNavigate } from "react-router";
import { EmpleadoInterface } from "../../interfaces/empleado.interface";

interface OpcionLateral {
  label: string;
  icon: any;
  href: string;
  rolNecesario: number[];
}

export default function Sidebar() {
  const [usuario, setUsuario] = React.useState<EmpleadoInterface>({
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
    token: "",
  });
  const { getSesion, removeSesion } = useSesion();
  const navigate = useNavigate();

  const OpcionesLaterales: OpcionLateral[] = [
    {
      label: "Carta",
      icon: <DocumentScannerRounded />,
      href: "/Portal/Carta",
      rolNecesario: [1, 2, 3],
    },
    {
      label: "Mesas",
      icon: <DeckRounded />,
      href: "/Portal/Mesas",
      rolNecesario: [1, 2, 3],
    },
    {
      label: "Pedidos",
      icon: <ViewListRounded />,
      href: "/Portal/Pedidos",
      rolNecesario: [1, 2, 3],
    },
    {
      label: "Facturacion",
      icon: <PointOfSaleRounded />,
      href: "/Portal/Facturacion",
      rolNecesario: [1, 2],
    },
    {
      label: "Maestros",
      icon: <AdminPanelSettingsRounded />,
      href: "/Portal/Maestros",
      rolNecesario: [1, 2],
    },
    {
      label: "Reportes",
      icon: <EqualizerRounded />,
      href: "/Portal/Reportes",
      rolNecesario: [1],
    },
  ];

  React.useEffect(() => {
    setUsuario(getSesion());
  }, []);

  const handleClickCerrarSesion = () => {
    removeSesion();
    navigate("/Login/");
  };

  const renderOptionsLateralMenu = (): JSX.Element[] => {
    //@ts-ignore
    return OpcionesLaterales.map((opcion) => {
      if (opcion.rolNecesario.includes(usuario.rol)) {
        return (
          <ListItem key={opcion.label}>
            <ListItemButton role="menuitem" component="a" href={opcion.href}>
              {opcion.icon}
              <ListItemContent>
                <Typography level="title-sm">{opcion.label}</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        );
      }
      return null;
    });
  };

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: {
          xs: "fixed",
          md: "sticky",
        },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 9998,
        height: "100vh", // Corregido "100dvh" a "100vh"
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", marginBottom: "10px" }}>
        <Typography level="title-lg">Logo</Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", marginBottom: "10px" }}>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-md">
            {usuario.apellido}, {usuario.nombre}
          </Typography>
          <Typography level="body-md">{usuario.Rol?.nombre}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          {renderOptionsLateralMenu()}
        </List>
      </Box>
      <Button
        color="danger"
        variant="outlined"
        onClick={handleClickCerrarSesion}
        sx={{
          border: "1px solid red",
          borderRadius: "5px",
          alignContent: "center",
        }}
        startDecorator={<LogoutRoundedIcon />}
      >
        <Typography level="title-md" color="danger">
          Cerrar sesión
        </Typography>
      </Button>
    </Sheet>
  );
}
