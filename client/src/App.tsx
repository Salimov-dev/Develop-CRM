import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import ScrollToTop from "./utils/scroll-to-top";
import AppLoader from "./hoc/app-loader";
import Main from "./layouts/main";

const AppStyled = styled(Box)`
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

function App() {
  return (
    <AppStyled>
      <AppLoader>
        <CssBaseline />
        <BrowserRouter>
          <ScrollToTop />
         <Main/>
        </BrowserRouter>
      </AppLoader>
    </AppStyled>
  );
}

export default App;
