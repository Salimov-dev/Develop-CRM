import { CssBaseline, ThemeProvider } from "@mui/material";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styled from "@emotion/styled";
import ScrollToTop from "./utils/scroll-to-top";
import AppLoader from "./hoc/app-loader";
import Main from "./layouts/main";
// import Objects from "./layouts/objects";
// import Meetings from "./layouts/meetings";
// import Presentations from "./layouts/poresentations";
// import Managers from "./layouts/managers";
// import Materials from "./layouts/materials";
import { ColorModeContext, useMode } from "./theme";
import TopBar from "./components/UI/topbar/topbar";
import Sidebar from "./components/UI/sidebar/sidebar";

const AppStyled = styled(Box)`
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

const RightSide = styled(Box)`
  width: 100%;
`;

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLoader>
          <ScrollToTop />
          <AppStyled>
            <Sidebar />
            <RightSide>
              <TopBar />
              <Routes>
                <Route index path="" element={<Main />} />
              </Routes>
            </RightSide>
          </AppStyled>
        </AppLoader>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
