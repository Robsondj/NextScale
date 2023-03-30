import NotificationAlert from "./NotificationAlert";

type PropsType = {
  message: string | undefined;
};

const NotificationSuccess = ({ message }: PropsType): JSX.Element => {
  return <NotificationAlert alertType="success" message={message} />;
};

const NotificationError = ({ message }: PropsType): JSX.Element => {
  return <NotificationAlert alertType="error" message={message} />;
};

const NotificationWarning = ({ message }: PropsType): JSX.Element => {
  return <NotificationAlert alertType="warning" message={message} />;
};

const NotificationNotice = ({ message }: PropsType): JSX.Element => {
  return <NotificationAlert alertType="notice" message={message} />;
};

export {
  NotificationSuccess,
  NotificationError,
  NotificationWarning,
  NotificationNotice,
};
