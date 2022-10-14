import React, {useState} from 'react'
import Layout from '../components/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { DatePicker } from 'antd';
import moment from 'moment';
import { rentCar } from '../redux/actions/rent'
import { useDispatch } from 'react-redux'

const { RangePicker } = DatePicker;

const Car = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [car, setCar] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalDays, setTotalDays] = useState(0);
  const [driver, setDriver] = useState(false);
  const [total, setTotal] = useState(0);

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null;

  const params = useParams();
    const {carId} = params;

  useEffect(() => {
    if(!localStorage.getItem("userInfo")) {
      navigate('/login');
    }

    const fetchData = async () => {
        
      try {
        const result = await axios.get(`/api/cars/car/${carId}`);
        console.log(result.data);
        setCar(result.data)

      } catch(err) {
        console.log("Error!");
      }
      
    }
    fetchData();

    setTotal(totalDays * car.payPerDay);
    console.log(total)
    if (driver) {
      setTotal(total + 1000 * totalDays);
    }


  }, [carId, navigate, driver, car.payPerDay, totalDays])


  const selectTime = (values) => {
    setFrom(moment(values[0]).format("MMM:DD:yyy HH:mm"));
    setTo(moment(values[1]).format("MMM:DD:yyy HH:mm"));

    setTotalDays(values[1].diff(values[0], 'Days'))
  }


 

  const rentNow = () => {
    const reqObj = {
      user: userInfo._id,
      car: car._id,
      carName: car.name,
      totalDays,
      total,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(rentCar(reqObj));
    navigate('/');
  }


  return (
    <Layout>
      <div className="car-rent-bg">
        <h3 className="rent-a-car">Rent a Car</h3>
        <div className="car-row">
          <div className="car-col">
            <div className="car-groups">
              <div className="car-group">
                {/* <h2 className="car-subtitle">****Car Info****</h2> */}
                <div className="car-info">
                  <table className='car-table'>
                    <thead>
                      <tr>
                        <th className="carth">Car Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="cartd">Car Name : {car.name}</td></tr>
                      <tr><td className="cartd">Pay per Day : &#x20B9;{car.payPerDay}</td></tr>
                      <tr><td className="cartd">Fuel type : {car.fuelType}</td></tr>
                      <tr><td className="cartd">Max Capicity : {car.capacity}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="car-group">
                <h2 className='select-date'>Select Dates</h2>
                <div className="car-rent-text">
                  <span className='form-text'>From</span>
                  <span className='to-text'>To</span>
                </div>
                <div className="car-info">
                  <RangePicker showTime={{format: "HH:mm"}} format="YYYY-MM-DD HH:mm:ss" onChange={selectTime} />
                  {from && to && (
                    <>
                      <h2 className='final-check-out'>Final check out</h2>
                      <div className='final-check-div'>
                      <span>Total Days: {totalDays}</span><br />
                      <span>Pay Per Day: &#x20B9;{(car.payPerDay)?.toFixed(2)}</span><br/>
                      <p className='driver'>
                        <input type="checkbox" onChange={(e) => {
                          if(e.target.checked) {
                            setDriver(true)
                          } else {
                            setDriver(false)
                          }
                          }} id="driver"/> 
                        <label htmlFor='driver'>Driver Required</label>
                      </p>
                      </div>
                      <div className="total">
                        <h1 className="totalTitle">Total Amount: &#x20B9;{(total)}</h1>
                      </div>
                      <button className='rent-now' onClick={rentNow}>Rent Now</button>
                      
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="car-col">
            <div className="car-image">
              <img src={car.image} className="car-img" alt={car.name} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Car