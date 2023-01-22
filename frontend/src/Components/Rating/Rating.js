import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const  Rating = (props) => {
  const { rating, numReviews } = props;
  return (
    <div className="rating">
     <span>
     {rating >= 1 ? (
        <StarIcon style={{color: '#FF9206'}}/>
      ) : rating >= 0.5 ? (
        <StarHalfIcon style={{color: '#FF9206'}}/>
      ) : (
        <StarBorderIcon style={{color: '#FF9206'}}/>
      )}
      {rating >= 2 ? (
        <StarIcon style={{color: '#FF9206'}}/>
      ) : rating >= 1.5 ? (
        <StarHalfIcon style={{color: '#FF9206'}}/>
      ) : (
        <StarBorderIcon style={{color: '#FF9206'}}/>
      )}
      {rating >= 3 ? (
        <StarIcon style={{color: '#FF9206'}}/>
      ) : rating >= 2.5 ? (
        <StarHalfIcon style={{color: '#FF9206'}}/>
      ) : (
        <StarBorderIcon style={{color: '#FF9206'}}/>
      )}
      {rating >= 4 ? (
        <StarIcon style={{color: '#FF9206'}}/>
      ) : rating >= 3.5 ? (
        <StarHalfIcon style={{color: '#FF9206'}}/>
      ) : (
        <StarBorderIcon style={{color: '#FF9206'}}/>
      )}
      {rating >= 5 ? (
        <StarIcon style={{color: '#FF9206'}}/>
      ) : rating >= 4.5 ? (
        <StarHalfIcon style={{color: '#FF9206'}}/>
      ) : (
        <StarBorderIcon style={{color: '#FF9206'}}/>
      )}
     </span>
      <span className="reviews">{numReviews + " " + 'reviews'}</span>
    </div>
  );
}

export default Rating;
