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
import {
  Employee as IEmployee,
  updateEmployee,
} from "../redux/employees/employeesSlice";
import { getRandomColor } from "../utils/common";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useCallback, useEffect, useState } from "react";
import Subordinates from "./Subordinates";
import { ContentCut, Edit } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import Notification from "./Notification";
import EmployeeDetailsModal from "./EmployeeDetailsModal";

type EmployeeProps = {
  employee: IEmployee;
  color: string;
  searchValue: string;
};

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const schema = z.object({
  id: z.string(),
  name: z.string().min(3).max(20),
  email: z.string().email(),
  phoneNumber: z.string().regex(phoneRegex),
  profileImageUrl: z.string().url(),
});

export type FormFields = z.infer<typeof schema>;

export const Employee = ({ employee, color, searchValue }: EmployeeProps) => {
  const [subordinatesColor] = useState<string>(getRandomColor());
  const [selectedEmployee, setSelectedEmployee] = useState<null | IEmployee>(
    null
  );
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: selectedEmployee?.id,
      email: selectedEmployee?.email,
      name: selectedEmployee?.name,
      phoneNumber: selectedEmployee?.phoneNumber,
      profileImageUrl: selectedEmployee?.phoneNumber,
    },
  });
  useEffect(() => {
    if (selectedEmployee) {
      reset(selectedEmployee);
    }
  }, [selectedEmployee]);
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    dispatch(updateEmployee(data));
    setNotificationMessage("Details Updated");
    setShowNotification(true);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const [matchesSearchValue, setMatchesSearchValue] = useState(false)


  useEffect(() => {
    if (searchValue) {
      setMatchesSearchValue(employee.name.toLowerCase().startsWith(searchValue.toLowerCase()))
    }
  }, [searchValue])

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      mx={1}
      mt={4}
    >
      <Notification
        handleClose={() => setShowNotification(false)}
        message={notificationMessage}
        show={showNotification}
      />
      <EmployeeDetailsModal
        isModalOpen={isModalOpen}
        selectedEmployee={selectedEmployee}
        errors={errors}
        register={register}
        handleModalClose={handleModalClose}
        setSelectedEmployee={setSelectedEmployee}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
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
      <Card sx={{ maxWidth: 300, minWidth: 200, opacity: !searchValue ? 1 : matchesSearchValue ? 1.0 : .3 }}>
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
        searchValue={searchValue}
      />
    </Box>
  );
};
