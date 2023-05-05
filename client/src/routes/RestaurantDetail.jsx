import React, { useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantFinder from '../apis/RestaurantFinder'


const RestaurantDetail = (props) => {
  const { id } = useParams()
  const [selectedRestaurant, setSelectedRestaurant] = useContext(RestaurantsContext)

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      setSelectedRestaurant(response.data.data.restaurant[0]);
      
    }
    fetchData()
  }, [setSelectedRestaurant])

  return (
    <div>
      <h1>Hey</h1>
      {selectedRestaurant && selectedRestaurant.name}
    </div>
  )
}

export default RestaurantDetail