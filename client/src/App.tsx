import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
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
import Objects from "./layouts/objects";
import { AppStyled, RightSide } from "./styled";
import Login from "./layouts/login/login";
import Signup from "./layouts/signup";

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
                <Route index path="objects" element={<Objects />} />

                <Route path="auth" element={<Login />}>
                  <Route index element={<Navigate to="/auth/login" />} />
                  <Route path={"login"} element={<Login />} />
                  <Route path="*" element={<Navigate to="" />} />
                </Route>

                <Route path="auth" element={<Signup />}>
                  <Route index element={<Navigate to="/auth/SignUp" />} />
                  <Route path={"signup"} element={<Signup />} />
                  <Route path="*" element={<Navigate to="" />} />
                </Route>
              </Routes>
            </RightSide>
          </AppStyled>
        </AppLoader>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
