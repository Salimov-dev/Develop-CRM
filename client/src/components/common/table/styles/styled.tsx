import { Box, Button, styled } from "@mui/material";

export const PaginationContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px 0;
  gap: 14px;
`;

export const PaginationBlock = styled(Box)`
  display: flex;
  gap: 6px;
`;

export const PageBlock = styled(Box)`
  display: flex;
`;

export const ButtonStyled = styled(Button)`
  color: inherit;
  border-color: inherit;
`;
