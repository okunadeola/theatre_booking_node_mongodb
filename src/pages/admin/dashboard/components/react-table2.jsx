/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useTable, useSortBy, useFilters, useRowSelect, usePagination } from 'react-table';
import 'tailwindcss/tailwind.css';

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  return <input value={value} onChange={onChange} onBlur={onBlur} className="border p-1" />;
};







const EditableHeader = ({ column }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [headerName, setHeaderName] = useState(column.Header);

  const handleBlur = () => {
    setIsEditing(false);
    column.setHeader(headerName); // Update the header name in the table state
  };

  return isEditing ? (
    <input
      value={headerName}
      onChange={(e) => setHeaderName(e.target.value)}
      onBlur={handleBlur}
      autoFocus
      className="border p-1"
    />
  ) : (
    <span onClick={() => setIsEditing(true)} className="cursor-pointer">
      {headerName} {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
    </span>
  );
};







// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
      className="border p-1"
    />
  );
}







const ReactTable2 = ({ columns, data, updateMyData }) => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      Cell: EditableCell,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetSortBy: false,
      updateMyData,
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
  );

  return (
    <div className="overflow-x-auto">
    <table {...getTableProps()} className="max-w-[80%] divide-y divide-gray-200 overflow-x-auto">
      <thead className="bg-gray-50">
        {headerGroups.map((headerGroup, i) => (
          <tr key={i} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, c) => (
              <th key={c}
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <EditableHeader column={column} />
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200" >
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr key={i} {...row.getRowProps()}>
              {row.cells.map((cell, c) => (
                <td key={c} {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap">
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
};







const AppTable = () => {
  const data = React.useMemo(
    () => [
      { source: 'Google', visitors: 1000, revenues: 10000, sales: 500, name: 'John', age: 30, location: 'USA', conversion: 5 },
      { source: 'Bing', visitors: 800, revenues: 8000, sales: 400, name: 'Jane', age: 25, location: 'UK', conversion: 5 },
      { source: 'Yahoo', visitors: 600, revenues: 6000, sales: 300, name: 'Doe', age: 35, location: 'Canada', conversion: 5 },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'SOURCE',
        accessor: 'source',
        setHeader: function(header) { this.Header = header; }
      },
      {
        Header: 'VISITORS',
        accessor: 'visitors',
        setHeader: function(header) { this.Header = header; }
      },
      {
        Header: 'REVENUES',
        accessor: 'revenues',
        setHeader: function(header) { this.Header = header; }
      },
      {
        Header: 'SALES',
        accessor: 'sales',
        setHeader: function(header) { this.Header = header; }
      },
      {
        Header: 'NAME',
        accessor: 'name',
        setHeader: function(header) { this.Header = header; }
      },
      {
        Header: 'AGE',
        accessor: 'age',
        setHeader: function(header) { this.Header = header; }
      },
      {
        Header: 'LOCATION',
        accessor: 'location',
        setHeader: function(header) { this.Header = header; }
      },
      {
        Header: 'CONVERSION',
        accessor: 'conversion',
        setHeader: function(header) { this.Header = header; }
      },
    ],
    []
  );

  const [tableData, setTableData] = useState(data);

  const updateMyData = (rowIndex, columnId, value) => {
    setTableData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  return <ReactTable2 columns={columns} data={tableData} updateMyData={updateMyData} />;
};

export default AppTable;
