
import Logo from "../assets/svetofor-logo.png";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  styled,
  Divider,
} from "@mui/material";

const CompanyLogo = ({ colors }) => {
  return (
    <Box mb="25px">
      <Box textAlign="center" mb={2}>
        <Typography variant="h5" color={colors.greenAccent[500]}>
          ООО "Восторг-76"
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <img
          alt="profile-user"
          width="100px"
          height="100px"
          src={Logo}
          style={{
            cursor: "pointer",
            borderRadius: "50%",
            marginBottom: "12px",
          }}
        />
      </Box>
    </Box>
  );
};

export default CompanyLogo;
