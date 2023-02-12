import react, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Table } from "../components/table";
import { AuthContext } from "../context/authContext.js";
import axios from "axios";

function Gps_Details() {
    const { currentUser } = useContext(AuthContext);
    const [rows, setRows] = useState([]);

    const location = useLocation();
    const DeviceID = (location.pathname.split("/")[2]).substring(1)
    console.log(DeviceID);
    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const res = await axios.get("http://localhost:8800/backend/users/gps_details/:"+ DeviceID)
                setRows(res.data);
                //console.log(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    const columns = [
        { accessor: 'DeviceID', label: 'DeviceID' },
        { accessor: 'location', label: 'location' },
    ]

  
    return (
        <>
            <div className="gps_details">
                {currentUser ? (
                    <>
                        <h1>Table</h1>
                        <h1>Hello {currentUser.username} <span><Link className="link" to="/logout">Logout </Link></span></h1>
                       
                        <table>
                            <thead>
                                <tr>
                                    {columns.map((column) => {
                                        
                                        return (
                                            <th key={column.accessor}>
                                                <span>{column.label}</span>
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row) => {
                                    return (

                                        <tr key={row.id}>
                                            {columns.map((column) => {
                                            return <td key={column.accessor}>{row[column.accessor]}</td>
                                            })}
                                            
                                        </tr>


                                    )
                                })}

                            </tbody>
                        </table>
                    </>
                ) : (
                        <h1> Please <Link className="link" to="/login">Login </Link> to view result</h1>
                    )}
            </div >
        </>
    );
}

export default Gps_Details;
