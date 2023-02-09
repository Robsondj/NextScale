import { ScaleType } from "../../types";
import Image from "next/image";

type ScaleProps = {
  scale: ScaleType;
};

const DashboardDetail = ({ scale }: ScaleProps): JSX.Element => {
  return (
    <div className="flex justify-center">
      {scale && (
        <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
          <Image
            className="w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
            src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
            alt=""
          />
          <div className="p-6 flex flex-col justify-start">
            <h5 className="text-gray-900 text-xl font-medium mb-2">
              Scale for {scale.date}
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
