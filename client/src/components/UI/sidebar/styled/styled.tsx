import { Box, styled } from "@mui/material";

export const Component = styled(Box)`
  ::-webkit-scrollbar {
    width: 0px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 100vw;
  }

  ::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 100vw;
  }
`;

export const ItemsListContainer = styled(Box)`
  height: 100vh;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 100vw;
  }

  ::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 100vw;
  }
`;
