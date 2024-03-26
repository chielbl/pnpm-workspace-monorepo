import { FC } from "react";

interface MessageProps {
  message: string;
}

const Message: FC<MessageProps> = ({ message }) => {
  return <p>{message}</p>;
};

export default Message;
