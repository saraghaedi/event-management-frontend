import CreateSpaceForm from "../components/space/CreateSpaceForm";
import SpaceDetailsPage from "./SpaceDetailsPage";
import { useSelector } from "react-redux";
import { selectSpace, selectToken } from "../store/users/selectors";
import AuthModal from "../components/auth/AuthModal";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
export default function MySpace() {
  const space = useSelector(selectSpace);
  const token = useSelector(selectToken);
  return (
    <div>
      {space ? (
        <SpaceDetailsPage />
      ) : token ? (
        <CreateSpaceForm />
      ) : (
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          margin="1em"
        >
          <Typography variant="h2" component="div" gutterBottom>
            organise your events in your own space!
          </Typography>
          <Typography variant="h5" component="div" gutterBottom>
            You can have your own space to manage all your events! please login
            first to be able to create events.
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center">
            <AuthModal />
          </Box>
        </Box>
      )}
    </div>
  );
}
