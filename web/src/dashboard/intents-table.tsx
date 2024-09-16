import { Table } from "flowbite-react";
import { CustomerIntent } from "../models/customer-intents";

export type IntentsTableProps = {
  intents: CustomerIntent[];
};

const IntentsTable = ({ intents }: IntentsTableProps) => {
  const text = "Edit";
  const limitedIntents = intents.slice(0, 5);
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Caller reason</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Sentiment</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">{text}</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {limitedIntents.map((intent) => (
            <Table.Row className="bg-white">
              <Table.Cell>{intent.original_reason}</Table.Cell>
              <Table.Cell>{intent.category}</Table.Cell>
              <Table.Cell>{intent.sentiment}</Table.Cell>
              <Table.Cell>
                <span className="font-medium text-cyan-600 hover:underline cursor-pointer">
                  {text}
                </span>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default IntentsTable;
