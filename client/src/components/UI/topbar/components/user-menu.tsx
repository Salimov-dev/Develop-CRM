// libraries
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// MUI
import { Box, Button, Menu, MenuItem, Typography, styled } from "@mui/material";
// store
import { logOut } from "../../../../store/users.store";

const Component = styled(Box)`
  display: flex;
  gap: 12px;
  margin-left: 0px;
`;

const UserName = styled(Typography)`
  color: gray;
`;

const Avatar = styled(`img`)({
  width: "30px",
  borderRadius: "50%",
  marginRight: "10px",
});

const UserMenu = ({ currentUser }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenProfile = () => {
    setAnchorEl(null);
    navigate("profile");
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    dispatch(logOut());
    navigate("/");
  };

  return (
    <Component>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          "&:hover *": {
            color: "white",
          },
        }}
      >
        <Avatar src={currentUser.image} />
        <UserName
          sx={{
            color: open ? "white !important" : "inherit",
          }}
        >
          {currentUser.name}
        </UserName>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleOpenProfile}>Профиль</MenuItem>
        <MenuItem onClick={handleLogOut}>Выйти</MenuItem>
      </Menu>
    </Component>
  );
};

export default UserMenu;
