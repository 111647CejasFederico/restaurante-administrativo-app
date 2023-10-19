import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import DocumentScannerRounded from "@mui/icons-material/DocumentScannerRounded";
import DeckRounded from "@mui/icons-material/DeckRounded";
import ViewListRounded from "@mui/icons-material/ViewListRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AdminPanelSettingsRounded from "@mui/icons-material/AdminPanelSettingsRounded";
import EqualizerRounded from "@mui/icons-material/EqualizerRounded";
import PointOfSaleRounded from "@mui/icons-material/PointOfSaleRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { closeSidebar } from "../../utils/Sideber.util";

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);

  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
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
        zIndex: 1,
        height: "100dvh",
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
          <Typography level="title-md">Usuario, usuario</Typography>
          <Typography level="body-xs">Rol</Typography>
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
          <ListItem>
            <ListItemButton>
              <DocumentScannerRounded />
              <ListItemContent>
                <Typography level="title-sm">Carta</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              role="menuitem"
              component="a"
              href="/joy-ui/getting-started/templates/order-dashboard/"
            >
              <DeckRounded />
              <ListItemContent>
                <Typography level="title-sm">Mesas</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              role="menuitem"
              component="a"
              href="/joy-ui/getting-started/templates/order-dashboard/"
            >
              <ViewListRounded />
              <ListItemContent>
                <Typography level="title-sm">Pedidos</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              role="menuitem"
              component="a"
              href="/joy-ui/getting-started/templates/order-dashboard/"
            >
              <PointOfSaleRounded />
              <ListItemContent>
                <Typography level="title-sm">Facturacion</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              role="menuitem"
              component="a"
              href="/joy-ui/getting-started/templates/order-dashboard/"
            >
              <AdminPanelSettingsRounded />
              <ListItemContent>
                <Typography level="title-sm">Maestros</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              role="menuitem"
              component="a"
              href="/joy-ui/getting-started/templates/order-dashboard/"
            >
              <EqualizerRounded />
              <ListItemContent>
                <Typography level="title-sm">Reportes</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          border: "1px solid red",
          borderRadius: "5px",
        }}
      >
        <IconButton size="sm" variant="plain" color="danger">
          <LogoutRoundedIcon />
        </IconButton>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-md" color="danger">
            Cerrar sesion
          </Typography>
        </Box>
      </Box>
    </Sheet>
  );
}
