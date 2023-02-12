import react, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Table } from "../components/table";
import { AuthContext } from "../context/authContext.js";
import axios from "axios";

function Gps_Info() {
    const { currentUser } = useContext(AuthContext);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8800/backend/users/gps_info")
                setRows(res.data);
                //console.log(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);
    const columns = [
        { accessor: 'DeviceID', label: 'DeviceID' },
        { accessor: 'Device Type', label: 'DeviceType' },
        { accessor: 'Timestamp', label: 'Timestamp' },
        { accessor: 'location', label: 'location' },
    ]

    /*const rows = [
        { id: 1, name: 'Liz Lemon', age: 36, is_manager: true, start_date: '02-28-1999' },
        { id: 2, name: 'Jack Donaghy', age: 40, is_manager: true, start_date: '03-05-1997' },
        { id: 3, name: 'Tracy Morgan', age: 39, is_manager: false, start_date: '07-12-2002' },
        { id: 4, name: 'Jenna Maroney', age: 40, is_manager: false, start_date: '02-28-1999' },
        { id: 5, name: 'Kenneth Parcell', age: Infinity, is_manager: false, start_date: '01-01-1970' },
        { id: 6, name: 'Pete Hornberger', age: 42, is_manager: true, start_date: '04-01-2000' },
        { id: 7, name: 'Frank Rossitano', age: 36, is_manager: false, start_date: '06-09-2004' },
        { id: 8, name: null, age: null, is_manager: null, start_date: null },
    ]*/
    return (
        <>
        <div className="gps_info">
                {currentUser ? (
                <>
                    <h1>Table</h1>
                        <h1>Hello {currentUser.username} <span><Link className="link" to="/logout">Logout </Link></span></h1>
                    <Table rows={rows} columns={columns} />
                </>
            ):(
                        <h1> Please <Link className="link" to="/login">Login </Link> to view result</h1>
            )}
        </div >
       </>
    );
}

export default Gps_Info;
