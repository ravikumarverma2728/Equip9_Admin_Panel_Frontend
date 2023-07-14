import React, { useEffect, useState, useContext } from 'react';
import Navbar from './Navbar';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField } from '@material-ui/core';
import { Edit, Delete, Check, Clear } from '@material-ui/icons';
import '../Css/Crud.css';
import { AppContext } from "../App";
import axios from 'axios';


const useStyles = makeStyles({
  TableContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  table: {
    width: '100%'
  },
  tableHeader: {
    backgroundColor: '#333',
  },
  tableHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
  },

});

const CRUD = () => {
  const { isUserLoggedIn, setUserLoggedin, setUser, user } = useContext(AppContext);
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9000/users/read');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (rowId, rowData) => {
    setEditRowId(rowId);
    setEditData({ ...rowData }); // Set initial editData state based on rowData
    console.log(rowId);
    console.log(rowData);
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditData({});
  };

  const handleUpdate = async (mobile_no) => {
    try {
      const response = await axios.put('http://localhost:9000/users/Update', { mobile_no, ...editData });
      console.log(response);
      setEditRowId(null);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (mobile_no) => {
    try {
      const data = {mobile_no:mobile_no};
      const response = await axios.delete('http://localhost:9000/users/Delete', {data});
      console.log(response);
      fetchData(); // Refresh the data after successful deletion
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event, key) => {
    setEditData((prevData) => ({ ...prevData, [key]: event.target.value }));
  };

  return (
    <>
      <Navbar />
      <div className='row table-wrapper'>
        <div className='col-11'>
          <TableContainer className={classes.TableContainer} component={Paper}>
            <Table className={classes.table} aria-label="user table">
              <TableHead className={classes.tableHeader} >
                <TableRow>
                  <TableCell className={classes.tableHeaderText}>First Name</TableCell>
                  <TableCell className={classes.tableHeaderText}>Last Name</TableCell>
                  <TableCell className={classes.tableHeaderText}>Mobile Number</TableCell>
                  <TableCell className={classes.tableHeaderText}>Admin</TableCell>
                  <TableCell className={classes.tableHeaderText}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((user, index) => (
                  <TableRow key={user.mobile_number}>
                    <TableCell>
                      {editRowId === index ? (
                        <TextField
                          value={editData.first_name || ''}
                          onChange={(event) => handleChange(event, 'first_name')}
                        />
                      ) : (
                        user.first_name
                      )}
                    </TableCell>
                    <TableCell>
                      {editRowId === index ? (
                        <TextField
                          value={editData.last_name || ''}
                          onChange={(event) => handleChange(event, 'last_name')}
                        />
                      ) : (
                        user.last_name
                      )}
                    </TableCell>
                    <TableCell>{user.mobile_number}</TableCell>
                    <TableCell>
                      {user.admin === 1 ? (
                        <Check /> // Display tick icon if user is an admin
                      ) : (
                        <Clear /> // Display cross icon if user is not an admin
                      )}
                    </TableCell>
                    <TableCell>
                      {user.admin === 1 ? (
                        <span className='NA-text'>NA</span> // Display "-" in the Actions column for admin users
                      ) : (
                        <>
                          {editRowId === index ? (
                            <>
                              <IconButton aria-label="check" onClick={() => handleUpdate(user.mobile_number)}>
                                <Check />
                              </IconButton>
                              <IconButton aria-label="clear" onClick={handleCancel}>
                                <Clear />
                              </IconButton>
                            </>
                          ) : (
                            <IconButton aria-label="edit" onClick={() => handleEdit(index, user)}>
                              <Edit />
                            </IconButton>
                          )}
                          <IconButton aria-label="delete" onClick={() => handleDelete(user.mobile_number)}>
                            <Delete />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>
        </div>
      </div>

    </>
  );
};

export default CRUD;
