import React, { useState } from "react";
import Header from "../components/Header";
import { DepartmentInterface, PostReturnedDataType } from "../types";
import { usePostFetch } from "../hooks/useFetch";
import useForm from "../hooks/useForm";

const Departments = (): JSX.Element => {
  const initialFormValues: Partial<DepartmentInterface> = {};
  const { formValues, handleChange, clearForm } =
    useForm<Partial<DepartmentInterface>>(initialFormValues);
  const { data, error, saveFetch, deleteFetch } =
    usePostFetch("api/departments/");

  const handleSave = () => {
    const department = {
      data: {
        name: formValues.name,
      },
    };
    saveFetch(department, data?.id);
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
          <div className="bg-gray-100">
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <div>
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="mt-5 md:col-span-3 md:mt-0">
                    <form action="#" method="POST">
                      <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-1">
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Código
                              </label>
                              <input
                                readOnly={true}
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={formValues.id}
                              />
                            </div>

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
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                          <button
                            type="button"
                            onClick={() => handleSave()}
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteFetch(data?.id)}
                            className="inline-flex justify-center rounded-md border border-transparent bg-red-600	 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </form>
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
