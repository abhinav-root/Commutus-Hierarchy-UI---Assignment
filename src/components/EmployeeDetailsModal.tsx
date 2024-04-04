import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Employee } from "../redux/employees/employeesSlice";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { FormFields } from "./Employee";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface EmployeeDetailsModalProps {
  isModalOpen: boolean;
  selectedEmployee: Employee | null;
  errors: FieldErrors<FormFields>;
  register: UseFormRegister<FormFields>;
  handleModalClose: () => void;
  setSelectedEmployee: (e: Employee | null) => void;
  handleSubmit: UseFormHandleSubmit<FormFields>;
  onSubmit: SubmitHandler<FormFields>;
}

function EmployeeDetailsModal({
  isModalOpen,
  selectedEmployee,
  errors,
  register,
  handleModalClose,
  setSelectedEmployee,
  handleSubmit,
  onSubmit,
}: EmployeeDetailsModalProps) {
  return (
    <Modal
      open={isModalOpen}
      onClose={() => {
        handleModalClose();
        setSelectedEmployee(null);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
  );
}

export default EmployeeDetailsModal;
