import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./utils/scroll-to-top";
import AppLoader from "./hoc/app-loader";
import { ConfirmProvider } from "material-ui-confirm";
import Main from "./layouts/main";
import { ColorModeContext, useMode } from "./theme";
import TopBar from "./components/UI/topbar/topbar";
import Sidebar from "./components/UI/sidebar/sidebar";
import Objects from "./layouts/objects/objects";
import { AppStyled, RightSide } from "./styled";
import Login from "./layouts/login/login";
import Signup from "./layouts/signup";
import ObjectPage from "./components/pages/object/object-page";
import CreateObject from "./components/pages/create-object/create-object";
import UpdateObject from "./components/pages/update-object/update-object";
import "./styles.css";
import ObjectsOnMap from "./layouts/objects-on-map/objects-on-map";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ConfirmProvider>
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

                  <Route path="objects">
                    <Route index element={<Objects />} />
                    <Route path={":objectId/"} element={<ObjectPage />} />
                    <Route path={"create"} element={<CreateObject />} />
                    <Route path={":objectId/edit"} element={<UpdateObject />} />
                    <Route path="*" element={<Navigate to="/objects" />} />
                  </Route>

                  <Route path="map">
                    <Route index element={<ObjectsOnMap />} />
                    {/* <Route path="*" element={<Navigate to="/map" />} /> */}
                  </Route>
                </Routes>
              </RightSide>
            </AppStyled>
          </AppLoader>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ConfirmProvider>
  );
}

export default App;
