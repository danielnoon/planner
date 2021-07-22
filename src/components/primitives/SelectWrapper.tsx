import { FC } from "react";
import styled from "styled-components";

interface SelectWrapperProps {
  label: string;
  className?: string;
}

const SelectWrapperBase: FC<SelectWrapperProps> = ({
  className,
  label,
  children,
}) => {
  return (
    <div className={className}>
      <label>{label}</label>
      {children}
    </div>
  );
};

const Select = styled(SelectWrapperBase)<SelectWrapperProps>`
  flex-grow: 1;

  display: inline-flex;
  flex-direction: column;
  row-gap: 4px;

  & > label {
    font-size: 0.8em;
    font-weight: 700;
  }
`;

export default Select;
