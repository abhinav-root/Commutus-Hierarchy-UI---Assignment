import { Snackbar } from "@mui/material";

interface NotificationProps {
  show: boolean;
  message: string;
  handleClose: () => void;
}

const Notification = ({ show, message, handleClose }: NotificationProps) => {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      open={show}
      onClose={handleClose}
      message={message}
      autoHideDuration={2000}
    />
  );
};

export default Notification;
