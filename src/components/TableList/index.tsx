import { ColumnsType } from "../../types";

type PropsType<T> = {
  columns: Array<ColumnsType<T>>;
  data: Array<T>;
  handleClick: (arg: T) => void;
};

const TableList = <T extends unknown>({
  columns,
  data,
  handleClick,
}: PropsType<T>): JSX.Element => {
  return (
    <table className="min-w-full">
      <thead className="bg-white border-b">
        <tr>
          {columns.map((column, idx) => (
            <th
              key={idx}
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item: T, idx_item) => (
          <tr
            key={idx_item}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            onClick={() => handleClick(item)}
          >
            {columns.map((column, idx_column) => (
              <td
                key={idx_column}
                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
              >
                {column.field(item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableList;
