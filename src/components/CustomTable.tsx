import { useState, useEffect, CSSProperties } from "react";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Tooltip from "@mui/joy/Tooltip";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { visuallyHidden } from "@mui/utils";
import { Column, Row } from "./GridComponents";
import { Button } from "@mui/joy";
import { Add } from "@mui/icons-material";

interface HeadCell {
  disablePadding: boolean;
  //@ts-ignore
  id: keyof T;
  label: string;
  numeric: boolean;
}

interface TableProps<T> {
  data: T[];
  headCells: HeadCell[];
  showCheckbox: boolean;
  visibleColumns: Set<keyof T>;
  onSelectedChange: (selected: string[]) => void;
  labelAgregar: string;
  handleClickRegistrar: () => void;
}

type Order = "asc" | "desc";

function CustomTable<T>({
  data,
  headCells,
  showCheckbox,
  visibleColumns,
  onSelectedChange,
  labelAgregar,
  handleClickRegistrar,
}: TableProps<T>) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof T>();
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    setOrder(newOrder);
    setOrderBy(property);
  };

  const sortData = (property: keyof T, newOrder: Order) => {
    const sortedData = data.sort((a, b) => {
      const aValue = a[property];
      const bValue = b[property];

      if ((aValue === null || aValue === undefined) && (bValue === null || bValue === undefined)) {
        return 0;
      }

      if (aValue === null || aValue === undefined) {
        return newOrder === "asc" ? 1 : -1;
      }

      if (bValue === null || bValue === undefined) {
        return newOrder === "asc" ? -1 : 1;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return newOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "boolean" && typeof bValue === "boolean") {
        return aValue === bValue
          ? 0
          : aValue
          ? newOrder === "asc"
            ? -1
            : 1
          : newOrder === "asc"
          ? 1
          : -1;
      }

      return newOrder === "asc"
        ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
    });

    return sortedData;
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      //@ts-ignore
      const newSelected = data.map((n) => n.name);
      setSelected(newSelected);
      onSelectedChange(newSelected);
      return;
    }
    setSelected([]);
    onSelectedChange([]);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    onSelectedChange(newSelected);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newValue: number | null) => {
    setRowsPerPage(parseInt(newValue!.toString(), 10));
    setPage(0);
  };

  const getLabelDisplayedRowsTo = () => {
    if (data.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1 ? data.length : Math.min(data.length, (page + 1) * rowsPerPage);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const renderHeader = () => {
    return (
      <thead>
        <tr>
          {showCheckbox && (
            <th>
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < data.length}
                checked={data.length > 0 && selected.length === data.length}
                onChange={({ target }) => handleSelectAllClick(target.checked)}
                slotProps={{
                  input: {
                    "aria-label": "Seleccionar todos los elementos",
                  },
                }}
                sx={{ verticalAlign: "sub" }}
              />
            </th>
          )}
          {headCells.map((headCell) => {
            const active = orderBy === headCell.id;
            //@ts-ignore
            const isVisible = visibleColumns.has(headCell.id);

            if (isVisible) {
              return (
                <th
                  //@ts-ignore
                  // key={headCell.id}
                  aria-sort={active ? (order === "asc" ? "ascending" : "descending") : "none"}
                >
                  <Button
                    variant="plain"
                    //@ts-ignore
                    onClick={() => handleRequestSort(headCell.id)}
                    startDecorator={
                      headCell.numeric ? (
                        <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                      ) : null
                    }
                    endDecorator={
                      !headCell.numeric ? (
                        <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                      ) : null
                    }
                    sx={{
                      "& svg": {
                        transition: "0.2s",
                        transform: active && order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                      },
                      "&:hover": { "& svg": { opacity: 1 } },
                    }}
                  >
                    <Typography
                      textColor={active ? "primary.plainColor" : undefined}
                      fontWeight="lg"
                    >
                      {headCell.label}
                      {active ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc" ? "ordenado descendente" : "ordenado ascendente"}
                        </Box>
                      ) : null}
                    </Typography>
                  </Button>
                </th>
              );
            } else {
              return null;
            }
          })}
        </tr>
      </thead>
    );
  };

  const renderBody = () => {
    return (
      <tbody>
        <tr>
          <td colSpan={headCells.length} style={{ paddingInline: 0, paddingBlock: "5px" }}>
            <Row xs={12}>
              <Column xs={12}>
                <Button onClick={handleClickRegistrar}>
                  <Add /> {labelAgregar}
                </Button>
              </Column>
            </Row>
          </td>
        </tr>
        {(orderBy ? sortData(orderBy, order) : data)
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            //@ts-ignore
            const isItemSelected = isSelected(row.name);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <tr
                //@ts-ignore
                // onClick={() => handleClick(row.name)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                //@ts-ignore
                key={row.name}
                style={
                  isItemSelected
                    ? ({
                        "--TableCell-dataBackground": "var(--TableCell-selectedBackground)",
                        "--TableCell-headBackground": "var(--TableCell-selectedBackground)",
                      } as CSSProperties)
                    : {}
                }
              >
                {showCheckbox && (
                  <th scope="row">
                    <Checkbox
                      checked={isItemSelected}
                      slotProps={{
                        input: {
                          "aria-labelledby": labelId,
                        },
                      }}
                      sx={{ verticalAlign: "top" }}
                    />
                  </th>
                )}
                {headCells.map((headCell) => {
                  //@ts-ignore
                  const isVisible = visibleColumns.has(headCell.id);

                  if (isVisible) {
                    //@ts-ignore
                    return <td key={headCell.id}>{row[headCell.id]}</td>;
                  } else {
                    return null;
                  }
                })}
              </tr>
            );
          })}
        {emptyRows > 0 && (
          <tr
            style={
              {
                height: `calc(${emptyRows} * 40px)`,
                "--TableRow-hoverBackground": "transparent",
              } as CSSProperties
            }
          >
            <td colSpan={showCheckbox ? headCells.length + 1 : headCells.length} aria-hidden />
          </tr>
        )}
      </tbody>
    );
  };

  const renderFooter = () => {
    return (
      <tfoot>
        <tr>
          <td colSpan={showCheckbox ? headCells.length + 1 : headCells.length}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "flex-end",
              }}
            >
              <FormControl orientation="horizontal" size="sm">
                <FormLabel>Filas por página:</FormLabel>
                <Select onChange={(e, value) => handleChangeRowsPerPage(value)} value={rowsPerPage}>
                  <Option value={5}>5</Option>
                  <Option value={10}>10</Option>
                  <Option value={25}>25</Option>
                </Select>
              </FormControl>
              <Typography textAlign="center" sx={{ minWidth: 80 }}>
                {`Mostrando ${
                  data.length === 0 ? 0 : page * rowsPerPage + 1
                } - ${getLabelDisplayedRowsTo()} de ${
                  data.length === -1 ? -1 : data.length
                } elementos`}
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  size="sm"
                  color="neutral"
                  variant="outlined"
                  disabled={page === 0}
                  onClick={() => handleChangePage(page - 1)}
                  sx={{ bgcolor: "background.surface" }}
                >
                  <KeyboardArrowLeftIcon />
                </IconButton>
                <IconButton
                  size="sm"
                  color="neutral"
                  variant="outlined"
                  disabled={
                    data.length !== -1 ? page >= Math.ceil(data.length / rowsPerPage) - 1 : false
                  }
                  onClick={() => handleChangePage(page + 1)}
                  sx={{ bgcolor: "background.surface" }}
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
              </Box>
            </Box>
          </td>
        </tr>
      </tfoot>
    );
  };

  return (
    <Sheet>
      <Table>
        {renderHeader()}
        {renderBody()}
        {renderFooter()}
      </Table>
    </Sheet>
  );
}

export default CustomTable;
