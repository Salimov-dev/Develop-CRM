import { Box, Typography } from "@mui/material";

const ObjectDescription = ({ object }) => {
  return (
    <Box>
      <h3>Описание объекта:</h3>
      <Typography>{object?.description.comment}</Typography>
    </Box>
  );
};

export default ObjectDescription;
