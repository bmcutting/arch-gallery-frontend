import { useState } from "react";

export default function useProjectDetail() {
  const [showDetail, setShowDetail] = useState(false);

  return {
    showDetail,
    setShowDetail,
  };
}
