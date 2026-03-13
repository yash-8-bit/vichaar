"use client";
import { getUsers } from "@/services/user.service";
import { userSchemaType_ } from "@/types/user";
import { EmptyState, Table } from "@heroui/react";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import MyPagination from "@/components/panel/ui/MyPagination";
import { convertTimeToIndian } from "@/utils/time.util";
import MyPageHeader from "@/components/panel/ui/MyPageHeader";

function page() {
  const [users, setUsers] = useState<userSchemaType_[]>([]);

  const columns = [
    { id: "id", name: "ID" },
    { id: "first_name", name: "First Name" },
    { id: "last_name", name: "Last Name" },
    { id: "email", name: "Email" },
    { id: "createdAt", name: "createdAt" },
  ];
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 20,
    totalPages: 1,
    total: 1,
  });
  useEffect(() => {
    (async () => {
      const data = await getUsers({
        page: page,
        limit: pagination.limit,
      });
      console.log(data.data);
      setUsers((data?.data || []) as userSchemaType_[]);
      setPagination(data?.pagination);
    })();
  }, [page]);
  return (
    <div >
      <MyPageHeader title="Users" icon="solar:shield-user-bold" />
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Users" className="min-w-[600px]">
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column  isRowHeader={column.id === "id"}>
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body
              renderEmptyState={() => (
                <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                  <Icon className="size-6 text-muted" icon="gravity-ui:tray" />
                  <span className="text-sm text-muted">No results found</span>
                </EmptyState>
              )}
              items={users}
            >
              {(user) => (
                <Table.Row>
                  <Table.Collection items={columns}>
                    {(column) => (
                      <Table.Cell>
                        {column.id === "createdAt"
                          ? convertTimeToIndian(
                              user[column.id as keyof typeof user] as any,
                            )
                          : user[column.id as keyof typeof user]}
                      </Table.Cell>
                    )}
                  </Table.Collection>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer>
          <MyPagination pagination={pagination} page={page} setPage={setPage} />
        </Table.Footer>
      </Table>
    </div>
  );
}

export default page;
