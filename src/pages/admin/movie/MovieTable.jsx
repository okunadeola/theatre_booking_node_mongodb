/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Spinner,
  Pagination,
  Avatar, useDisclosure
} from "@nextui-org/react";
import {VerticalDotsIcon} from "./components/VerticalDotsIcon";
import {SearchIcon} from "./components/SearchIcon";
import {ChevronDownIcon} from "./components/ChevronDownIcon";
import { movieStatusOptions, movieColumns} from "./components/data";
import {capitalize} from "../../../utils";
import AddMovieDrawer from "./components/AddMovieDrawer";
import { getPaginatedMoviesAction } from "../../../API/movies";
import { showError } from "../../../utils";
import MovieModal from "./components/MovieModal";

const statusColorMap = {
  0: "danger",
  1: "danger",
  2: "warning",
  3: "warning",
  4: "success",
  5: "success",
};

const INITIAL_VISIBLE_COLUMNS = ["img", "title", "price", "rating", "genre", "actions"];


export default function MovieTable() {

  const {onOpen, isOpen, onClose} = useDisclosure()

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "title",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const [totalCount, setTotalCount] = React.useState(null);
  const [nextPage, setNextPage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [movieData, setMovieData] = React.useState([]);


  const hasSearchFilter = Boolean(filterValue);
  const hasNextPage = Boolean(nextPage);


  const loadingState = isLoading || movieData.length === 0 ? "loading" : "idle";




  // movie
  const [curMovie, setCurMovie] = React.useState(null)





  useEffect(() => {
  
    const getMovie = async ()=>{
        onPage()
        setPage(1)
    }
  
    getMovie()
  
  }, [])





  const onPage = React.useCallback( async (next) => {
    try {
        setIsLoading(true)
        const res = await getPaginatedMoviesAction({page:next ||page, limit: 5})
        if(res){
           setMovieData(res?.movies)
           setTotalCount(res?.totalCount)
           setNextPage(res?.nextPage)
           setIsLoading(false)

        }
     } catch (error) {
        setIsLoading(false)
       showError(error?.toString());
     }
  }, [page]);

  const togglePage = (next)=>{
    setPage(next)
    onPage(next)
  }

















  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return movieColumns;

    return movieColumns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);



  const filteredItems = React.useMemo(() => {
    let filteredMovies = [...movieData];

    if (hasSearchFilter) {
        filteredMovies = filteredMovies.filter((mv) =>
        mv.title.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== movieStatusOptions.length) {
        const val = []
        Array.from(statusFilter)?.map(elm => {
          movieStatusOptions?.map(e =>{
            if(e.uid === elm){
              val.push(e.name)
              return e
            }
            return elm
          })
        })        
        filteredMovies = filteredMovies.filter((mv) => val.includes(mv.averageRating ),
      );
    }

    return filteredMovies;
  }, [movieData, filterValue, statusFilter]);


  const pages = Math.ceil(totalCount / rowsPerPage);



  const sortedItems = React.useMemo(() => {
    return [...movieData].sort((a, b) => {
     const  first = sortDescriptor.column === 'rating' ?  a.averageRating :  a[sortDescriptor.column];
      const second = sortDescriptor.column === 'rating' ?  b.averageRating : b[sortDescriptor.column];

      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, movieData, page, filteredItems]);








  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
      onPage(page + 1)
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
      onPage(page - 1)
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])



  const handleViewMovie = (val)=>{
    onOpen()
    // console.log(val)
    setCurMovie(val)
  }



// top center
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
           
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {movieColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
           
            <AddMovieDrawer/>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {movieData?.length} movies</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    movieData.length,
    onSearchChange,
    hasSearchFilter,
  ]);



//   boottom center
  const bottomContent = React.useMemo(() => {

    var currentPage = page; // Example: Current page number
    // var toCount = totalCount; // Example: Total count of entries per page
    var entriesPerPage = 5; // Example: Number of entries per page

    // Calculate the range of entries being displayed on the current page
    var startEntry = (currentPage - 1) * entriesPerPage + 1;
    var endEntry = Math.min(currentPage * entriesPerPage, totalCount);

    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {movieData?.length ?      `Showing  ${startEntry} to ${endEntry}    of ${totalCount} entries` : ''}

        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={togglePage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, movieData.length, page, pages, hasSearchFilter]);



// render cell
  const renderCell = React.useCallback((mv, columnKey) => {
    const cellValue = mv[columnKey];
    // console.log(mv, columnKey)

    // ["image", "title", "price", "rating", "genre", "actions"];
    switch (columnKey) {
      case "img":
        return (
        //     <User
        //     avatarProps={{radius: "lg", src: mv?.img}}
        //     description={mv?.img}
        //     name={''}
        //   >
        //     {mv.img}
        //   </User>
        // <p className="text-bold text-tiny capitalize text-default-400">{mv.img}</p>
        <Avatar src={mv?.img} size="lg" className="rounded-2xl"  />
        
        );
      case "title":
        return (
      
          <p className="text-bold text-tiny capitalize text-default-400">{cellValue}</p>
        );
      case "price":
        return (
          <p className="text-bold text-tiny capitalize text-default-400">{cellValue}</p>
        );
      case "genre":
        return (
          <p className="text-bold text-tiny capitalize text-default-400">{cellValue}</p>
        );
      case "rating":
        return (
          <Chip className="capitalize text-center" color={statusColorMap[mv.averageRating
          ]} size="sm" variant="flat">
            {mv.averageRating} star
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="drop">
                <DropdownItem onClick={()=>handleViewMovie(mv)} >View</DropdownItem>
                <DropdownItem onClick={()=>handleViewMovie(mv)}>Edit</DropdownItem>
                <DropdownItem onClick={()=>{}}>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);






  return (

    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[482px]",
        }}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys} 
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody  emptyContent={"No users found"} items={sortedItems} loadingContent={<Spinner />}
          loadingState={loadingState}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    
    <MovieModal isOpen={isOpen} onClose={onClose} data={curMovie}  />
    
    </>
  );
}
