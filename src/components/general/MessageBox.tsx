import { useSelector } from "react-redux";
import { selectMessage } from "../../store/appState/selectors";
import Alert from "@mui/material/Alert";

export default function MessageBox() {
  const message = useSelector(selectMessage);
  const showMessage = message !== null;
  if (!showMessage) return null;

  return <Alert severity={message.variant}>{message.text}</Alert>;
}
