import { Box, TextField } from "@mui/material";
import { Employee } from "./components/Employee";
import { getRandomColor } from "./utils/common";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useMemo, useState } from "react";

export default function App() {
  const company = useSelector((state: RootState) => state.company);
  const [searchValue, setSearchValue] = useState("")
  const color = useMemo(() => getRandomColor(), []);
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Box my={2} display={"flex"} justifyContent={"center"}>
        <TextField
          sx={{ mx: "auto", maxWidth: 600 }}
          placeholder="Search employees"
          fullWidth
          type="search"
          variant="outlined"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </Box>
      <Employee employee={company.ceo} color={color} searchValue={searchValue}/>
    </Box>
  );
}
