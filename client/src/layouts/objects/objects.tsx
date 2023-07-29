import { useSelector } from "react-redux";
import { getObjectsList } from "../../store/objects.store";
import BasicTable from "./table/basic-table";

const Objects = () => {
    const objects = useSelector(getObjectsList())
    console.log("objects", objects);
    
    return <><h1>Таблица объектов</h1><BasicTable/></> 
}
 
export default Objects;