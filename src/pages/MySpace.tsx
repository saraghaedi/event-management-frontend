import CreateSpaceForm from "../components/space/CreateSpaceForm";
import SpaceDetailsPage from "./SpaceDetailsPage";
import { useSelector } from "react-redux";
import { selectSpace } from "../store/users/selectors";
export default function MySpace() {
  const space = useSelector(selectSpace);
  return <div>{space ? <SpaceDetailsPage /> : <CreateSpaceForm />}</div>;
}
