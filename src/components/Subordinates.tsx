import { Box } from "@mui/material";
import { Employee as IEmployee } from "../redux/employees/employeesSlice";
import { Employee } from "./Employee";
import { memo } from "react";

interface SubordinatesType {
  subordinates?: IEmployee[];
  color: string;
}

function Subordinates({ subordinates, color }: SubordinatesType) {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"space-between"}
    >
      {subordinates?.map((emp) => {
        return <Employee key={emp.id} employee={emp} color={color} />;
      })}
    </Box>
  );
}

const Memoized = memo(Subordinates);

export default Memoized;
