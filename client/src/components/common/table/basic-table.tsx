// libraries
import { useMemo, useState, useEffect } from "react";
// MUI
import { Box, useTheme, CircularProgress } from "@mui/material";
// styles
import "./styles/styles.css";
// other
import { tokens } from "../../../theme";
// react-table
import {
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import Pagination from "./components/pagination";
import Thead from "./components/thead";
import Tbody from "./components/tbody";
import Loader from "../loader/loader";

const BasicTable = ({ items, itemsColumns, isLoading }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useMemo(() => items || [], [items]);
  const columns = useMemo(() => itemsColumns || [], [items]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    setSorting([{ id: "created_at", desc: true }]);
  }, []);

  return (
    <Box sx={{ paddingBottom: "80px !important" }}>
      {/* <Loader/> */}
      <table>
        <Thead table={table} colors={colors} />
        {!isLoading && <Tbody table={table} />}
      </table>
      {isLoading && <Loader />}

      <Pagination table={table} colors={colors} quantity={items?.length} />
    </Box>
  );
};

export default BasicTable;
