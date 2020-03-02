import React from "react";
import "./AdminPage.css";
import { Button, Form } from "semantic-ui-react";
import { Table } from "semantic-ui-react";
import { Dropdown, Menu } from "semantic-ui-react";

const options = [
  { key: 1, text: "Left Side", value: 1 },
  { key: 2, text: "Right Side", value: 2 }
];
const AdminPage = () => (
  <div className="form-container">
    <Form>
      <Form.Field>
        <label>Yarn Color</label>
        <input placeholder="Enter Yarn Color" />
      </Form.Field>
      <Form.Field>
        <label>Color Poisition</label>
        <Menu compact>
          <Dropdown text="Select Poisition" options={options} simple item />
        </Menu>
      </Form.Field>
      <Button type="submit">Submit</Button>
      <Table singleLine>
        <Table.Body>
          <Table.Row>
            <Table.Cell>John Lilki</Table.Cell>
            <Table.Cell>September 14, 2013</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            <Table.Cell>No</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jamie Harington</Table.Cell>
            <Table.Cell>January 11, 2014</Table.Cell>
            <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jill Lewis</Table.Cell>
            <Table.Cell>May 11, 2014</Table.Cell>
            <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Form>
  </div>
);

export default AdminPage;
