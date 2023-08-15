// libraries
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// layouts
import Presentations from "./layouts/presentations/presentations";
import ObjectsOnMap from "./layouts/objects-on-map/objects-on-map";
import Login from "./layouts/login/login";
import Signup from "./layouts/signup";
import Profile from "./layouts/profile/profile";
import Main from "./layouts/main";
import Objects from "./layouts/objects/objects";
// components
import UpdateProfile from "./components/pages/update-profile/update-profile";
import ObjectPage from "./components/pages/object/object-page";
import CreateObject from "./components/pages/create-object/create-object";
import UpdateObject from "./components/pages/update-object/update-object";
import TopBar from "./components/UI/topbar/topbar";
import Sidebar from "./components/UI/sidebar/sidebar";
// styled
import { AppStyled, RightSide } from "./styled";
import "./styles.css";
// other
import ScrollToTop from "./utils/scroll-to-top";
import AppLoader from "./hoc/app-loader";
import { ColorModeContext, useMode } from "./theme";
import Users from "./layouts/users/users";
import CreateManager from "./components/pages/create-manager/create-manager";
import UpdateManager from "./components/pages/update-manager/update-manager";

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

                <Route path="users">
                  <Route index element={<Users />} />
                  <Route path="create" element={<CreateManager />} />
                  <Route path=":userId?/edit" element={<UpdateManager />} />
                  <Route path="*" element={<Navigate to="/users" />} />
                </Route>

                <Route path="profile" element={<Profile />}>
                  <Route index element={<Navigate to="/profile" />} />
                  <Route
                    path=":userId?/profileUpdate"
                    element={<UpdateProfile />}
                  />
                  <Route path="*" element={<Navigate to="/profile" />} />
                </Route>

                <Route path="objects">
                  <Route path={":objectId/"} element={<ObjectPage />} />
                  <Route path={"create"} element={<CreateObject />} />
                  <Route path={":objectId/edit"} element={<UpdateObject />} />
                  <Route path="*" element={<Navigate to="/objects" />} />
                </Route>

                <Route path="map">
                  <Route index element={<ObjectsOnMap />} />
                  <Route path="*" element={<Navigate to="/map" />} />
                </Route>

                <Route path="presentations">
                  <Route index element={<Presentations />} />
                  <Route path="*" element={<Navigate to="/presentations" />} />
                </Route>
              </Routes>
            </RightSide>
          </AppStyled>
        </AppLoader>
      </ThemeProvider>
      <ToastContainer />
    </ColorModeContext.Provider>
  );
}

export default App;
