import React, { useEffect, useContext } from 'react' 
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

function RestaurantList(props) {
  // retrieve the state and functions from the context
  const [restaurants, setRestaurants] = useContext(RestaurantsContext)

  // make an API call to the server to get a list of restaurants
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/")
        setRestaurants(response.data.data.restaurants)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  },[setRestaurants])

  const handleDelete = async (id) => {
    try {
      const response = await RestaurantFinder.delete(`/${id}`)
      console.log(response);
      // PROBABLY BAD PRACTICE, WORKS FOR NOW
      window.location.reload()
    } catch (err) {
      console.error(err)
    }
  }
   
  return (
    <div>
      <div className="list-group">
        <table className="table table-hover table-dark">
          <thead>
            <tr className="bg-primary">
              <th scope='col'>Restaurant</th>
              <th scope='col'>Location</th>
              <th scope='col'>Price Range</th>
              <th scope='col'>Ratings</th>
              <th scope='col'>Edit</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map(restaurant => {
              return (
              <tr key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{"$".repeat(restaurant.price_range)}</td>
                <td>reviews</td>
                <td><button className="btn btn-warning">Update</button></td>
                <td><button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger">Delete</button></td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RestaurantList
