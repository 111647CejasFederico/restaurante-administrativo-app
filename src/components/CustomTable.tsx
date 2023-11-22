import { useState, useEffect, CSSProperties, DetailedHTMLProps } from "react";
import Box from "@mui/joy/Box";
import Table, { TableProps } from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet, { SheetProps } from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { visuallyHidden } from "@mui/utils";
import { Column, Container, Row } from "./GridComponents";
import { Button, Input } from "@mui/joy";
import { Add, Search } from "@mui/icons-material";
import dayjs from "dayjs";

export interface HeadCell<T> {
  id: keyof T;
  label: string;
  numeric: boolean;
  ordenable: boolean;
}

interface BodyCell<T> {
  id: keyof T;
  numeric: boolean;
  value: string | boolean | number | null;
  render: JSX.Element;
}

export interface BodyRow<T> {
  rowProps: DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
  row: BodyCell<T>[];
  id: string;
}

interface ContainerProps<T> {
  data: BodyRow<T>[];
  headCells: HeadCell<T>[];
  labelAgregar: string;
  handleClickRegistrar: () => void;
  showCheckbox: boolean;
  mostrarAgregar?: boolean;
  visibleColumns: Set<keyof T>;
  SheetProperties: SheetProps;
  TableProperties: TableProps;
}

type Order = "asc" | "desc";

export function CustomTable<T>({
  data,
  headCells,
  labelAgregar,
  handleClickRegistrar,
  showCheckbox,
  mostrarAgregar = true,
  visibleColumns,
  SheetProperties,
  TableProperties,
}: ContainerProps<T>) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof T>();
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<BodyRow<T>[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchBy, setSearchBy] = useState<string>(String(headCells[0].id));

  const handleRequestSort = (property: keyof T) => {
    if (headCells.some((cabecera) => cabecera.id === property && cabecera.ordenable)) {
      const isAsc = orderBy === property && order === "asc";
      const newOrder = isAsc ? "desc" : "asc";
      setOrder(newOrder);
      setOrderBy(property);
    }
  };
  const compareTime = (timeA: string, timeB: string) => {
    const [hoursA, minutesA] = timeA.split(":").map(Number);
    const [hoursB, minutesB] = timeB.split(":").map(Number);

    if (hoursA !== hoursB) {
      return hoursA - hoursB;
    }

    return minutesA - minutesB;
  };

  const sortData = (property: keyof T, newOrder: Order, filteredRows: BodyRow<T>[]) => {
    const sortedData = filteredRows.slice().sort((a, b) => {
      const aValue = a.row.find((columna) => columna.id === property)?.value;
      const bValue = b.row.find((columna) => columna.id === property)?.value;

      if (aValue == null || aValue == undefined) {
        return newOrder === "asc" ? 1 : -1;
      }

      if (bValue == null || bValue == undefined) {
        return newOrder === "asc" ? -1 : 1;
      }
      //@ts-ignore
      const dateA = dayjs(aValue);
      //@ts-ignore
      const dateB = dayjs(bValue);

      if (dateA.isValid() && dateB.isValid()) {
        return newOrder === "asc" ? dateA.diff(dateB) : dateB.diff(dateA);
      }

      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

      //@ts-ignore
      if (timeRegex.test(aValue) && timeRegex.test(bValue)) {
        //@ts-ignore
        return newOrder === "asc" ? compareTime(aValue, bValue) : compareTime(bValue, aValue);
      }

      const numA = Number(aValue);
      const numB = Number(bValue);

      if (isNaN(numA) && isNaN(numB)) {
        return newOrder === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      } else {
        return newOrder === "asc" ? numA - numB : numB - numA;
      }
    });

    return sortedData;
  };

  const filterRows = () => {
    let filteredRows: BodyRow<T>[] = data;
    if (searchBy) {
      if (search !== "") {
        filteredRows = filteredRows.filter((row) =>
          String(row.row.find((columna) => columna.id === searchBy)?.value)
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      }
    }
    if (orderBy) {
      filteredRows = sortData(orderBy, order, filteredRows);
    }
    setRows(filteredRows);
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newValue: number | null) => {
    setRowsPerPage(newValue ? parseInt(newValue.toString(), 10) : 10);
    setPage(0);
  };

  const getLabelDisplayedRowsTo = () => {
    if (data.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1 ? data.length : Math.min(data.length, (page + 1) * rowsPerPage);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const renderHeader = () => {
    return (
      <thead>
        <tr key={page}>
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
                  aria-sort={
                    headCell.ordenable && active
                      ? order === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  <Button
                    disabled={!headCell.ordenable}
                    variant="plain"
                    //@ts-ignore
                    onClick={() => handleRequestSort(headCell.id)}
                    startDecorator={
                      headCell.ordenable && headCell.numeric ? (
                        <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                      ) : null
                    }
                    endDecorator={
                      headCell.ordenable && !headCell.numeric ? (
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

  useEffect(() => {
    filterRows();
  }, [data, search, searchBy, order, orderBy]);

  const renderBody = () => {
    return (
      <tbody>
        {mostrarAgregar && (
          <tr key={"add-item-row"}>
            <td
              colSpan={headCells.length}
              key={0}
              style={{ paddingInline: 0, paddingBlock: "5px" }}
            >
              <Row xs={12}>
                <Column xs={12}>
                  <Button onClick={handleClickRegistrar}>
                    <Add /> {labelAgregar}
                  </Button>
                </Column>
              </Row>
            </td>
          </tr>
        )}
        {rows.length > 0 &&
          rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
            const isItemSelected = isSelected(row.id);

            return (
              <tr
                {...row.rowProps}
                key={row.id} // Agrega una clave única aquí
                style={
                  isItemSelected
                    ? ({
                        "--TableCell-dataBackground": "var(--TableCell-selectedBackground)",
                        "--TableCell-headBackground": "var(--TableCell-selectedBackground)",
                      } as CSSProperties)
                    : {}
                }
              >
                {headCells.map((headCell) => {
                  //@ts-ignore
                  const isVisible = visibleColumns.has(headCell.id);

                  if (isVisible) {
                    //@ts-ignore
                    return (
                      <td style={{ height: "40px" }}>
                        {row.row.find((columna) => columna.id === headCell.id)?.render}
                      </td>
                    );
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
                height: `calc(${emptyRows} * 48.7px)`,
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
                  <Option value={10}>10</Option>
                  <Option value={20}>20</Option>
                  <Option value={30}>30</Option>
                </Select>
              </FormControl>
              <Typography textAlign="center" sx={{ minWidth: 80 }}>
                {`Mostrando ${
                  rows.length === 0 ? 0 : page * rowsPerPage + 1
                } - ${getLabelDisplayedRowsTo()} de ${
                  rows.length === -1 ? -1 : rows.length
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
                    rows.length !== -1 ? page >= Math.ceil(rows.length / rowsPerPage) - 1 : false
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

  useEffect(() => {
    filterRows();
  }, [search, searchBy]);

  return (
    <Sheet {...SheetProperties}>
      <Container display="flex">
        <Row xs={12} alignContent="flex-end" alignItems="flex-end">
          <Column xs={12} sm={6} md={3} lg={2} m={{ xs: 0, md: 1 }}>
            <FormControl>
              <FormLabel>Buscar por</FormLabel>
              <Select
                //@ts-ignore
                onChange={(e, value) => setSearchBy(value)}
                value={searchBy}
              >
                {headCells.map((headCell) => {
                  const active = orderBy === headCell.id;
                  //@ts-ignore
                  const isVisible = visibleColumns.has(headCell.id);

                  if (isVisible) {
                    return (
                      <Option key={headCell.label} value={headCell.id}>
                        {headCell.label}
                      </Option>
                    );
                  } else {
                    return null;
                  }
                })}
              </Select>
            </FormControl>
          </Column>
          <Column xs={12} sm={6} md={3} lg={2} m={{ xs: 0, md: 1 }}>
            <FormControl>
              <FormLabel>Buscar</FormLabel>
              <Input
                endDecorator={<Search />}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </FormControl>
          </Column>
        </Row>
      </Container>
      <Table {...TableProperties}>
        {renderHeader()}
        {renderBody()}
        {renderFooter()}
      </Table>
    </Sheet>
  );
}
