import { Box } from "@mui/material";
import styled from "@emotion/styled";

export const AppStyled = styled(Box)`
  display: flex;
  height: 100vh;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 100vw;
  }

  ::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 100vw;
  }
`;

export const RightSide = styled(Box)`
  padding: 0 20px;
  width: 100%;
`;