import { ColorModeContext, tokens, useMode } from "../../../theme";
import { Box, IconButton, useTheme, InputBase } from "@mui/material";
import { useContext } from "react";
import styled from "@emotion/styled";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 2px;
`;

const LeftSide = styled(Box)`
  display: flex;
  border-radius: 3px;
  padding: 4px;
`;

const SearchField = styled(InputBase)`
  flex: 1;
  margin-left: 1px;
`;

const RightSide = styled(Box)`
  display: flex;
`;

const TopBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <Component>
      <LeftSide backgroundColor={colors.primary[400]}>
        <SearchField placeholder="Найти объект" />
        <IconButton type="button">
          <SearchIcon />
        </IconButton>
      </LeftSide>
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
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </RightSide>
    </Component>
  );
};

export default TopBar;
