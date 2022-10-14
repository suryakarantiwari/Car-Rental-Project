import React from "react";
import { useState , useEffect} from "react";
import axios from "axios";
import Layout from "../components/Layout";

const Profile = () =>{

    const [allRentCar,setAllRentCar]= useState([]);

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null;

    useEffect(() => {
        
        fetchData();
      }, [])

      const fetchData = async () => {
        const result = await axios.get(`/api/rent/rentcar/${userInfo._id}`);
        setAllRentCar(result.data);
        console.log(allRentCar)
      }

      const cancel = (id)=>{
        fetch(`/api/rent/rentcar/${id}`,{
            method: 'DELETE'
        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp)
                fetchData();
            })
        })
      }
    return(
        <Layout>
            <div className="profile-bg">
                <div className="content-row">
                    <h1 className="book-car-title">Booked Cars</h1>
                    <table border={1} className="profiletable">
                        <thead>
                            <tr>
                                <th className="profileth">Car</th>
                                <th className="profileth">From</th>
                                <th className="profileth">To</th>
                                <th className="profileth">Total Days</th>
                                <th className="profileth">Driver Required</th>
                                <th className="profileth">Total Ammount</th>
                                <th className="profileth">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allRentCar.map((item)=>(
                                <tr>
                                    <td className="profiletd">{item.carName}</td>
                                    <td className="profiletd">{item.bookedTimeSlots.from}</td>
                                    <td className="profiletd">{item.bookedTimeSlots.to}</td>
                                    <td className="profiletd">{item.totalDays}</td>
                                    <td className="profiletd">{item.driverRequired? "yes": "No"}</td>
                                    <td className="profiletd">{item.total}</td>
                                    <td className="profiletd">{<button onClick={()=>cancel(item._id)} className="cancelbtn">Cancel</button>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default Profile;