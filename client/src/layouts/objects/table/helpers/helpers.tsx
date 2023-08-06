import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { getUserNameById } from "../../../../store/users.store";
import { getDistrictById } from "../../../../store/districts.store";
import { getObjectStatusNameById } from "../../../../store/object-status.store";
import { getMetroName } from "../../../../store/metro.store";
import { enterPhoneFormat } from "../../../../utils/enter-phone-format";
import { Box, Button, styled, Snackbar, Alert } from "@mui/material";

export const FormatDate = (date) => {
  return dayjs(date).format("DD.MM.YY");
};

export const FormatManagerName = (id) => {
  return useSelector(getUserNameById(id));
};

export const FormatPhone = (num) => {
  return <Box sx={{whiteSpace: "nowrap" }}>{enterPhoneFormat(num)}</Box> 
};

export const FormatDistrict = (id) => {
  return useSelector(getDistrictById(id));
};

export const FormatObjectStatus = (id) => {
  return useSelector(getObjectStatusNameById(id));
};

export const FormatMetro = (id) => {
  return useSelector(getMetroName(id));
};


