import { FC } from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      {text} test
    </button>
  );
};

export default Button;
