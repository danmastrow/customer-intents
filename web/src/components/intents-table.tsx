import { Badge, Table } from "flowbite-react";
import { useAtomValue } from "jotai/react";
import React from "react";
import { latestCustomerIntentsAtom } from "../state/state";

const IntentsTable = () => {
  const customerIntents = useAtomValue(latestCustomerIntentsAtom);
  const text = "Review";
  const statusBadge = (status: string) => {
    switch (status) {
      case "Reviewed":
        return (
          <Badge color="purple" className="w-fit">
            Reviewed
          </Badge>
        );
      case "Unreviewed":
        return (
          <Badge color="yellow" className="w-fit">
            Unreviewed
          </Badge>
        );
      default:
        return (
          <Badge color="gray" className="w-fit">
            {status}
          </Badge>
        );
    }
  };
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Caller reason</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Sentiment</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">{text}</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {customerIntents.map((intent) => (
            <React.Fragment key={intent.id}>
              <Table.Row className="bg-white">
                <Table.Cell>{statusBadge(intent.status)}</Table.Cell>
                <Table.Cell>{intent.original_reason}</Table.Cell>
                <Table.Cell>{intent.category}</Table.Cell>
                <Table.Cell>{intent.sentiment}</Table.Cell>
                <Table.Cell>
                  <span
                    className="font-medium text-cyan-600 hover:underline cursor-pointer"
                    onClick={() => {}}
                  >
                    {text}
                  </span>
                </Table.Cell>
              </Table.Row>
            </React.Fragment>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default IntentsTable;
