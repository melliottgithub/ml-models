import { InputHTMLAttributes } from "react";
import Flex from "../flex";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = (props) => {
  // get remaining InputHTMLAttributes<HTMLInputElement> props
  const { label, className, ...rest } = props;
  
  return (
    <Flex className="" flexDirection="column">
      {label && <label className="font-size-small">{label}</label>}
      <input className={`font-size-medium ${className}`} {...rest} />
    </Flex>
  );
};
export default Input;
