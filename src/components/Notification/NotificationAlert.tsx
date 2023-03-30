import { useEffect, useState } from "react";
import { classNames } from "../../utils";

type NotificationProps = {
  alertType: string;
  message: string | undefined;
};

const NotificationAlert = ({
  alertType,
  message,
}: NotificationProps): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleVisible = () => {
      setVisible(true);
      if (alertType !== "error") {
        setTimeout(() => {
          setVisible(false);
        }, 10000);
      }
    };

    if (message) {
      handleVisible();
    }
  }, [alertType, message]);

  const alertColor = () => {
    switch (alertType) {
      case "success":
        return "green";
      case "error":
        return "red";
      case "warning":
        return "yellow";
      case "notice":
        return "blue";

      default:
        break;
    }
  };

  const svgIcon = () => {
    switch (alertType) {
      case "success":
        return "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z";
      case "error":
        return "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z";
      case "warning":
        return "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z";
      case "notice":
        return "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z";

      default:
        break;
    }
  };

  return (
    <>
      {visible && (
        <div
          className={classNames(
            "mb-3 inline-flex w-full items-center rounded-lg",
            `bg-${alertColor()}-100`,
            "py-5 px-6 text-base,",
            `text-${alertColor()}-700`
          )}
          role="alert"
        >
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path fill-rule="evenodd" d={svgIcon()} clip-rule="evenodd" />
            </svg>
          </span>
          <div className="ml-3 text-sm font-medium">{message}</div>
          <button
            type="button"
            className={`ml-auto -mx-1.5 -my-1.5 bg-${alertColor()}-100 text-${alertColor()}-700 rounded-lg focus:ring-2 focus:ring-${alertColor()}-400 p-1.5 hover:bg-${alertColor()}-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-${alertColor()}-400 dark:hover:bg-gray-700`}
            data-dismiss-target="#alert-border-3"
            aria-label="Close"
            onClick={() => setVisible(false)}
          >
            <span className="sr-only">Dismiss</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default NotificationAlert;
