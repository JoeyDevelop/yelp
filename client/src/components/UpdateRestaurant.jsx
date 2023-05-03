import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';

function UpdateRestaurant() {
  // useParams fetches id from URL
  const { id } = useParams()
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send update query to backend
      // eslint-disable-next-line no-unused-vars
      const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
        name: name,
        location: location,
        price_range: priceRange,
      });
      // Send user back to homepage after update
      navigate(`/`);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() =>{
    const fetchData = async () => {
      try {
        // Make sure all data fields are correct on page load
        const response = await RestaurantFinder.get(`/${id}`)
        const restaurant = response.data.data.restaurant[0];
        setName(restaurant.name);
        setLocation(restaurant.location);
        setPriceRange(restaurant.price_range);
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [id])
  
  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input value={name} onChange={e => setName(e.target.value)} id='name' className='form-control' type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input value={location} onChange={e => setLocation(e.target.value)} id='location' className='form-control' type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <select value={priceRange} onChange={e => setPriceRange(e.target.value)} name="price_range" id="price_range" className='form-control'>
            <option disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <button type='submit' onClick={(e) => handleSubmit(e)} className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}

export default UpdateRestaurant
