import styled from "@emotion/styled";
import { Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Account = styled(Box)`
  display: flex;
  gap: 6px;
`;

const LinkStyled = styled(Link)`
  cursor: pointer;
  color: #6870fa;
`;

const AccountLogin = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("signup");
  };
  return (
    <Account>
      <Typography>Нет аккаунта?</Typography>
      <LinkStyled onClick={handleClick}>Зарегистрироваться</LinkStyled>
    </Account>
  );
};

export default AccountLogin;
