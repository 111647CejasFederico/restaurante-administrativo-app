import GlobalStyles from "@mui/joy/GlobalStyles";
import Sheet from "@mui/joy/Sheet";
import { Stack, Typography } from "@mui/joy";

export default function Footer() {
  return (
    <Sheet
      sx={{
        display: { xs: "flex" },
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        bottom: 0,
        flex: 1,
        width: "100%",
        height: "var(--Footer-height)",
        p: 2,
        gap: 1,
        borderTop: "1px solid",
        borderColor: "background.level1",
        boxShadow: "sm",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Footer-height": "52px",
          },
        })}
      />
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
        <Typography>©Derechos reservados - 2023</Typography>
      </Stack>
    </Sheet>
  );
}
