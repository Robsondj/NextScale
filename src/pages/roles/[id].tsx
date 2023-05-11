import Header from "../../components/Header";
import RoleDepartmentForm from "../../components/Forms/RoleDepartmentForm";
import { useFetchPut } from "../../hooks/useFetchWithRepository";

const Roles = (): JSX.Element => {
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
          <RoleDepartmentForm useFetch={useFetchPut} />
        </main>
      </div>
    </>
  );
};

export default Roles;
