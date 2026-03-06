import { addLike } from "../services/add-like";

interface Props {
  projectId: string;
}

export default function uselike({ projectId }: Props) {
  function handleLike() {
    addLike({ projectId })
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        console.log("aquí");
      });
  }

  return { handleLike };
}
