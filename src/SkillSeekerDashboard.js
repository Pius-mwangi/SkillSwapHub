import React, { useState, useEffect } from 'react';
import './SkillSeekerDashboard.css'; // Import the CSS file
import { useTable, useSortBy, useGlobalFilter } from 'react-table';

function SkillSeekerDashboard() {
  const [serviceRequest, setServiceRequest] = useState({
    title: '',
    description: '',
    location: '',
    status: '',
  });

  const [providers, setProviders] = useState([]);

  useEffect(() => {
    fetch('https://skillswap-0fqo.onrender.com/service-providers')
      .then((response) => response.json())
      .then((data) => {
        setProviders(data);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }, []);

  const data = React.useMemo(() => providers, [providers]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Full Name',
        accessor: 'fullname',
      },
      {
        Header: 'Skills',
        accessor: 'skills',
      },
      {
        Header: 'Experience',
        accessor: 'experience',
      },
      {
        Header: 'Availability',
        accessor: 'availability',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceRequest({ ...serviceRequest, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://skillswap-0fqo.onrender.com/service-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceRequest),
    })
      .then((response) => {
        if (response.ok) {
          alert('Service request created successfully');
          setServiceRequest({
            title: '',
            description: '',
            location: '',
            status: '',
          });
        } else {
          alert('Service request creation failed');
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  return (
    <div className="skill-seeker-dashboard">
    <div className="sidebar">
      <ul>
        <li className="add-cv">
          <div className="sidebar-option">
            <span className="sidebar-icon">➕</span> ADD CV
          </div>
        </li>
        <li className="add-profile-photo">
          <div className="sidebar-option">
            <span className="sidebar-icon">📷</span> ADD PROFILE PHOTO
          </div>
        </li>
        <li className="messaging">
          <div className="sidebar-option">
            <span className="sidebar-icon">💬</span> MESSAGING
          </div>
        </li>
        <li className="contact-us">
          <div className="sidebar-option">
            <span className="sidebar-icon">📞</span> CONTACT US
          </div>
        </li>
        {/* Add more sidebar options here */}
      </ul>
    </div>
      <div className="content">
        <form onSubmit={handleSubmit} className="service-request-form">
          {/* Your form inputs go here */}
        </form>

        <div className="table-container">
          <input
            type="text"
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search by Full Name..."
            className="search-input"
          />
          <table {...getTableProps()} className="provider-table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(
                        column.getSortByToggleProps()
                      )}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="provider-row">
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="provider-cell"
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SkillSeekerDashboard;
