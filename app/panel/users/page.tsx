"use client";
import { getUsers } from "@/services/user.service";
import { userSchemaType_ } from "@/types/user";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect, useState } from "react";

function page() {
  const [user, setUsers] = useState<userSchemaType_[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 2,
    totalPages: 1,
    total: 1,
  });

  useEffect(() => {
    (async () => {
      const data = await getUsers({
        page: page,
        limit: pagination.limit,
      });
      console.log(data);
      setUsers((data?.data || []) as userSchemaType_[]);
      console.log("pagination", data?.pagination);
      setPagination(data?.pagination);
    })();
  }, [page]);

  return (
    <div className="p-2">
      <div className="overflow-x-auto">
        <Table striped>
          <TableHead>
            <TableHeadCell>First Name</TableHeadCell>
            <TableHeadCell>Last Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Created At</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {user.map((u) => (
              <TableRow className="bg-white ">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 ">
                  {u.first_name}
                </TableCell>
                <TableCell>{u.last_name || "-"}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={page}
        totalPages={pagination.totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}

export default page;
