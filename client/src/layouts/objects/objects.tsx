import { useSelector } from "react-redux";
import { getObjectsList } from "../../store/objects.store";
import BasicTable from "../../components/common/table/basic-table";
import { groupedColumns } from "./table/columns";
import { getUserById } from "../../store/users-store";

const Objects = () => {
  const objects = useSelector(getObjectsList());
  //   console.log("objects", objects);
  const columns = groupedColumns;
  //  const user =  useSelector(getUserById("64c4d8922b4d5baa91ae583c"))
  //  console.log("user", user);

  return (
    <>
      <h1>Таблица объектов</h1>
      <BasicTable items={objects} itemsColumns={columns} />
    </>
  );
};

export default Objects;
