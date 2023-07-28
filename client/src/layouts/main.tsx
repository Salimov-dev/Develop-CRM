import { useSelector } from "react-redux";
import { getObjectsList } from "../store/objects.store";
import TopBar from "../components/UI/topbar/topbar";

const Main = () => {
  const objects = useSelector(getObjectsList());
  console.log("objects", objects);
  return <h1>Main</h1>;
};

export default Main;
