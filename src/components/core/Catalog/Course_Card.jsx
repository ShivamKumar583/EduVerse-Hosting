import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRatings'

const Course_Card = ({course, Height}) => {

    const [avgReviewCount , setAvgReviewCount] = useState(0)

    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReviews)
        setAvgReviewCount(count)
    },[course])

  return (
    <>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div className="rounded-lg">
                    <img src={course?.thumbnail} 
                        alt='course thumbnail'
                        className={`${Height} w-full rounded-xl object-cover`}
                    />
                </div>
                <div className="flex flex-col gap-2 px-1 py-3">
                    <p className="text-xl text-primaryDark">{course?.courseName}</p>
                    <p className="text-sm text-primaryDark2">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-primaryDark">{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount}/>
                        <span  className="text-primaryDark2">{course?.ratingAndReviews?.length} Ratings</span>
                    </div>
                    <p className="text-xl text-primaryDark">Rs. { course?.price}</p>
                </div>
            </div>
        </Link>
    </>
  )
}

export default Course_Card