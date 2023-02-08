import { type } from "os";
import { useEffect, useState } from "react";
import { ScaleType } from "../../types/types";

type ScaleProps = {
  scale: ScaleType;
};

const DashboardDetail = ({ scale }: ScaleProps): JSX.Element => {
  const [scaleObj, setScaleObj] = useState({});

  useEffect(() => {
    setScaleObj(scale);
  }, [scale]);

  return (
    <div
      id="scale"
      className="rounded-lg border-4 border-dashed border-gray-200 bg-gray-200"
    >
      {scale && (
        <div className="h-[90%] text-3xl grid grid-cols-1 divide-y">
          <div className="ml-2 mt-2">Departamento: {scale.department.name}</div>
          <div className="ml-2 mt-2">Função: {scale.people[0].role.name}</div>
          <div className="ml-2 mt-2">Data: {scale.date}</div>
          <div className="ml-2 mt-2">
            Observação: {scale.description.substring(0, 50)}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardDetail;
