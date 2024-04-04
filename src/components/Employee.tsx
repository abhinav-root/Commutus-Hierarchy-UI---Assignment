import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Employee as IEmployee } from "../redux/employees/employeesSlice";
import { getRandomColor } from "../utils/common";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useCallback, useState } from "react";
import Subordinates from "./Subordinates";
import { ContentCut, Edit } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

type EmployeeProps = {
  employee: IEmployee;
  color: string;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const Employee = ({ employee, color }: EmployeeProps) => {
  const [subordinatesColor] = useState<string>(getRandomColor());
  const [selectedEmployee, setSelectedEmployee] = useState<null | IEmployee>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(selectedEmployee);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const MenuOpen = Boolean(anchorEl);
  const handleActionsMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleActionsMenuClose = () => {
    setAnchorEl(null);
  };
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  console.log(employee.name);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      mx={1}
      mt={4}
    >
      <Modal
        open={isModalOpen}
        onClose={() => {
          handleModalClose();
          setIsFormEditable(false);
          setSelectedEmployee(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"baseline"}
            mt={1}
            mb={4}
          >
            <Typography
              fontSize={22}
              fontWeight={700}
              color={(theme) => theme.palette.grey[800]}
            >
              Employee Details
            </Typography>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Edit />}
              onClick={() => setIsFormEditable(!isFormEditable)}
            >
              Edit
            </Button>
          </Box>

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            component={"form"}
            mb={2}
          >
            <Box sx={{ width: "49%" }}>
              <TextField
                disabled={!isFormEditable}
                fullWidth
                type="text"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={selectedEmployee?.name ?? ""}
              />
            </Box>
            <Box sx={{ width: "49%" }}>
              <TextField
                disabled={!isFormEditable}
                fullWidth
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
                value={selectedEmployee?.email ?? ""}
              />
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            component={"form"}
          >
            <Box sx={{ width: "49%" }}>
              <TextField
                disabled
                helperText="This field is not editable"
                fullWidth
                id="outlined-basic"
                label="Position"
                variant="outlined"
                value={selectedEmployee?.position ?? ""}
              />
            </Box>
            <Box sx={{ width: "49%" }}>
              <TextField
                disabled={!isFormEditable}
                fullWidth
                id="outlined-basic"
                label="Phone Number"
                type="tel"
                variant="outlined"
                value={selectedEmployee?.phoneNumber ?? ""}
              />
            </Box>
          </Box>
          <Box mt={1}>
              <TextField
                disabled={!isFormEditable}
                fullWidth
                id="outlined-basic"
                label="Profile Image URL"
                type="tel"
                variant="outlined"
                value={selectedEmployee?.profileImageUrl ?? ""}
              />
            </Box>
          <Box display={'flex'} justifyContent={'flex-end'} mt={4}>
          <Button variant="contained" size="large">save</Button>
          <Button color="error" sx={{ml: 1}} variant="contained" size="large" onClick={handleModalClose}>close</Button>
          </Box>
        </Box>
      </Modal>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={MenuOpen}
        onClose={handleActionsMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleActionsMenuClose();
            handleModalOpen();
          }}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Veiw</ListItemText>
        </MenuItem>
      </Menu>
      <Card sx={{ maxWidth: 300, minWidth: 200 }}>
        <Box display={"flex"} flexDirection={"row-reverse"}>
          <Tooltip title="Actions">
            <IconButton
              onClick={(e) => {
                setSelectedEmployee(employee);
                handleActionsMenuOpen(e);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <CardActionArea>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: "auto",
              position: "relative",
              bottom: -10,
            }}
            src={employee.profileImageUrl}
          />
          <CardContent sx={{ bgcolor: color }}>
            <Typography
              color={(t) => t.palette.grey[800]}
              fontSize={16}
              textTransform={"capitalize"}
              fontWeight={800}
              textAlign={"center"}
            >
              {employee.name}
            </Typography>
            <Typography
              color={(t) => t.palette.grey[800]}
              letterSpacing={3}
              fontSize={17}
              textTransform={"uppercase"}
              textAlign={"center"}
            >
              {employee.position}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Subordinates
        subordinates={employee.subordinates}
        color={subordinatesColor}
      />
    </Box>
  );
};
