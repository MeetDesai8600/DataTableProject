import { useState } from "react";
import products from "../data/data";

import {
  Table,
  Button,
  Form,
  Row,
  Col,
  Card,
  Pagination,
  Badge,
} from "react-bootstrap";

const DataTable = () => {
  const [data, setData] = useState(products);

  const [searchName, setSearchName] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const handlePayment = (id) => {
    const selected = data.find((item) => item.id === id);

    const confirmChange = window.confirm(
      `Are you sure you want to mark this product as ${
        selected.paid ? "Not Paid" : "Paid"
      }?`,
    );

    if (!confirmChange) return;

    const updatedData = data.map((item) =>
      item.id === id
        ? {
            ...item,
            paid: !item.paid,
          }
        : item,
    );

    setData(updatedData);
  };

  const categoryOrder = [
    "Electronics",
    "Fashion",
    "Home",
    "Kitchen",
    "Accessories",
    "Furniture",
    "Stationery",
    "Beauty",
    "Education",
  ];

  let filteredData = [...data];

  // Search by name
  filteredData = filteredData.filter((item) =>
    item.name.toLowerCase().includes(searchName.toLowerCase()),
  );

  // Category filter
  if (categorySearch !== "") {
    filteredData = filteredData.filter(
      (item) => item.category === categorySearch,
    );
  }

  // Price sorting
  if (priceSort === "highToLow") {
    filteredData.sort((a, b) => b.price - a.price);
  }

  if (priceSort === "lowToHigh") {
    filteredData.sort((a, b) => a.price - b.price);
  }

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
  <div className="container mt-4">

    <h2 className="text-center mb-4">Product Data Table</h2>

    {/* Search & Filter */}
    <Row className="mb-3">

      <Col md={4}>
        <Form.Control
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            setCurrentPage(1);
          }}
        />
      </Col>

      <Col md={4}>
        <Form.Select
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
        >
          <option value="">Sort By Price</option>
          <option value="highToLow">High to Low</option>
          <option value="lowToHigh">Low to High</option>
        </Form.Select>
      </Col>

      <Col md={4}>
        <Form.Select
          value={categorySearch}
          onChange={(e) => {
            setCategorySearch(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Select Category</option>

          {categoryOrder.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </Form.Select>
      </Col>

    </Row>

    {/* Table */}

    <Table striped bordered hover responsive>

      <thead className="table-primary">
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>

        {paginatedData.map((prd, index) => (

          <tr key={prd.id}>

            <td>{startIndex + index + 1}</td>

            <td>{prd.name}</td>

            <td>{prd.category}</td>

            <td>₹ {prd.price}</td>

            <td>

              <Button
                variant={prd.paid ? "success" : "danger"}
                size="sm"
                onClick={() => handlePayment(prd.id)}
              >
                {prd.paid ? "Paid" : "Not Paid"}
              </Button>

            </td>

          </tr>

        ))}

      </tbody>

    </Table>

    {/* Pagination */}

    <div className="d-flex justify-content-center">

      <Pagination>

        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        />

        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={currentPage === index + 1}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        />

      </Pagination>

    </div>

  </div>
);
};

export default DataTable;