// import { COLUMNS } from "./columns";
import { useSelector } from "react-redux";
import { getObjectsList } from "../../../store/objects.store";
import { useMemo } from "react";
import "./table.css";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("created_at", {
    header: "Дата",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("userId", {
    header: "Менеджер",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("location.city", {
    header: "Город",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("location.district", {
    header: "Район",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("location.metro", {
    header: "Метро",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("location.address", {
    header: "Адрес",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Статус",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description.comment", {
    header: "Комментарий",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("contact.phone", {
    header: "Телефон",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("contact.name", {
    header: "Контакт",
    cell: (info) => info.getValue(),
  }),
  //   columnHelper.accessor("created_at", {
  //     header: "Последний контакт",
  //     cell: (info) => info.getValue(),
  //   }),
  //   columnHelper.accessor("", {
  //     header: "Открыть",
  //     cell: (info) => info.getValue(),
  //   }),
];

const BasicTable = () => {
  const objects = useSelector(getObjectsList());
  const data = useMemo(() => objects || [], [objects]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};

export default BasicTable;
