import { useEffect } from "react";
import { useDispatch } from "react-redux";
// store
import { loadNotesList } from "../../entities/note/store/notes-store";
import { loadCommentsList } from "../../entities/comment/store/comments-store";
import { loadCategoriesList } from "../../entities/categories/store/categories-store";
import { loadUsersList } from "../../entities/user/store/users-store";

interface AppLoaderProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: AppLoaderProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(loadNotesList());
    dispatch<any>(loadCommentsList());
    dispatch<any>(loadCategoriesList());
    dispatch<any>(loadUsersList());
  }, []);

  return children;
};

export default AppLoader;
