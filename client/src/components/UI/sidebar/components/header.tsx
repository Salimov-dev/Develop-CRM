import { MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Header = ({ isCollapsed, setIsCollapsed, colors }) => {
  return (
    <MenuItem
      onClick={() => setIsCollapsed(!isCollapsed)}
      icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
      style={{
        margin: "10px 0 10px 0",
        color: colors.grey[100],
      }}
    >
      {!isCollapsed && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          ml="15px"
          sx={{ marginLeft: "8px" }}
        >
          <Typography variant="h3" color={colors.grey[100]}>
            CRM
          </Typography>
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            <MenuOutlinedIcon />
          </IconButton>
        </Box>
      )}
    </MenuItem>
  );
};

export default Header;
