import RatingStars from 'react-rating-stars-component';
const MovieRating = ({ rating }) => {
    return (
        <div>
            <RatingStars
                count={5}
                value={rating}
                size={24}
                activeColor="#ffd700"
                inactiveColor="#e4e5e9"
                edit={false}
            />
        </div>
    );
};

export default MovieRating;