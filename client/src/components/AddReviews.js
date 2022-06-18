import React,{useState} from "react";

const AddReviews = () => {
  
    const [name, setName] = useState("")
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState("")

  return (
    <>
      <div className="mb-2">
        <form action="">
          <div className="form-row">
            <div className="form-group col-8">
              <label htmlFor="name">Name</label>
              <input value={name} onChange={e =>setName(e.target.value)} type="text" placeholder="Name" className="form-control" />
            </div>
            <div className="form-group col-4"></div>
            <label htmlFor="rating">Rating</label>
            <select value={rating} onChange={e =>setRating(e.target.value)} id="rating" className="form-select">
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>

            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Reviews">Reviews</label>
            <textarea
            value={reviewText} onChange={e =>setReviewText(e.target.value)}
              id="Reviews"
              className="form-control"
            ></textarea>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddReviews;
