import React, {  useMemo, useEffect, useState } from "react";
import Layout from "../../Core/Layout";
import {
  getOwnerBookings,
  changeVerificationStatus,
  removeBooking,
} from "../../../Utils/Requests/Booking";
import moment from "moment";
import Swal from "sweetalert2";
import { SERVER_ROUTE } from "../../../Utils/config";
import Loading from "../../Core/Loading";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";

const MyBookings = () => {
  const columns = useMemo(
    () => [
      {
        Header: "S.N",
        accessor: "sn",
        className: "id",
        align: "left",
        sortable: true,
      },
      {
        Header: "Image",
        accessor: "image",
        className: "image",
        width: 100,
        align: "left",
        sortable: false,
        Cell: ({ value }) => {
          return (
            <>
              <img
                className="busImage"
                src={`${SERVER_ROUTE}/uploads/` + value}
                alt="busImage"
              />
            </>
          );
        },
      },
      {
        Header: "Bus Number",
        accessor: "busNumber",
        className: "name",
        align: "left",
        sortable: true,
      },
      {
        Header: "Bus Name",
        accessor: "busName",
        className: "name",
        align: "left",
        sortable: true,
      },
      {
        Header: "Owner Name",
        accessor: "ownerName",
        className: "name",
        align: "left",
        sortable: true,
      },
      {
        Header: "Journey Date",
        accessor: "journeyDate",
        className: "name",
        align: "left",
        sortable: true,
      },
      {
        Header: "Departure time",
        accessor: "departure_time",
        className: "name",
        align: "left",
        sortable: true,
      },
      {
        Header: "Client Name",
        accessor: "clientName",
        className: "clientName",
        align: "left",
        sortable: true,
      },
      {
        Header: "Client Phone",
        accessor: "clientPhone",
        className: "clientPhone",
        align: "left",
        sortable: true,
      },
      {
        Header: "Client Address",
        accessor: "clientAddress",
        className: "clientAddress",
        align: "left",
        sortable: true,
      },
      {
        Header: "Booked Date",
        accessor: "bookedDate",
        className: "date",
        align: "left",
        sortable: true,
      },
      {
        Header: "Seat Number",
        accessor: "seatNumber",
        className: "date",
        align: "left",
        sortable: true,
      },
      {
        Header: "Status",
        accessor: "verification",
        className: "date",
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
        Cell: ({ row }) => {
          return (
            <>
              <button
                data-toggle="modal"
                data-target="#update-user-modal"
                className={`btn btn-${
                  row.original.verification === "verified"
                    ? "warning"
                    : "success"
                } btn-sm`}
                onClick={() =>
                  toggleVerify(row.original._id, row.original.verification)
                }
                style={{
                  marginRight: "5px",
                  display:
                    row.original.verification === "payed" ? "none" : "block",
                }}
              >
                <i
                  className={`fa fa-${
                    row.original.verification === "verified" ? "times" : "check"
                  }`}
                ></i>
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteRecord(row.original._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  // const [clientName, setClientName] = useState("");
  // const [busNumber, setBusNumber] = useState("");

  // const config = {
  //   initialState: { pageSize: 10 },
  //   exportFile: {
  //     excel: {
  //       enabled: true,
  //       fileName: "Bookings",
  //     },
  //     csv: true,
  //   },
  //   noDataText: "No bookings found!",
  //   language: {
  //     lengthMenu: "Show _MENU_ result per page",
  //     filter: "Filter in records...",
  //     info: "Showing _START_ to _END_ of _TOTAL_ records",
  //     pagination: {
  //       first: "First",
  //       previous: "Previous",
  //       next: "Next",
  //       last: "Last",
  //     },
  //   },
  //   showPageSizeOptions: true,
  //   showFilters: true,
  //   showPagination: true,
  //   showPaginationTop: true,
  //   showPaginationBottom: true,
  //   showInfo: true,
  // };

  useEffect(() => {
    fetchBookings();
  }, []);

  const toggleVerify = (id, status) => async (e) => {
    let toggledVerification =
      status === "verified" ? "notverified" : "verified";

    Swal.fire({
      title: "Are you sure?",
      text: "You are changing the verification status",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.value) {
        const resp = await changeVerificationStatus(
          id,
          toggledVerification
        ).catch((err) => {
          setError(err.response.data.error);
        });
        if (resp && resp.status === 200) {
          Swal.fire(
            `${toggledVerification}!`,
            "Your file has been updated.",
            "success"
          );
          setBookings([]);
        }
      }
    });
  };

  const deleteRecord = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.value) {
        const resp = await removeBooking(id).catch((err) => {
          setError(err.response.data.error);
        });
        if (resp && resp.status === 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          setBookings([]);
        }
      }
    });
  };

  const fetchBookings = async () => {
    const resp = await getOwnerBookings().catch((err) => {
      setError(err.response.data.error);
      setIsLoading(false);
    });

    if (resp && resp.status === 200) {
      let counter = 1;
      const mappedBookings = resp.data.map((booking) => {
        const client = booking.guest
          ? booking.guest
          : booking.user
          ? booking.user
          : booking.self;
        booking.bookedDate = moment(booking.createdAt).format("MMMM Do, YYYY");
        booking.journeyDate = moment(booking.bus.journeyDate).format(
          "MMMM Do, YYYY"
        );
        booking.sn = counter;
        counter++;
        booking.clientName = client.name;
        booking.clientPhone = client.phone;
        booking.clientAddress = client.address;
        booking.busNumber = booking.bus.busNumber;
        booking.departure_time = booking.bus.departure_time;
        booking.image = booking.bus.image;
        booking.busName = booking.bus.name;
        return booking;
      });
      setBookings(mappedBookings);
      setIsLoading(false);
    }
  };

  // const pageChange = pageData => {
  //   console.log("OnPageChange", pageData);
  // };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data: bookings, initialState: { pageIndex: 0, pageSize: 10 } },
    useFilters, // Apply the filtering plugin
    useGlobalFilter, // Apply the global filtering plugin
    useSortBy, // Apply the sorting plugin
    usePagination, // Apply the pagination plugin
    useAsyncDebounce // Apply the async debounce plugin
  );

  return (
    <Layout title="My Bookings">
      <div className="d-flex" id="wrapper">
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <button className="btn btn-link mt-3" id="menu-toggle"></button>

            <h1 className="mt-2 text-primary">My Bookings</h1>
            {isLoading ? (
              <Loading />
            ) : (
              <div className="container">
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
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* pagination control */}
                <div>
                  <button
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    {"<<"}
                  </button>{" "}
                  <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    {"<"}
                  </button>{" "}
                  <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {">"}
                  </button>{" "}
                  <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    {">>"}
                  </button>{" "}
                  <span>
                    Page{" "}
                    <strong>
                      {pageIndex + 1} of {pageCount}
                    </strong>{" "}
                  </span>
                  <span>
                    | Go to page:{" "}
                    <input
                      type="number"
                      defaultValue={pageIndex + 1}
                      onChange={(e) => {
                        const page = e.target.value
                          ? Number(e.target.value) - 1
                          : 0;
                        gotoPage(page);
                      }}
                      style={{ width: "50px" }}
                    />
                  </span>{" "}
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                    }}
                  >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyBookings;
