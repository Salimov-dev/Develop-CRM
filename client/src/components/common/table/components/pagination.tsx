// icons
import FirstPageOutlinedIcon from "@mui/icons-material/FirstPageOutlined";
import LastPageOutlinedIcon from "@mui/icons-material/LastPageOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
// MUI
import { Box, Typography, Select, MenuItem } from "@mui/material";
// styles
import {
  ButtonStyled,
  PageBlock,
  PaginationBlock,
  PaginationContainer,
  PaginationPageNavigation,
  SearchedRows,
} from "../styles/styled";

const Pagination = ({ table, colors, quantity }) => {
  return (
    <PaginationContainer>
      <SearchedRows>
        <Typography>Найдено строк:</Typography> {quantity}
      </SearchedRows>

      <PaginationBlock>
        <PaginationPageNavigation>
          <ButtonStyled
            variant="outlined"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <FirstPageOutlinedIcon
              sx={{
                color: !table.getCanPreviousPage()
                  ? "inherit"
                  : colors.grey[100],
              }}
            />
          </ButtonStyled>
          <ButtonStyled
            variant="outlined"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftOutlinedIcon
              sx={{
                color: !table.getCanPreviousPage()
                  ? "inherit"
                  : colors.grey[100],
              }}
            />
          </ButtonStyled>
          <ButtonStyled
            variant="outlined"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightOutlinedIcon
              sx={{
                color: !table.getCanNextPage() ? "inherit" : colors.grey[100],
              }}
            />
          </ButtonStyled>
          <ButtonStyled
            variant="outlined"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <LastPageOutlinedIcon
              sx={{
                color: !table.getCanNextPage() ? "inherit" : colors.grey[100],
              }}
            />
          </ButtonStyled>
        </PaginationPageNavigation>

        <PageBlock>
          <Typography>Страница:</Typography>
          <Box sx={{ display: "flex", gap: "4px" }}>
            <Typography>
              {table.getState().pagination.pageIndex + 1} из{" "}
            </Typography>
            <Typography>{table.getPageCount()}</Typography>
          </Box>
        </PageBlock>

        <Select
          size="small"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <MenuItem key={pageSize} value={pageSize}>
              <Typography>Показать по: {pageSize}</Typography>
            </MenuItem>
          ))}
        </Select>
      </PaginationBlock>
    </PaginationContainer>
  );
};

export default Pagination;
