import { ScaleType } from "../../types";

type ScaleProps = {
  scale: ScaleType;
};

const DashboardDetail = ({ scale }: ScaleProps): JSX.Element => {
  return (
    <div className="flex justify-center mt-6">
      {scale && (
        <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg min-w-[50%]">
          <div className="p-6 flex flex-col justify-start">
            <h5 className="text-gray-900 text-xl font-medium mb-2">
              Escala do Dia {scale.date} - {scale.dayOfWeek}
            </h5>
            <p className="text-gray-700 text-base mb-4">
              Departamento: {scale.department.name}
            </p>
            <p className="text-gray-700 text-base mb-4">
              Função: {scale.people[0].role.name}
            </p>
            <p className="text-gray-600 text-xs">
              Observação: {scale.description.substring(0, 50)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardDetail;
