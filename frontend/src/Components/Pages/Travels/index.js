import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import Layout from "./../../Core/Layout";
import moment from "moment";
import Swal from "sweetalert2";
import Loading from "./../../Core/Loading";
import { getAllTravels, removeTravel } from "../../../Utils/Requests/Travel";

const Travels = () => {
  const navigate = useNavigate();

  const [travels, setTravels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [prevTravels, setPrevTravels] = useState([]);


  useEffect(() => {
    fetchTravels();
  }, []);


  useEffect(() => {
    if (prevTravels === travels) {
      fetchTravels();
    }
    setPrevTravels(travels);
  }, [travels]);

  const deleteRecord = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resp = await removeTravel(id);
          if (resp && resp.status === 200) {
            Swal.fire("Deleted!", "Travel has been deleted.", "success");
            setTravels([]);
          }
        } catch (err) {
          setError(err.response.data.error);
        }
      }
    });
  };

  const fetchTravels = async () => {
    try {
      const resp = await getAllTravels();
      if (resp && resp.status === 200) {
        let counter = 1;
        const formattedTravels = resp.data.map((travel) => {
          const createdAt = moment(travel.createdAt).format("MMMM Do, YYYY");
          return { ...travel, createdAt, sn: counter++ };
        });
        setTravels(formattedTravels);
        setIsLoading(false);
      }
    } catch (err) {
      setError(err.response.data.error);
      setIsLoading(false);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "S.N",
        accessor: "sn",
        className: "id",
        align: "left",
        sortable: true,
      },
      {
        Header: "Name",
        accessor: "name",
        className: "name",
        align: "left",
        sortable: true,
      },
      {
        Header: "Action",
        accessor: "action",
        className: "action",
        width: 100,
        align: "left",
        sortable: false,
        Cell: ({ row }) => (
          <>
            <button
              data-toggle="modal"
              data-target="#update-user-modal"
              className="btn btn-primary btn-sm"
              onClick={() => navigate(`/edit-travel/${row.original._id}`)}
              style={{ marginRight: "5px" }}
            >
              <i className="fa fa-edit"></i>
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteRecord(row.original._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      },
    ],
    [navigate]
  );

  const tableInstance = useTable({ columns, data: travels });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Layout title="Travels">
      <div className="d-flex" id="wrapper">
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <button className="btn btn-link mt-3" id="menu-toggle"></button>

            <button
              className="btn btn-outline-primary float-right mt-3 mr-2"
              data-toggle="modal"
              data-target="#add-user-modal"
              onClick={() => navigate("/add-travel")}
            >
              Add Travel
            </button>

            <h1 className="mt-2 text-primary">Travels</h1>
            {isLoading ? (
              <Loading />
            ) : (
              <table {...getTableProps()} className="table">
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Travels;
