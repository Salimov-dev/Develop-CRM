// libraries
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// MUI
import styled from "@emotion/styled";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
// store
// import { logOut } from "../../../entities/user/store/users-store";

const Component = styled(Box)`
  display: flex;
  gap: 12px;
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
    navigate(`/user/${currentUser._id}`);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    // dispatch(logOut());
    navigate("/");
  };

  return (
    <Component>
      <Box
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {/* <Avatar src={currentUser.image} /> */}
        {/* <UserName>{currentUser.name}</UserName> */}
        <UserName>Руслан</UserName>
      </Box>
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
