import {
  FormatDate,
  FormatDistrict,
  FormatManagerName,
  FormatMetro,
  FormatObjectStatus,
  FormatPhone,
} from "./helpers/helpers";
import OpenButton from "./helpers/open-button";

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
      },
      {
        accessorKey: "userId",
        header: "Менеджер",
        cell: (info) => {
          return FormatManagerName(info.getValue());
        },
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
      },
      {
        accessorKey: "location.district",
        header: "Район",
        cell: (info) => {
          return FormatDistrict(info.getValue());
        },
      },
      {
        accessorKey: "location.metro",
        header: "Метро",
        cell: (info) => {
          const metroValue = info.getValue()
          return metroValue !== undefined ? FormatMetro(metroValue) : "";
        },
      },
      {
        accessorKey: "location.address",
        header: "Адрес",
        cell: (info) => info.getValue(),
      },
    ],
  },

  {
    header: "Контактная информация",
    columns: [
      {
        accessorKey: "contact.phone",
        header: "Телефон",
        cell: (info) => FormatPhone(info.getValue()) ,
      },
      {
        accessorKey: "contact.name",
        header: "Имя",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "",
        header: "Последний контакт",
        cell: (info) => info.getValue(),
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
      },
      {
        accessorKey: "_id",
        header: "Ссылка",
        enableSorting: false,
        cell: (info) => <OpenButton objectId={info.getValue()} />,
      },
    ],
  },
];
