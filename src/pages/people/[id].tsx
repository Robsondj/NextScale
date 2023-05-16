import Header from "../../components/Header";
import PeopleForm from "../../components/Forms/PeopleForm";
import { useFetchPut } from "../../hooks/useFetch";

const People = (): JSX.Element => {
  return (
    <>
      <div className="min-h-full">
        <Header></Header>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Pessoas
            </h1>
          </div>
        </header>
        <main>
          <PeopleForm useFetch={useFetchPut} />
        </main>
      </div>
    </>
  );
};

export default People;
