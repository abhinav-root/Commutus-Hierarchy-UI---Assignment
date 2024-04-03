import {
    Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { Employee as IEmployee } from "../App";
import { getRandomColor } from "../utils/common";

type EmployeeProps = {
  employee: IEmployee;
  color: string;
};

export const Employee = ({ employee, color }: EmployeeProps) => {
    const childNodesColor = getRandomColor()
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={'center'} mx={1} mt={4}>
      <Card sx={{ maxWidth: 300, minWidth: 200}}>
        <CardActionArea>
            <Avatar sx={{width: 80, height: 80, mx: "auto", position: "relative", bottom: -10}} src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" />
          <CardContent sx={{bgcolor: color}}>
            <Typography color={t=>t.palette.grey[800]} fontSize={16} textTransform={'capitalize'} fontWeight={800} textAlign={'center'} >
              {employee.name}
            </Typography>
            <Typography color={t=>t.palette.grey[800]} letterSpacing={3} fontSize={17} textTransform={'uppercase'} textAlign={'center'} >
              {employee.position}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Box display={"flex"} justifyContent={"center"} alignItems={'space-between'}>
        {employee.subordinates?.map((emp) => {
          return <Employee employee={emp} color={childNodesColor} />;
        })}
      </Box>
    </Box>
  );
};
