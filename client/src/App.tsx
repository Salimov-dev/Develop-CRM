import { CssBaseline, ThemeProvider } from "@mui/material";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styled from "@emotion/styled";
import ScrollToTop from "./utils/scroll-to-top";
import AppLoader from "./hoc/app-loader";
import Main from "./layouts/main";
import { ColorModeContext, useMode } from "./theme";

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
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppStyled>
          <AppLoader>
            <BrowserRouter>
              <ScrollToTop />
              <Main />
            </BrowserRouter>
          </AppLoader>
        </AppStyled>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
