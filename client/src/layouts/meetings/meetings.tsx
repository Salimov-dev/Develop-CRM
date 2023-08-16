// libraries
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ButtonsBlock from "./components/buttons-block";

const Meetings = () => {
  return (
    <Box>
      <h1>Встречи</h1>
      <ButtonsBlock/>
    </Box>
  );
};

export default Meetings;
