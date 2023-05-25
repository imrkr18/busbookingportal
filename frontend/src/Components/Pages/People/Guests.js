import React, { useEffect, useState, useRef } from "react";
import Layout from "./../../Core/Layout";
import moment from "moment";
import Swal from "sweetalert2";
import { getGuests } from "../../../Utils/Requests/People";
import Loading from "./../../Core/Loading";
import { useTable } from "react-table";

const Guests = () => {
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
        Header: "Phone",
        accessor: "phone",
        className: "phone",
        align: "left",
        sortable: true
      },
      {
        Header: "Email",
        accessor: "email",
        className: "phone",
        align: "left",
        sortable: true
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        className: "date",
        align: "left",
        sortable: true
      },
      {
        Header: "Address",
        accessor: "address",
        className: "address",
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
        Cell: ({ row }) => (
          <button className="btn btn-danger btn-sm" onClick={() => deleteRecord(row.original)}>
            <i className="fa fa-trash"></i>
          </button>
        )
      }
    ],
    []
  );

  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const prevPeopleRef = useRef(people);

  useEffect(()=>{
    fetchGuests()
  }, [])

  // useEffect(() => {
  //   const prevPeople = prevPeopleRef.current;

  //   if (prevPeople !== people) {
  //     fetchGuests();
  //   }

  //   prevPeopleRef.current = people;
  // }, [people]);

  const deleteRecord = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!"
    }).then((result) => {
      if (result.value) {
        Swal.fire("Cant do this right now!");
        setPeople([]);
      }
    });
  };

  const fetchGuests = async () => {
    try {
      const resp = await getGuests();
      if (resp.status === 200) {
        let counter = 1;
        const formattedData = resp.data.map((person) => {
          return {
            ...person,
            createdAt: moment(person.createdAt).format("MMMM Do, YYYY"),
            sn: counter++
          };
        });
        setPeople(formattedData);
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.response.data.error);
      setIsLoading(false);
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data: people
  });

  return (
    <Layout title="People > Guests">
      <div className="d-flex" id="wrapper">
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <button className="btn btn-link mt-3" id="menu-toggle"></button>

            <h1 className="mt-2 text-primary">Guests</h1>
            {isLoading ? (
              <Loading />
            ) : (
              <table {...getTableProps()}>
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

export default Guests;
