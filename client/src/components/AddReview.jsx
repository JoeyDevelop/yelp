import React, { useState } from 'react' 

function AddReview() {
  const [name, setName] = useState("")
  const [rating, setRating] = useState("Rating")
  const [reviewText, setReviewText] = useState("")

  return (
    <div className='mb-2'>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id='name'
              placeholder='John Doe' 
              type="text" 
              className='form-control'
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="rating">Rating</label>
            <select 
              value={rating}
              onChange={e => setRating(e.target.value)}
              id="rating" 
              className='custom-select my-1 mr-sm-2 form-control w-100'
            >
              <option disabled defaultValue={"Rating"}>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            id="Review" 
            className='form-control'
          />
        </div>
        <button type='submit' className='btn btn-primary mt-2'>Submit</button>
      </form>
    </div>
  )
}

export default AddReview
  