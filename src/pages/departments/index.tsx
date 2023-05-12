import Header from "../../components/Header";
import { ColumnsType, DepartmentInterface } from "../../types";
import { useFetchAll } from "../../hooks/useFetch";
import TableList from "../../components/TableList";
import { useRouter } from "next/router";
import departmentRepository from "../../repositories/departmentRepository";

const Departments = (): JSX.Element => {
  const { data, error, loading } =
    useFetchAll<DepartmentInterface>(departmentRepository);
  const router = useRouter();

  const columns: Array<ColumnsType<DepartmentInterface>> = [
    {
      header: "#",
      field: ({ id }) => id.toString(),
    },
    {
      header: "Nome",
      field: ({ name }) => name,
    },
  ];

  const handleClick = (item: DepartmentInterface) => {
    router.push(`/departments/${item.id}`);
  };

  return (
    <>
      <div className="min-h-full">
        <Header></Header>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Departamentos
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 ">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <button
                        type="button"
                        onClick={() => router.push("/departments/new/")}
                        className="inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                      >
                        New
                      </button>
                      {loading && <div>Loading...</div>}
                      {error && <div>Something went wrong</div>}
                      {data && (
                        <TableList
                          columns={columns}
                          data={data}
                          handleClick={handleClick}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Departments;
