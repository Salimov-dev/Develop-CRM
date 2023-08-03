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
import Objects from "./layouts/objects/objects";
import { AppStyled, RightSide } from "./styled";
import Login from "./layouts/login/login";
import Signup from "./layouts/signup";
import { Scrollbar } from "react-scrollbars-custom";
import ObjectPage from "./components/pages/object/object-page";
import EditObject from "./components/pages/edit-object/edit-object";
import CreateObject from "./components/pages/create-object/create-object";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Scrollbar style={{ width: "100%", height: "100vh" }}>
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
                    {/* <Route path={":objectId/edit"} element={<NoteEdit />} /> */}
                    <Route path="*" element={<Navigate to="" />} />
                  </Route>
                </Routes>
              </RightSide>
            </AppStyled>
          </AppLoader>
        </Scrollbar>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
