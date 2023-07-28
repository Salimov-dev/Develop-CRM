import {
  Box,
  IconButton,
  Typography,
  useTheme,
  styled,
  Divider,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { tokens } from "../../../../theme";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

export default Item;
