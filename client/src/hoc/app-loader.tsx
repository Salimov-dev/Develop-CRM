import { useEffect } from "react";
import { useDispatch } from "react-redux";
// store
import { loadObjectsList } from "../store/objects.store";
import { loadUsersList } from "../store/users.store";
import { loadMetroList } from "../store/metro.store";
import { loadDistrictsList } from "../store/districts.store";
import { loadObjectStatusList } from "../store/object-status.store";
import { loadWorkingPositionList } from "../store/working-position.store";
import { loadSidebarCollapsState } from "../store/sidebar-collaps-state.store";

interface AppLoaderProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: AppLoaderProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(loadObjectsList());
    dispatch<any>(loadUsersList());
    dispatch<any>(loadMetroList());
    dispatch<any>(loadDistrictsList());
    dispatch<any>(loadObjectStatusList());
    dispatch<any>(loadWorkingPositionList());
    dispatch<any>(loadWorkingPositionList());
    dispatch<any>(loadSidebarCollapsState());
  }, []);

  return children;
};

export default AppLoader;
