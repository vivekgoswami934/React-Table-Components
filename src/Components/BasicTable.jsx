import { useMemo } from "react";
import { mockData } from "./utils/mock-data";
import {
  useReactTable,
  flexRender,
  getCoreRowModel, getPaginationRowModel
} from "@tanstack/react-table";
import { DateTime } from "luxon";

const BasicTable = () => {
  // {
  //     id: 1,
  //     name: 'User 1',
  //     place: 'Place 1',
  //     dob: '1990-05-15',
  //     city: 'City 1',
  //     phone: '+1-555-555-0001',
  //     additionalKey1: 'Additional Key 1 for User 1',
  //     additionalKey2: 'Additional Key 2 for User 1',
  //   }

  const data = useMemo(() => mockData, []);

  /** @type import('@tanstack/react-table').ColumnDef<any>*/
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      footer: "ID",
    },
    {
      header: "NAME",
      accessorKey: "name",
      footer: "NAME",
    },
    {
      header: "PLACE",
      accessorKey: "place",
      footer: "PLACE",
    },
    {
      header: "DOB",
      accessorKey: "dob",
      footer: "DOB",
      cell: (info) =>
        DateTime.fromISO(info.getValue()).toLocaleString(
          DateTime.DATE_MED_WITH_WEEKDAY
        ),
    },
    {
      header: "CITY",
      accessorKey: "city",
      footer: "CITY",
    },
    {
      header: "PHONE",
      accessorKey: "phone",
      footer: "PHONE",
    },
    {
      header: "ADDITIONALKEY1",
      accessorKey: "additionalKey1",
      footer: "ADDITIONALKEY1",
    },
    {
      header: "ADDITIONALKEY2",
      accessorKey: "additionalKey2",
      footer: "ADDITIONALKEY2",
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), getPaginationRowModel : getPaginationRowModel()
  });

  return (
    <div className="w3-container">
      <table className="w3-table-all">
        <thead>
          {table.getHeaderGroups().map((headerGrp) => (
            <tr key={headerGrp.id}>
              {headerGrp.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
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
        {/* <tfoot>
          <tr>
            <td>ID</td>
          </tr>
        </tfoot> */}
      </table>
      <div>
        <button disabled={!table.getCanPreviousPage()} onClick={()=>table.setPageIndex(0)}>First PAGE</button>
        <button disabled={!table.getCanPreviousPage()} onClick={()=>table.previousPage() }>PREV PAGE</button>
        <button disabled={!table.getCanNextPage()} onClick={()=> table.nextPage() }>NEXT PAGE</button>
        <button disabled={!table.getCanNextPage()} onClick={()=>table.setPageIndex(table.getPageCount() - 1)}>LAST PAGE</button>
      </div>
    </div>
  );
};

export default BasicTable;
