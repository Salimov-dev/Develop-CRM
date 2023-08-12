// MUI
import { Box, Button, Menu, MenuItem, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users.store";

const Avatar = styled(`img`)({
  width: "200px",
  borderRadius: "20px",
});

const Profile = () => {
  const user = useSelector(getCurrentUserData());
  console.log("user", user);

  return (
    <Box>
      <h1>Мой профиль: {user.name}</h1>
      <Box>
        <Avatar src={user.image} alt="" />
      </Box>
      <Button variant="outlined" color="success">
        Загрузить аватарку
      </Button>
    </Box>
  );
};

export default Profile;
