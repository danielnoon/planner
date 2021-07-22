import { FC } from "react";
import { ClassStatus } from "../types/Class";
import Chip from "./primitives/Chip";

interface StatusChipProps {
  status: ClassStatus;
}

const StatusChip: FC<StatusChipProps> = ({ status }) => {
  const color = (() => {
    if (status === "complete") {
      return "#80d680";
    }

    if (status === "in progress") {
      return "blue";
    }

    return "orange";
  })();

  return <Chip color={color}>{status}</Chip>;
};

export default StatusChip;
