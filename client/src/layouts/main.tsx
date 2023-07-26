import { useSelector } from "react-redux";
import { getObjectsList } from "../store/objects.store";

const Main = () => {
  const objects = useSelector(getObjectsList());
  console.log("objects", objects);

  return <h1>Main</h1>;
};

export default Main;
