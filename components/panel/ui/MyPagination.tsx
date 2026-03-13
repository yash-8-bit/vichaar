import { Pagination } from "@heroui/react";
import  { Dispatch, SetStateAction } from "react";

function MyPagination({
  page,
  setPage,
  pagination,
}: {
  pagination: PaginationType;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1);
  return (
    <Pagination size="sm">
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous
            isDisabled={page === 1}
            onPress={() => setPage((p) => Math.max(1, p - 1))}
          >
            <Pagination.PreviousIcon />
            Prev
          </Pagination.Previous>
        </Pagination.Item>
        {pages.map((p) => (
          <Pagination.Item key={p}>
            <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}
        <Pagination.Item>
          <Pagination.Next
            isDisabled={page === pagination.page}
            onPress={() =>
              setPage((p) => Math.min(pagination.totalPages, p + 1))
            }
          >
            Next
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}

export default MyPagination;
