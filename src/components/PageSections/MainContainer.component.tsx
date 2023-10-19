import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Maestros from "../../pages/Maestros.page";

export default function MainContainer() {
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
        <Maestros />
      </Stack>
    </Box>
  );
}
