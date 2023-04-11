import { getProperty } from "../../utils";

type ColumnsType = {
  dataKey: string;
  header: string;
};

type TableListProps = {
  columns: Array<ColumnsType>;
  data: Array<Object>;
};

const TableList = ({ columns, data }: TableListProps): JSX.Element => {
  return (
    <table className="min-w-full">
      <thead className="bg-white border-b">
        <tr>
          {columns.map((column: ColumnsType) => (
            <th
              key={column.header}
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item: Object, key: number) => (
          <tr
            key={getProperty(item, columns[0].dataKey)}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            // onClick={() => handleDashBoardDetail(item)}
          >
            {columns.map((column: ColumnsType) => (
              <td
                key={`${getProperty(item, columns[0].dataKey)}_${getProperty(
                  item,
                  column.dataKey
                )}`}
                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
              >
                {getProperty(item, column.dataKey)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableList;
