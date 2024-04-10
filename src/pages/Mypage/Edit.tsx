import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { editItemPut } from "../../api/itemAPI";

export interface UpdatedItem {
    rentalId: number;
    title: string;
    category: any;
    contents: string;
    price: number;
  }

function Edit() {
    const { rentalId } = useParams(); //
    const navigate = useNavigate();
    const editMutation = useMutation({
        mutationFn: (updatedItem: any) => {
          return editItemPut({ rentalId: Number(rentalId), updatedItem });
        },
        onSuccess: (res) => {
          console.log("res", res);
          navigate("/mylist");
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
  return (
    <div>Edit</div>
  )
}

export default Edit