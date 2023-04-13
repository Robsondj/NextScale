import { ScaleType, UseFetchScalesType, ColumnsType } from "../../types";
import useFetchScales from "../../hooks/useFetchScales";
import DashboardDetail from "../../components/DashboardDetail";
import TableList from "../TableList";
import { useEffect, useState } from "react";

const DashboardList = (): JSX.Element => {
  const { scales, error, loading }: UseFetchScalesType = useFetchScales();
  const [scaleDetail, setScaleDetail] = useState<ScaleType>();

  useEffect(() => {
    setScaleDetail(scales[0]);
  }, [scales]);

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
              {scales && (
                <TableList
                  columns={columns}
                  data={scales}
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
