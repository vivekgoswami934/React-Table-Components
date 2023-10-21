import { useMemo } from "react";
import BasicTable from "./Components/BasicTable";
import { mockData } from "./Components/utils/mock-data";
import { DateTime } from "luxon";

function App() {
  const data = useMemo(() => mockData, []);

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

  return (
    <div className="App">
      <header>
        <h1> React-TanStack-Table-Components</h1>
      </header>
      <section>
        <BasicTable data={data} columns={columns} />
      </section>
    </div>
  );
}

export default App;
