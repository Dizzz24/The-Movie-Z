import RatingStars from 'react-rating-stars-component';
const MovieRating = ({ rating }) => {
    return (
        <RatingStars
            count={5}
            value={rating}
            size={20}
            activeColor="#ffd700"
            inactiveColor="#e4e5e9"
            edit={false}
        />
    );
};

export default MovieRating;