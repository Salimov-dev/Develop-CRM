import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const COLUMNS = [
    columnHelper.accessor('Дата', {
        id: "created_at",
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
//   {
//     Header: "Дата",
//     accessor: "created_at",
//   },
//   {
//     Header: "Менеджер",
//     accessor: "userId",
//   },
//   {
//     Header: "Город",
//     accessor: "location.city",
//   },
//   {
//     Header: "Район",
//     accessor: "location.district",
//   },
//   {
//     Header: "Метро",
//     accessor: "location.metro",
//   },
//   {
//     Header: "Адрес",
//     accessor: "location.address",
//   },
//   {
//     Header: "Статус",
//     accessor: "status",
//   },
//   {
//     Header: "Комментарий",
//     accessor: "description.comment",
//   },
//   {
//     Header: "Телефон",
//     accessor: "contact.phone",
//   },
//   {
//     Header: "Контакт",
//     accessor: "contact.name",
//   },
//   {
//     Header: "Последний контакт",
//     accessor: "created_at",
//   },
//   {
//     Header: "Открыть",
//     // accessor: "created_at"
//   },
];
