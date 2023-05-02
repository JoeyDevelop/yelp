import React, { useState }  from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'

function AddRestaurant() {
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState("Price Range")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name: name,
        location: location,
        price_range: priceRange
      })
      console.log(response)
      // MAY BE BAD PRACTICE, WORKS FOR NOW
      window.location.reload()
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className='mb-4'>
      <form action="">
        <div className="row">
          <div className="col-4">
            <input value={name} onChange={e => setName(e.target.value)} type="text" className='form-control' placeholder='name'/>
          </div>
          <div className="col-4">
            <input value={location} onChange={e => setLocation(e.target.value)} type="text" className='form-control' placeholder='location'/>
          </div>
          <div className="col-3">
            <select
              value={priceRange}
              onChange={e => setPriceRange(e.target.value)}
              className='custom-select my-1 mr-sm-2 form-control w-100'
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button type='submit' onClick={handleSubmit} className='col-1 btn btn-primary'>Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant
