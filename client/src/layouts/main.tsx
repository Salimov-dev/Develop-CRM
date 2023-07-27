import { useSelector } from "react-redux";
import { getObjectsList } from "../store/objects.store";
import TopBar from "../components/UI/top-bar/top-bar";

export default function ButtonAppBar() {
  const objects = useSelector(getObjectsList());
  console.log("objects", objects);
  return <TopBar />;
}
