import React, { useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantFinder from '../apis/RestaurantFinder'
import Reviews from '../components/Reviews'
import AddReview from '../components/AddReview'


const RestaurantDetail = (props) => {
  const { id } = useParams()
  const [selectedRestaurant, setSelectedRestaurant] = useContext(RestaurantsContext)

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      setSelectedRestaurant(response.data.data);
    }

    fetchData()
  }, [id, setSelectedRestaurant])

  return (
    <div>
      {selectedRestaurant && selectedRestaurant.reviews && selectedRestaurant.restaurant && (
        <>
        <h1 className='text-center display-1'>{selectedRestaurant.restaurant[0].name}</h1>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews}/>
          </div>
          <AddReview />
        </>
      )}
    </div>
  )
}

export default RestaurantDetail