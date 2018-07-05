import React from "react";
import PropTypes from "prop-types";


/**
    * ProductRating -- make markup for rating stars based on suppled rating
    * @param {String} rating -- it decide nuber of filled stars
    *  @return {Object} -- rating markUP
 */
export const ProductRating = (props) => {
    const starCount = 5,
        filledStarsCount = Number(props.rating) || 0,
        emptyStarsCount = starCount - filledStarsCount;

    /**
         * starCreater -- make markup for rating stars based on suppled rating
         * @param {Number} filledStarsCount -- Numbers of filled Stars
         * @param {Number} emptyStarsCount -- Numbers of empty Stars
         *  @return {array} -- rating markUP
      */
    const starCreater = (filledStarsCount, emptyStarsCount) => {
        const _starMarkUp = [];
        for (let i = 0; i < filledStarsCount; i++) {
            _starMarkUp.push(<img alt="star-filled" key={i} className="product-rating-star" src="images/star-filled.png" />);
        }
        for (let i = filledStarsCount + 1; i <= starCount; i++) {
            _starMarkUp.push(<img alt="star-empty" key={i} className="product-rating-star" src="images/star-empty.png" />);
        }
        return _starMarkUp;
    }

    return (
        <div className="product-rating-container">
            {starCreater(filledStarsCount, emptyStarsCount)}
        </div>
    );
}
ProductRating.propTypes = {
    rating: PropTypes.string.isRequired,
}