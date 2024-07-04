/* eslint-disable react/prop-types */
import  { useState, useMemo } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table';
import 'tailwindcss/tailwind.css';

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={e => setFilter(e.target.value || undefined)}
      placeholder={`Search ${count} records...`}
      className="border p-1 w-full"
    />
  );
}

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;

  return (
    <input
      value={globalFilter || ''}
      onChange={e => setGlobalFilter(e.target.value || undefined)}
      placeholder={`Search ${count} records...`}
      className="border p-2 mb-4 w-full"
    />
  );
}

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
  editableRowIndex,
  setEditableRowIndex,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = e => setValue(e.target.value);

  const onBlur = () => {
    updateMyData(index, id, value);
    setEditableRowIndex(null);
  };

  return (
    editableRowIndex === index ? (
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="border p-1 w-full"
      />
    ) : (
      <div onClick={() => setEditableRowIndex(index)} className="cursor-pointer">
        {value}
      </div>
    )
  );
};

const EditableHeader = ({ column }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [headerName, setHeaderName] = useState(column.Header);
  const [originalHeader] = useState(column.originalHeader);

  const handleBlur = () => {
    setIsEditing(false);
    column.setHeader(headerName); // Update the header name in the table state
  };

  return (
    <div>
      {isEditing ? (
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
      )}
      <div>{originalHeader}</div>
    </div>
  );
};

const DatatypeSelector = ({ column }) => {
  const [selectedType, setSelectedType] = useState(column.datatype || 'Plain Text');

  const handleChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
    column.setDatatype(newType);
  };

  return (
    <select value={selectedType} onChange={handleChange} className="border p-1">
      <option value="Plain Text">Plain Text</option>
      <option value="Positive Number">Positive Number</option>
      <option value="Currency">Currency</option>
      <option value="Date">Date</option>
    </select>
  );
};

const ColumnVisibilityToggle = ({ allColumns }) => {
  return (
    <div className="mb-4">
      {allColumns.map(column => (
        <div key={column.id} className="inline-block mr-4">
          <label>
            <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
            {column.Header}
          </label>
        </div>
      ))}
    </div>
  );
};

const Table = ({ columns, data, updateMyData, onConsoleLog }) => {
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      Cell: EditableCell,
    }),
    []
  );

  const [editableRowIndex, setEditableRowIndex] = useState(null);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    allColumns,
    visibleColumns,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetSortBy: false,
      updateMyData,
      editableRowIndex,
      setEditableRowIndex,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handlePrint = () => {
    const printContent = document.getElementById('table-to-print').outerHTML;
    const newWin = window.open('');
    newWin.document.write('<html><head><title>Print</title>');
    newWin.document.write('</head><body>');
    newWin.document.write(printContent);
    newWin.document.write('</body></html>');
    newWin.document.close();
    newWin.print();
  };

  return (
    <div className="p-4">
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <ColumnVisibilityToggle allColumns={allColumns} />
      <button onClick={handlePrint} className="mb-4 p-2 bg-blue-500 text-white rounded">
        Print Data
      </button>
      <button onClick={() => onConsoleLog(visibleColumns, rows)} className="mb-4 p-2 bg-green-500 text-white rounded">
        Console Log Data
      </button>
      <div className="overflow-x-auto">
        <table {...getTableProps()} id="table-to-print" className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup, i) => (
              <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, c) => (
                  !column.isHidden && (
                    <th key={c}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <EditableHeader column={column} />
                      <DatatypeSelector column={column} />
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </th>
                  )
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i} {...row.getRowProps()}>
                  {row.cells.map((cell, c) => (
                    !cell.column.isHidden && (
                      <td key={c} {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap">
                        {cell.render('Cell', {
                          editableRowIndex,
                          setEditableRowIndex,
                        })}
                      </td>
                    )
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ReactTable7 = () => {
  const data = useMemo(
    () => [
      { sn: 1, loanId: 'CC-7838818736', bvn: 22142174360, accountOfficer: 'Abiola Idowu', location: 'Mowe Ibafo', phone: '8087708787' },
      { sn: 2, loanId: 'CC-1745125038', bvn: 22180315914, accountOfficer: 'Abraham Onuche Ugbede', location: 'Mowe Ibafo', phone: '8139459858' },
      { sn: 3, loanId: 'CC-391493', bvn: 22357420704, accountOfficer: 'Abraham Onuche Ugbede', location: 'Mowe Ibafo', phone: '8038132864' },
      { sn: 4, loanId: 'CC-3309895881', bvn: 22296094006, accountOfficer: 'Abraham Onuche Ugbede', location: 'Mowe Ibafo', phone: '8024175222' },
      { sn: 5, loanId: 'CC-5431430644', bvn: 22155976018, accountOfficer: 'Abraham Onuche Ugbede', location: 'Mowe Ibafo', phone: '8033447879' },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'S/N',
        accessor: 'sn',
        originalHeader: 'S/N',
        datatype: 'Plain Text',
        setHeader: function(header) { this.Header = header; },
        setDatatype: function(datatype) { this.datatype = datatype; }
      },
      {
        Header: 'Loan Id',
        accessor: 'loanId',
        originalHeader: 'Loan Id',
        datatype: 'Currency',
        setHeader: function(header) { this.Header = header; },
        setDatatype: function(datatype) { this.datatype = datatype; }
      },
      {
        Header: 'BVN',
        accessor: 'bvn',
        originalHeader: 'BVN',
        datatype: 'Positive Number',
        setHeader: function(header) { this.Header = header; },
        setDatatype: function(datatype) { this.datatype = datatype; }
      },
      {
        Header: 'Account Officer',
        accessor: 'accountOfficer',
        originalHeader: 'Account Officer',
        datatype: 'Plain Text',
        setHeader: function(header) { this.Header = header; },
        setDatatype: function(datatype) { this.datatype = datatype; }
      },
      {
        Header: 'Location',
        accessor: 'location',
        datatype: 'Plain Text',
        originalHeader: 'Location',
        setHeader: function(header) { this.Header = header; },
        setDatatype: function(datatype) { this.datatype = datatype; }
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        datatype: 'Positive Number',
        originalHeader: 'Phone',
        setHeader: function(header) { this.Header = header; },
        setDatatype: function(datatype) { this.datatype = datatype; }
      },

],   []
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

  const logCurrentState = (visibleColumns, rows) => {
    const currentData = rows.map(row => {
      const rowData = {};
      visibleColumns.forEach(column => {
        rowData[column.id] = row.values[column.id];
      });
      return rowData;
    });

    const currentHeaders = visibleColumns.map(column => ({
      header: column.Header,
      originalHeader: column.originalHeader,
      datatype: column.datatype,
    }));

    console.log('Current Headers:', currentHeaders);
    console.log('Current Data:', currentData);
  };

  return (
    <Table
      columns={columns}
      data={tableData}
      updateMyData={updateMyData}
      onConsoleLog={logCurrentState}
    />
  );





}
export default ReactTable7;