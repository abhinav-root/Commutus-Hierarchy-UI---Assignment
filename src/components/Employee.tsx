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
import { Employee as IEmployee, updateEmployee } from "../redux/employees/employeesSlice";
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

type FormFields = z.infer<typeof schema>;

export const Employee = ({ employee, color }: EmployeeProps) => {
  const [subordinatesColor] = useState<string>(getRandomColor());
  const [selectedEmployee, setSelectedEmployee] = useState<null | IEmployee>(
    null
  );
  const dispatch = useDispatch()
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
      reset(selectedEmployee)
    }
  }, [selectedEmployee]);
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    // console.log(data)
    dispatch(updateEmployee(data))
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
          setSelectedEmployee(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={"form"} onSubmit={handleSubmit(onSubmit)} noValidate>
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
            <Button variant="outlined" size="large" startIcon={<Edit />}>
              Edit
            </Button>
          </Box>

          <Box display={"flex"} justifyContent={"space-between"} mb={2}>
            <Box sx={{ width: "49%" }}>
              <TextField
                fullWidth
                type="text"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                error={Boolean(errors?.name)}
                helperText={errors?.name?.message}
                {...register("name")}
              />
            </Box>
            <Box sx={{ width: "49%" }}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
                error={Boolean(errors?.email)}
                helperText={errors?.email?.message}
                {...register("email")}
              />
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
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
                fullWidth
                id="outlined-basic"
                label="Phone Number"
                type="tel"
                variant="outlined"
                error={Boolean(errors?.phoneNumber)}
                helperText={errors?.phoneNumber?.message}
                {...register("phoneNumber")}
              />
            </Box>
          </Box>
          <Box mt={1}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Profile Image URL"
              type="tel"
              variant="outlined"
              error={Boolean(errors?.profileImageUrl)}
              helperText={errors?.profileImageUrl?.message}
              {...register("profileImageUrl")}
            />
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"} mt={4}>
            <Button variant="contained" size="large" type="submit">
              save
            </Button>
            <Button
              color="error"
              sx={{ ml: 1 }}
              variant="contained"
              size="large"
              onClick={handleModalClose}
            >
              close
            </Button>
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
