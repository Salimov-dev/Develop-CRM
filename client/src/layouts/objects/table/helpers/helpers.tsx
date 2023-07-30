import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { getUserById } from "../../../../store/users-store";
import { getDistrictById } from "../../../../store/districts-store";
import { getObjectStatusById } from "../../../../store/object-status.store";
import { getMetroName } from "../../../../store/metro-store";

export const FormatDate = (date) => {
  return dayjs(date).format("DD.MM.YY");
};

export const FormatManagerName = (id) => {
  return useSelector(getUserById(id));
};

export const FormatDistrict = (id) => {
  return useSelector(getDistrictById(id));
};

export const FormatObjectStatus = (id) => {
  return useSelector(getObjectStatusById(id));
};

export const FormatMetro = (id) => {
  return useSelector(getMetroName(id));
};
