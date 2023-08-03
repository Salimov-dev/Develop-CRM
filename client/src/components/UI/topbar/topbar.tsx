import { ColorModeContext, tokens } from "../../../theme";
import { Box, IconButton, useTheme, Button } from "@mui/material";
import { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Component, LeftSide, RightSide, SearchField } from "./styled/styled";
import UserMenu from "./components/user-menu";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/loader/loader";
import { useSelector } from "react-redux";
import {
  getCurrentUserData,
  getUsersLoadingStatus,
} from "../../../store/users-store";

const TopBar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const currentUser = useSelector(getCurrentUserData());
  const isLoading = useSelector(getUsersLoadingStatus());
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("auth/login");
  };

  return (
    <Component>
      <Box sx={{ m: "auto 0" }}>Место для наиболее частых функций</Box>
      <RightSide>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>

        {!isLoading ? (
          <>
            {currentUser ? (
              <UserMenu currentUser={currentUser} />
            ) : (
              <Button
                variant="contained"
                onClick={handleGoToLogin}
                color="success"
                // sx={{ color: "inherit", borderColor: "inherit" }}
              >
                Войти
              </Button>
            )}
          </>
        ) : (
          <Loader />
        )}
      </RightSide>
    </Component>
  );
};

export default TopBar;
