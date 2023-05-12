import { ScaleType, UseFetchArrayType, ColumnsType } from "../../types";
import { useFetchAll } from "../../hooks/useFetch";
import DashboardDetail from "../../components/DashboardDetail";
import TableList from "../TableList";
import { useEffect, useState } from "react";
import scaleRepository from "../../repositories/scaleRepository";

const DashboardList = (): JSX.Element => {
  const { data, error, loading }: UseFetchArrayType<ScaleType> =
    useFetchAll<ScaleType>(scaleRepository);
  const [scaleDetail, setScaleDetail] = useState<ScaleType>();

  useEffect(() => {
    setScaleDetail(data?.[0]);
  }, [data]);

  const handleDashBoardDetail = (item: ScaleType) => {
    setScaleDetail(item);
  };

  const columns: Array<ColumnsType<ScaleType>> = [
    {
      header: "#",
      field: ({ id }) => id.toString(),
    },
    {
      header: "Departamento",
      field: ({ department }) => department.name,
    },
    {
      header: "Função",
      field: ({ people }) => people[0].role.name,
    },
    {
      header: "Data",
      field: ({ date }) => date,
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {loading && <div>Loading...</div>}
              {error && <div>Something went wrong</div>}
              {data && (
                <TableList
                  columns={columns}
                  data={data}
                  handleClick={handleDashBoardDetail}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {scaleDetail && <DashboardDetail scale={scaleDetail} />}
    </>
  );
};

export default DashboardList;
