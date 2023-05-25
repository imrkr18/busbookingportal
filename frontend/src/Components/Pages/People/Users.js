import React, { useEffect, useState, useRef } from "react";
import Layout from "./../../Core/Layout";
import moment from "moment";
import Swal from "sweetalert2";
import { getUsers } from "../../../Utils/Requests/People";
import Loading from "./../../Core/Loading";
import { useTable } from "react-table";

const Users = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const prevPeopleRef = useRef(people);

  const deleteRecord = (slug) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cant do this right now!");
        setPeople([]);
      }
    });
  };

  const fetchUsers = async () => {
    try {
      const resp = await getUsers();
      if (resp && resp.status === 200) {
        let counter = 1;
        const formattedPeople = resp.data.map((person) => {
          const createdAt = moment(person.createdAt).format("MMMM Do, YYYY");
          return { ...person, createdAt, sn: counter++ };
        });
        setPeople(formattedPeople);
        setIsLoading(false);
      }
    } catch (err) {
      setError(err.response.data.error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // useEffect(() => {
  //   if (prevPeopleRef.current !== people) {
  //     fetchUsers();
  //   }
  //   prevPeopleRef.current = people;
  // }, [people]);
  
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
        Header: "Address",
        accessor: "address",
        className: "address",
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

  const data = React.useMemo(() => people, [people]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <Layout title="People > Users">
      <div className="d-flex" id="wrapper">
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <button className="btn btn-link mt-3" id="menu-toggle"></button>

            <h1 className="mt-2 text-primary">Users</h1>
            {isLoading ? (
              <Loading />
            ) : (
              <table {...getTableProps()} className="table table-bordered">
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
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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

export default Users;
