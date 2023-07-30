import { useSelector } from "react-redux";
import { getObjectsList } from "../../store/objects.store";
import BasicTable from "../../components/common/table/basic-table";
import { groupedColumns } from "./table/columns";

const Objects = () => {
  const objects = useSelector(getObjectsList());
  //   console.log("objects", objects);
  const columns = groupedColumns

  return (
    <>
      <h1>Таблица объектов</h1>
      <BasicTable items={objects} itemsColumns={columns}/>
    </>
  );
};

export default Objects;
