const DashboardDetail = () => {
  const scaleObject = {
    id: 1,
    department: "Música",
    role: "Vocal",
    date: "Domingo 18/12/2022",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  };
  return (
    <div
      id="scale"
      className="rounded-lg border-4 border-dashed border-gray-200 bg-gray-200"
    >
      <div className="h-[90%] text-3xl grid grid-cols-1 divide-y">
        <div className="ml-2 mt-2">Departamento: {scaleObject.department}</div>
        <div className="ml-2 mt-2">Função: {scaleObject.role}</div>
        <div className="ml-2 mt-2">Data: {scaleObject.date}</div>
        <div className="ml-2 mt-2">
          Observação: {scaleObject.description.substring(0, 50)}
        </div>
      </div>
    </div>
  );
};

export default DashboardDetail;
