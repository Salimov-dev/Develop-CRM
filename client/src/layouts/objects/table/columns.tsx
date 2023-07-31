import { useSelector } from "react-redux";
// libraries
import dayjs from "dayjs";
// MUI
import { Button } from "@mui/material";
// store
import { getMetroName } from "../../../store/metro-store";
import {
  FormatDate,
  FormatDistrict,
  FormatManagerName,
  FormatMetro,
  FormatObjectStatus,
} from "./helpers/helpers";
import { getUserById } from "../../../store/users-store";

export const groupedColumns = [
  {
    header: "Основная информация",
    columns: [
      {
        accessorKey: "created_at",
        header: "Дата",
        cell: (info) => {
          return FormatDate(new Date(info.getValue()));
        },
        footer: "Дата",
      },
      {
        accessorKey: "userId",
        header: "Менеджер",
        cell: (info) => {
          return FormatManagerName(info.getValue());
        },
        footer: "Менеджер",
      },
    ],
  },
  {
    header: "Расположение объекта",
    columns: [
      {
        accessorKey: "location.city",
        header: "Город",
        cell: (info) => info.getValue(),
        footer: "Город",
      },
      {
        accessorKey: "location.district",
        header: "Район",
        // cell: (info) => info.getValue(),
        cell: (info) => {
          return FormatDistrict(info.getValue());
        },
        footer: "Дата",
      },
      {
        accessorKey: "location.metro",
        header: "Метро",
        cell: (info) => {
          return FormatMetro(info.getValue());
        },
        footer: "Дата",
      },
      {
        accessorKey: "location.address",
        header: "Адрес",
        cell: (info) => info.getValue(),
        footer: "Дата",
      },
    ],
  },

  {
    header: "Контактная информация",
    columns: [
      {
        accessorKey: "contact.phone",
        header: "Телефон",
        cell: (info) => info.getValue(),
        footer: "Телефон",
      },
      {
        accessorKey: "contact.name",
        header: "Имя",
        cell: (info) => info.getValue(),
        footer: "Имя",
      },
      //   {
      //     accessorKey: "",
      //     header: "Последний контакт",
      //     cell: (info) => info.getValue(),
      //     footer: "Последний контакт",
      //   },
      {
        accessorKey: "",
        header: "Последний контакт",
        cell: (info) => info.getValue(),
        footer: "Последний контакт",
      },
    ],
  },
  {
    header: "Другое",
    columns: [
      {
        accessorKey: "status",
        header: "Статус",
        cell: (info) => {
          return FormatObjectStatus(info.getValue());
        },
        footer: "Статус",
      },
      //   {
      //     accessorKey: "description.comment",
      //     header: "Описание",
      //     cell: (info) => info.getValue(),
      //     footer: "Описание",
      //   },
      {
        accessorKey: "",
        header: "Открыть",
        cell: () => (
          <Button variant="text" color="secondary">
            Открыть
          </Button>
        ),
        footer: "Открыть",
      },
    ],
  },
];
