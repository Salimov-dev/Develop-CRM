import { useEffect } from "react";
import { useDispatch } from "react-redux";
// store
import { loadObjectsList } from "../store/objects.store";
import { loadUsersList } from "../store/users-store";
import { loadMetroList } from "../store/metro-store";

interface AppLoaderProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: AppLoaderProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(loadObjectsList());
    dispatch<any>(loadUsersList());
    dispatch<any>(loadMetroList());
  }, []);

  return children;
};

export default AppLoader;
