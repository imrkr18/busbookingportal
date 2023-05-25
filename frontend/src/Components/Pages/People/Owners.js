import React, { useState, useEffect } from "react";
import Layout from "./../../Core/Layout";
import moment from "moment";
import Swal from "sweetalert2";
import { getOwners } from "../../../Utils/Requests/People";
import Loading from "./../../Core/Loading";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";

const Owners = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const deleteRecord = (slug) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Can't do this right now!");
        // setPeople([])
      }
    });
  };

  const fetchOwners = async () => {
    try {
      const resp = await getOwners();
      let counter = 1;
      const updatedPeople = resp.data.map((person) => {
        return {
          ...person,
          createdAt: moment(person.createdAt).format("MMMM Do, YYYY"),
          sn: counter++,
        };
      });
      setPeople(updatedPeople);
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.error);
      setIsLoading(false);
    }
  };

  // const prevPeopleRef =React.useRef(people);

  // useEffect(() => {
  //   const prevPeople = prevPeopleRef.current;

  //   if (prevPeople !== people) {
  //     fetchOwners();
  //   }

  //   prevPeopleRef.current = people;
  // }, [people]);

  
  useEffect(() => {
    fetchOwners();
  }, []);

  const data = React.useMemo(() => people, [people]);

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
        Header: "Phone",
        accessor: "phone",
        className: "phone",
        align: "left",
        sortable: true,
      },
      {
        Header: "Email",
        accessor: "email",
        className: "phone",
        align: "left",
        sortable: true,
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        className: "date",
        align: "left",
        sortable: true,
      },
      {
        Header: "Role",
        accessor: "role",
        className: "phone",
        align: "left",
        sortable: true,
      },
      {
        Header: "Action",
        className: "action",
        width: 100,
        align: "left",
        sortable: false,
        Cell: ({ row }) => (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteRecord(row.original.slug)}
          >
            <i className="fa fa-trash"></i>
          </button>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const navigateToAddOwner = () => {
    navigate("/add-owner");
  };

  return (
    <Layout title="People > Owners">
      <div className="d-flex" id="wrapper">
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <button className="btn btn-link mt-3" id="menu-toggle"></button>

            <button
              className="btn btn-outline-primary float-right mt-3 mr-2"
              data-toggle="modal"
              data-target="#add-user-modal"
              onClick={navigateToAddOwner}
            >
              {" "}
              Add Owner
            </button>

            <h1 className="mt-2 text-primary">Owners</h1>
            {isLoading ? (
              <Loading />
            ) : (
              <table {...getTableProps()} className="table">
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          className={column.className}
                          align={column.align}
                          sortable={column.sortable}
                        >
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className={cell.column.className}
                              align={cell.column.align}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
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

export default Owners;
