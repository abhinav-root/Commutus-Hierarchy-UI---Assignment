import { Box } from "@mui/material";
import { Employee } from "./components/Employee";
import { getRandomColor } from "./utils/common";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

export default function App() {
  const company = useSelector((state: RootState) => state.company)
  return (
    <Box sx={{overflowX: "hidden"}}>
      <Employee employee={company.ceo} color={getRandomColor()} />
    </Box>
  );
}
