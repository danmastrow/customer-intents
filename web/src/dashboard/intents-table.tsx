import { Table } from "flowbite-react";
import { CustomerIntent } from "../models/customer-intents";
import React from "react";

export type IntentsTableProps = {
  intents: CustomerIntent[];
};

const IntentsTable = ({ intents }: IntentsTableProps) => {
  const text = "Edit";
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
          {intents.map((intent) => (
            <React.Fragment key={intent.original_reason}>
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
            </React.Fragment>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default IntentsTable;
