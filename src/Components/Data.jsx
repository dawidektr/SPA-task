import {
  Box,
  Button,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useSortBy, useTable, usePagination, useFilters } from 'react-table';

const Data = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputSearch = e => {
    const id = e.target.value;
    const searchPage = searchParams.get('page');

    if (searchPage !== null) {
      if (id) {
        setSearchParams({ id, page: searchPage });
        setFilter('id', id);
      } else {
        setSearchParams({ page: searchPage });
        setFilter('id', '');
      }
    } else {
      if (id) {
        setSearchParams({ id });
        setFilter('id', id);
      } else {
        setSearchParams({});
        setFilter('id', '');
      }
    }
  };

  const handlePaginationSearch = type => {
    const id = searchParams.get('id');
    if (id) {
      if (type === 'previous') {
        setSearchParams({ id, page: pageIndex });
        previousPage();
      } else if (type === 'next') {
        setSearchParams({ id, page: pageIndex + 2 });
        nextPage();
      }
    } else {
      if (type === 'previous') {
        setSearchParams({ page: pageIndex });
        previousPage();
      } else if (type === 'next') {
        setSearchParams({ page: pageIndex + 2 });
        nextPage();
      }
    }
  };

  const productsData = useMemo(() => [...data], [data]);

  const productsColumns = useMemo(
    () =>
      data[0]
        ? Object.keys(data[0])
            .filter(key => key !== 'pantone_value')
            .map(key => {
              return { Header: key, accessor: key };
            })
        : [],
    [data]
  );

  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
      initialState: {
        pageIndex: parseInt(searchParams.get('page')) - 1 || 0,
        pageSize: 5,
        hiddenColumns: ['color'],
        filters: [
          {
            id: 'id',
            value: searchParams.get('id') || '',
          },
        ],
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex },
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setFilter,
  } = tableInstance;

  return (
    <>
      <Box w={'10%'} m={'0 auto'} mt={'150'} mb={10}>
        <Input
          type="number"
          defaultValue={searchParams.get('id') || ''}
          placeholder="Filter by id"
          onChange={handleInputSearch}
        />
      </Box>
      <TableContainer width={'60%'} m="0 auto">
        <Table
          variant="striped"
          colorScheme="blackAlpha"
          size="md"
          {...getTableProps()}
          border={'3px solid white'}
        >
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th
                    textAlign={'center'}
                    fontSize={'xl'}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                    {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);

              return (
                <Tr bgColor={row.values.color} {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <Td
                      textAlign={'center'}
                      fontSize={'medium'}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Box
        display={'flex'}
        alignContent="center"
        alignItems={'center'}
        width="100%"
        justifyContent={'center'}
        mt={2}
      >
        <Box mr={2}>
          <Button
            onClick={() => handlePaginationSearch('previous')}
            disabled={!canPreviousPage}
          >
            <ArrowBackIcon />
          </Button>{' '}
          <Button
            onClick={() => handlePaginationSearch('next')}
            disabled={!canNextPage}
          >
            <ArrowForwardIcon />
          </Button>{' '}
          {pageOptions.length !== 0 && pageIndex + 1 <= pageOptions.length ? (
            <Text ml={2} as="span">
              Strona <Text as="strong">{pageIndex + 1}</Text> z{' '}
              {pageOptions.length}
            </Text>
          ) : (
            <Text>There is no data. Please change page or filter</Text>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Data;
