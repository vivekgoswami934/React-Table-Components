import { useMemo, useState } from "react";
import { mockData } from "./utils/mock-data";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { DateTime } from "luxon";

const BasicTable = ({ data, columns }) => {
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

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  /** @type import('@tanstack/react-table').ColumnDef<any>*/

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="w3-container">
      <div>
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <table className="w3-table-all">
        <thead>
          {table.getHeaderGroups().map((headerGrp) => (
            <tr key={headerGrp.id}>
              {headerGrp.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {
                    { asc: "asc", desc: "desc" }[
                      header.column.getIsSorted() ?? null
                    ]
                  }
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
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
        >
          First PAGE
        </button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          PREV PAGE
        </button>
        <button>
          <strong>
            {table.getState().pagination.pageIndex + 1} 
          </strong>
          {" "}of{" "}
          <strong>
            {table.getPageCount()}
          </strong>
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          NEXT PAGE
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          LAST PAGE
        </button>
      </div>
    </div>
  );
};

export default BasicTable;
