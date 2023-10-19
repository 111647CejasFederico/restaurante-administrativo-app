import Stack, { StackClasses } from "@mui/joy/Stack";
import Grid, { GridProps } from "@mui/joy/Grid";
import React from "react";

export const Column: React.FC<GridProps> = (props) => {
  return <Grid container direction="column" {...props} />;
};
export const Row: React.FC<GridProps> = (props) => {
  return <Grid container direction="row" {...props} />;
};
export const Container: React.FC<GridProps> = (props) => {
  return <Grid container {...props} />;
};
