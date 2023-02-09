import { ScaleType, UseFetchScalesType } from "../../types";
import useFetchScales from "../../hooks/useFetchScales";
import DashboardDetail from "../../components/DashboardDetail";
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

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Departamento
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Função
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading && <div>Loading...</div>}
                  {error && <div>Something went wrong</div>}
                  {scales &&
                    scales.map((item) => (
                      <tr
                        key={item.id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        onClick={() => handleDashBoardDetail(item)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.id}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.department.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.people[0].role.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.date}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {scaleDetail && <DashboardDetail scale={scaleDetail} />}
    </>
  );
};

export default DashboardList;
