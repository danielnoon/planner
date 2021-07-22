import { ChangeEvent, FC } from "react";
import styled from "styled-components";

interface InputProps {
  className?: string;
  label?: string;
  type?: "number" | "text";
  stretch?: boolean;
  autoFocus?: boolean;
  value?: string | number;
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const InputBase: FC<InputProps> = ({
  className,
  type,
  label,
  autoFocus,
  value,
  onChange,
  placeholder,
  required,
}) => {
  return (
    <label className={className}>
      <span>{label}</span>
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        required={required}
      ></input>
    </label>
  );
};

const Input = styled(InputBase)<InputProps>`
  display: inline-flex;
  flex-direction: column;
  row-gap: 4px;
  ${({ stretch }) => stretch && "flex-grow: 1;"}

  & > span {
    font-size: 0.8em;
    font-weight: 700;
  }

  & > input {
    border-radius: 4px;
    outline: none;
    border: 1px solid hsl(0, 0%, 80%);
    padding: 8px 10px;
    color: hsl(0, 0%, 20%);
    font-size: 1em;
    font-weight: 400;

    &:focus {
      outline: none;
    }
  }
`;

export default Input;
