import React, { useEffect, useState } from "react";
import Layout from "./../../Core/Layout";
import moment from "moment";
import Swal from "sweetalert2";
import {
  getAllLocations,
  removeLocation
} from "../../../Utils/Requests/Location";
import Loading from "./../../Core/Loading";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";

const Locations = () => {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [prevLocations, setPrevLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    if (!compareLocations(prevLocations, locations)) {
      setIsLoading(true);
      fetchLocations();
    }
  }, [locations]);

  const deleteRecord = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!"
    }).then(async (result) => {
      if (result.value) {
        const resp = await removeLocation(id).catch((err) => {
          setError(err.response.data.error);
        });
        if (resp && resp.status === 200) {
          Swal.fire("Deleted!", "Location has been deleted.", "success");
          setLocations([]);
        }
      }
    });
  };

  const fetchLocations = async () => {
    const resp = await getAllLocations().catch((err) => {
      setError(err.response.data.error);
      setIsLoading(false);
    });
    if (resp && resp.status === 200) {
      let counter = 1;
      const formattedLocations = resp.data.map((location) => {
        location.createdAt = moment(location.createdAt).format("MMMM Do, YYYY");
        location.sn = counter;
        counter++;
        return location;
      });
      setPrevLocations([...locations]);
      setLocations(formattedLocations);
      setIsLoading(false);
    }
  };

  const compareLocations = (prevLocations, curLocations) => {
    if (prevLocations.length !== curLocations.length) {
      return false;
    }

    for (let i = 0; i < prevLocations.length; i++) {
      if (prevLocations[i]._id !== curLocations[i]._id) {
        return false;
      }
    }

    return true;
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "S.N",
        accessor: "sn",
        className: "id",
        align: "left",
        sortable: true
      },
      {
        Header: "Name",
        accessor: "name",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        Header: "District",
        accessor: "district",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        Header: "Action",
        accessor: "action",
        className: "action",
        width: 100,
        align: "left",
        sortable: false,
        Cell: ({ row }) => {
          return (
            <>
              <button
                data-toggle="modal"
                data-target="#update-user-modal"
                className="btn btn-primary btn-sm"
                onClick={() =>
                  navigate(`/edit-location/${row.original._id}`)
                }
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
          );
        }
      }
    ],
    []
  );

  const data = React.useMemo(() => locations, [locations]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  // const pageChange = (pageData) => {
  //   console.log("OnPageChange", pageData);
  // };

  return (
    <Layout title="Locations">
      <div className="d-flex" id="wrapper">
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <button className="btn btn-link mt-3" id="menu-toggle"></button>

            <button
              className="btn btn-outline-primary float-right mt-3 mr-2"
              data-toggle="modal"
              data-target="#add-user-modal"
              onClick={() => navigate("/add-location")}
            >
              {" "}
              Add Location
            </button>

            <h1 className="mt-2 text-primary">Locations</h1>
            {isLoading ? (
              <Loading />
            ) : (
              <table {...getTableProps()} className="your-table-class">
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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

export default Locations;
