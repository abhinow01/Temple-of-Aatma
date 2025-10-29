import { getAllYatras } from "@/server/actions/yatras";
import YatrasPagination from "./YatrasWithPagination";
export default async function YatrasPage() {
  // Fetch all yatras
  const response = await getAllYatras();
  const yatras = response?.data || [];

  // For demo — let's assume pagination values
  const currentPage = 1;
  const totalPages = 3;

  const handlePageChange = (page) => {
    console.log("Switch to page:", page);
    // You can later implement this with router.push(`/yatras?page=${page}`)
  };

  return (
    <div className="w-full">
      <YatrasPagination
        yatras={yatras}
        currentPage={currentPage}
        totalPages={totalPages}
        // onPageChange={handlePageChange}
      />
    </div>
  );
}
