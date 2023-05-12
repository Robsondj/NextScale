import Header from "../../components/Header";
import DepartmentForm from "../../components/Forms/DepartmentForm";
import { useFetchPut } from "../../hooks/useFetch";

const Departments = (): JSX.Element => {
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
          <DepartmentForm useFetch={useFetchPut} />
        </main>
      </div>
    </>
  );
};

export default Departments;
