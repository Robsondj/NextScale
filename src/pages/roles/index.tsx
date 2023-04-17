import Header from "../../components/Header";
import { RoleDepartmentInterface, ColumnsType } from "../../types";
import { usePostFetch } from "../../hooks/useFetch";
import useFetchRoles from "../../hooks/useFetchRoles";
import TableList from "../../components/TableList";

const Roles = (): JSX.Element => {
  const { data, success, loading, error, saveFetch, deleteFetch } =
    usePostFetch("role-departments/");
  const { roles } = useFetchRoles();

  const columns: Array<ColumnsType<RoleDepartmentInterface>> = [
    {
      header: "#",
      field: ({ id }) => id.toString(),
    },
    {
      header: "Nome",
      field: ({ name }) => name,
    },
    {
      header: "Departamento",
      field: ({ department }) => department.name,
    },
  ];

  return (
    <>
      <div className="min-h-full">
        <Header></Header>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Função
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
                      {loading && <div>Loading...</div>}
                      {error && <div>Something went wrong</div>}
                      {roles && (
                        <TableList
                          columns={columns}
                          data={roles}
                          handleClick={(item) => item}
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

export default Roles;
