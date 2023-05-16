import {
  RoleDepartmentInterface,
  RepositoryInterface,
  GenericObjectWithId,
  PeopleInterface,
  PeopleWithPasswordInterface,
  ProfileInterface,
} from "../../../types";
import useForm from "../../../hooks/useForm";
import {
  NotificationSuccess,
  NotificationError,
} from "../../../components/Notification";
import { useRouter } from "next/router";
import { useEffect } from "react";
import peopleRepository from "../../../repositories/peopleRepository";
import roleDepartmentRepository from "../../../repositories/roleDepartmentRepository";
import { useFetchAll } from "../../../hooks/useFetch";
import profileRepository from "../../../repositories/profileRepository";

type PropsType = {
  useFetch: <T extends GenericObjectWithId>(
    repository: RepositoryInterface<T>
  ) => any;
};

const PeopleForm = ({ useFetch }: PropsType): JSX.Element => {
  const initialFormValues: Partial<PeopleWithPasswordInterface> = {};
  const { formValues, handleChange, handleChangeSelect, setFormValues } =
    useForm<Partial<PeopleWithPasswordInterface>>(initialFormValues);

  const { success, loading, error, fetchAction } =
    useFetch<PeopleInterface>(peopleRepository);

  const { data: roles } = useFetchAll<RoleDepartmentInterface>(
    roleDepartmentRepository
  );

  const { data: profiles } = useFetchAll<ProfileInterface>(profileRepository);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query?.id) {
      peopleRepository
        .getById(parseInt(Array.isArray(query.id) ? query.id[0] : query.id))
        .then((data) => {
          setFormValues(data);
        });
    }
  }, [query, setFormValues]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.push("/people/");
      }, 3000);
    }
  }, [success, router]);

  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div>
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="mt-5 md:col-span-3 md:mt-0">
                {loading && <div>Loading...</div>}
                {!loading && <NotificationSuccess message={success} />}
                {!loading && <NotificationError message={error} />}
                <form action="#" method="POST">
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nome
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="name"
                            value={formValues.name}
                            onChange={(event) => handleChange(event.target)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            autoComplete="email"
                            value={formValues.email}
                            onChange={(event) => handleChange(event.target)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="password"
                            value={formValues.password}
                            onChange={(event) => handleChange(event.target)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Função
                          </label>
                          <select
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={formValues.role?.id}
                            name="role"
                            onChange={(event) =>
                              handleChangeSelect<RoleDepartmentInterface>(
                                event.target,
                                roles ?? []
                              )
                            }
                          >
                            {roles &&
                              roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                  {role.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Perfil
                          </label>
                          <select
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={formValues.profile?.id}
                            name="profile"
                            onChange={(event) =>
                              handleChangeSelect<ProfileInterface>(
                                event.target,
                                profiles ?? []
                              )
                            }
                          >
                            {profiles &&
                              profiles.map((profile) => (
                                <option key={profile.id} value={profile.id}>
                                  {profile.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="button"
                        onClick={() => fetchAction(formValues)}
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeopleForm;
