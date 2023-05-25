import React, { useEffect, useState, useMemo } from "react";
import Layout from "./../../Core/Layout";
import {
  getAllAvailableBuses,
  removeBus
} from "../../../Utils/Requests/Bus";
import moment from "moment";
import Swal from "sweetalert2";
import { SERVER_ROUTE } from "../../../Utils/config";
import Loading from "./../../Core/Loading";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";

const BusAvailable = () => {
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [prevBuses, setPrevBuses] = useState([]);

  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: "S.N",
        accessor: "sn",
        className: "id",
        align: "left",
        sortable: true
      },
      {
        Header: "Image",
        accessor: "image",
        className: "image",
        width: 100,
        align: "left",
        sortable: false,
        Cell: ({ value }) => {
          console.log(value);
          return (
            <>
              <img
                className="busImage"
                src={`${SERVER_ROUTE}/uploads/` + value}
                alt="busImage"
              />
            </>
          );
        }
      },
      {
        Header: "Name",
        accessor: "name",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        Header: "Bus Number",
        accessor: "busNumber",
        className: "busNumber",
        align: "left",
        sortable: true
      },
      {
        Header: "Owner Name",
        accessor: "ownerName",
        className: "ownerName",
        align: "left",
        sortable: true
      },
      {
        Header: "Travel",
        accessor: "travel",
        className: "travel",
        align: "left",
        sortable: true
      },
      {
        Header: "Journey Date",
        accessor: "journeyDate",
        className: "date",
        align: "left",
        sortable: true
      },
      {
        Header: "Departure Time",
        accessor: "departure_time",
        className: "date",
        align: "left",
        sortable: true
      },
      {
        Header: "Action",
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
                  navigate(`/edit-bus/${row.original.slug}`)
                }
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteRecord(row.original.slug)}
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-trash"></i>
              </button>
              <button
                className="btn btn-default btn-sm"
                onClick={() =>
                  navigate(`/seat-details/${row.original.slug}`)
                }
              >
                <i className="fa fa-eye" />
              </button>
            </>
          );
        }
      }
    ],
    []
  );

    // const config = {
    //   page_size: 10,
    //   length_menu: [10, 20, 50],
    //   filename: "Buses",
    //   no_data_text: "No bus found!",
    //   button: {
    //     excel: true,
    //     print: true,
    //     csv: true
    //   },
    //   language: {
    //     length_menu: "Show _MENU_ result per page",
    //     filter: "Filter in records...",
    //     info: "Showing _START_ to _END_ of _TOTAL_ records",
    //     pagination: {
    //       first: "First",
    //       previous: "Previous",
    //       next: "Next",
    //       last: "Last"
    //     }
    //   },
    //   show_length_menu: true,
    //   show_filter: true,
    //   show_pagination: true,
    //   show_info: true
    // };


    useEffect(() => {
      fetchAvailableBuses();
    }, []);

    // useEffect(() => {
    //   if (prevBuses !== buses) { // Compare the previous state with the current state
    //     fetchAvailableBuses();
    //   }
    //   setPrevBuses(buses); // Update the previous state
    // }, [buses, prevBuses]);

  const deleteRecord = async (slug) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.value) {
        const resp = await removeBus(slug).catch((err) => {
          setError(err.response.data.error);
        });
        if (resp && resp.status === 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          setBuses([]);
        }
      }
    });
  };

  const fetchAvailableBuses = async () => {
    const response = await getAllAvailableBuses().catch((err) => {
      setError(err.response.data.error);
      setIsLoading(false);
    });
    if (response && response.status === 200) {
      let counter = 1;
      const formattedBuses = response.data.map((bus) => {
        bus.journeyDate = moment(bus.journeyDate).format("MMMM Do, YYYY");
        bus.sn = counter;
        bus.ownerName = bus.owner.name;
        bus.travel = bus.travel.name;
        counter++;
        return bus;
      });
      setBuses(formattedBuses);
      setIsLoading(false);
    }
  };


  const data = useMemo(() => buses, [buses]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <Layout title=" Buses > Available buses">
      <div className="d-flex" id="wrapper">
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <button className="btn btn-link mt-3" id="menu-toggle"></button>
            <button
              className="btn btn-outline-primary float-right mt-3 mr-2"
              data-toggle="modal"
              data-target="#add-user-modal"
              onClick={() => navigate("/add-bus")}
            >
              Add Bus
            </button>
            <h1 className="mt-2 text-primary">All Available Buses</h1>
            {isLoading ? (
              <Loading />
            ) : (
              <table {...getTableProps()} className="table table-bordered table-striped">
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

}

export default BusAvailable;
