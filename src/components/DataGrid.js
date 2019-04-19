import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: "rgba(251,251,251,1)"
    }
  }
}));

export default function Grid({
  loading = false,
  selection = [],
  selectionCount = 0,
  count = 0,
  data = [], columns = [],
  onSelect = () => { },
  onChange = () => { },
  onClick = () => { },
  onDelete = () => { },
  noDataLabel = 'No data available',
  selectionLabel = `${selectionCount} selected`,
  deleteLabel = 'Delete',
  rowsPerPageOptions = [5, 10, 15],
  selectable = false,
  rowsPerPage: initRowsPerPage = rowsPerPageOptions[0],
  page: initPage = 0,
  order: initOrder = 'desc',
  orderBy: initOrderBy = 0
}) {
  const [rowsPerPage, setRowsPerPage] = useState(initRowsPerPage);
  const [page, setPage] = useState(initPage);
  const [order, setOrder] = useState(initOrder);
  const [orderBy, setOrderBy] = useState(initOrderBy);

  // reset page to the closest count
  if (count < page * rowsPerPage) {
    setPage(0)
  }

  const handleChangeRowsPerPage = (e) => {
    let oldRowsPerPage = rowsPerPage;
    let currentPage = page;
    let newRowsPerPage = e.target.value;
    setRowsPerPage(e.target.value);

    // FIXME: make sure that's right
    let newCurrentPage = newRowsPerPage > oldRowsPerPage ?
      Math.floor((currentPage + 1 * oldRowsPerPage) / newRowsPerPage) :
      Math.floor((currentPage + 1 * oldRowsPerPage - oldRowsPerPage) / newRowsPerPage);

    setPage(newCurrentPage);
  }

  // update external listeners
  useEffect(() => {
    onChange({ page, rowsPerPage, order, orderBy })
  }, [page, rowsPerPage, order, orderBy])

  const classes = useStyles();

  let columnsCount = columns.length + (selectable ? 1 : 0)

  return (<>
    <Popover
      open={loading}
      anchorEl={document.getElementById('root')}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      elevation={3}
    ><Box p={2}>
      <CircularProgress/>
    </Box>
    </Popover>

    <Table id="transactions-grid">
      <TableHead>
        <Box clone>
          <TableRow>
            { selectable &&
              <TableCell padding="checkbox">
                <Checkbox
                  disabled={!data.length}
                  indeterminate={!!selectionCount}
                  checked={selection.length === data.length}
                  onChange={(e) => {
                    // if all visible items are selected, unselect them, otherwise select
                    let set = new Set(selection)
                    if (data.every((row, i) => set.has(i))) {
                      data.forEach((row, i) => set.delete(i))
                    }
                    else {
                      data.forEach((row, i) => set.add(i))
                    }
                    selection = Array.from(set).sort()
                    onSelect(selection)
                  }}
                />
              </TableCell>
            }
            {columns.map((column, colId) => (
              <TableCell key={'col-' + column.id}
                variant="head"
                sortDirection={orderBy === colId ? order : false}
              >
                <TableSortLabel
                  active={orderBy === colId}
                  direction={order}
                  onClick={() => {
                    setOrderBy(colId)
                    setOrder(order === 'desc' ? 'asc' : 'desc')
                  }}>
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </Box>
      </TableHead>

      <TableBody>
        {!data.length ? (
          <TableRow>
            <TableCell colSpan={columnsCount} rowSpan={2} align="center">
              {noDataLabel}
            </TableCell>
          </TableRow>
        ) : data.map((row, i) => (!row ?
            <TableRow key={'row-'+i}><TableCell colSpan={columnsCount} align="center">
              <LinearProgress color="secondary" /></TableCell>
            </TableRow>
            :
            <TableRow
              key={'row-'+i}
              className={classes.row}
              hover
              onClick={(e) => (onClick(e, row))}
            >{
              selectable &&
              <TableCell padding="checkbox" onClick={stopPropagation}>
                <Checkbox checked={selection.indexOf(i) >= 0} onChange={(e,a) => {
                  let set = new Set(selection)
                  set.has(i) ? set.delete(i) : set.add(i)
                  selection = Array.from(set).sort()
                  onSelect(selection)
                }}/>
              </TableCell>
            }
            {
              columns.map((column, idx) => <TableCell key={'row-' + i + '-' + column.id}>{
                column.value ? column.value(row) : row[column.id]
              }</TableCell>)
            }
            </TableRow>
          ))
        }
      </TableBody>

      <TableFooter>
        <TableRow>
          { selectable &&
            <TableCell colSpan={2}>
              <Box display={!selectionCount ? 'none' : 'flex'} flexDirection="row" alignItems="center" hidden={!selectionCount}>
                <Tooltip title={deleteLabel}>
                  <IconButton aria-label={deleteLabel} onClick={onDelete} style={{ margin: -12, padding: 8}}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2" noWrap style={{marginLeft: 16}}>
                  { selectionLabel }
                </Typography>
              </Box>
            </TableCell>
          }
          <TablePagination
            count={count}
            page={page}
            component="td"
            rowsPerPage={rowsPerPage}
            labelRowsPerPage={null}
            onChangePage={(e, page) => {
              setPage(page)
            }}
            onChangeRowsPerPage={(e) => {
              handleChangeRowsPerPage(e)
            }}
            rowsPerPageOptions={rowsPerPageOptions}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
          >
          </TablePagination>
        </TableRow>
      </TableFooter>
    </Table>
  </>
  )
}


function stopPropagation(e) {
  e.stopPropagation()
}
