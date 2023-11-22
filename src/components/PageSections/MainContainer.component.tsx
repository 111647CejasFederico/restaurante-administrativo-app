import { Suspense, useEffect } from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Maestros from "../../pages/Maestros/Maestros.page";
import { useLocation, useParams } from "react-router";
import Carta from "../../pages/Carta/Carta";
import TabMesas from "../../pages/Mesas/TabMesas";

export default function MainContainer() {
  const { name } = useParams<{ name: string }>();
  // const { pathname } = useLocation();

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
      }}
    >
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          mx: "auto",
          px: {
            xs: 2,
            md: 2,
          },
          py: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Suspense fallback={<div>Cargando...</div>}>
          {(() => {
            switch (name) {
              case "Carta":
                return <Carta />;
              case "Mesas":
                return <TabMesas cols={3} rows={8} />;
                break;
              case "Facturacion":
                //   return <NuevoTurnoImagenes />;
                break;
              case "Maestros":
                return <Maestros />;
              case "Reportes":
                //   return <MainPage />;
                break;
              default:
                // return <PageError motivo="404" />;
                break;
            }
          })()}
        </Suspense>
      </Stack>
    </Box>
  );
}
