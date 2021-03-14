const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try { 
        if(filterBy.toyId){
            filterBy.toyId = ObjectId(filterBy.toyId)
        }
        const collection = await dbService.getCollection('review') //bring to DB
        var reviews = await collection.aggregate([
            {
                $match: filterBy
            },
            {
                $lookup:  
                {
                    from: 'user',
                    localField: 'byUserId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup:
                {
                    from: 'toys',
                    localField: 'toyId',
                    foreignField: '_id',
                    as: 'toy'
                }
            },
            {
                $unwind: '$toy'
            }
        ]).toArray()
        // console.log(reviews)
        reviews = reviews.map(review => {
            // const {username, _id} = review.user
            // const {_id, name, price} = review.toy
            ObjectId(filterBy.toyId)
            review.user = { _id: review.user._id, username: review.user.username }
            review.toy = { _id:ObjectId(review.toy._id), name: review.toy.name , price: review.toy.price}
            return review
        })

        return reviews
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }

}

async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { userId, isAdmin } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const query = { _id: ObjectId(reviewId) }
        if (!isAdmin) query.byUserId = ObjectId(userId)
        await collection.deleteOne(query)
        // return await collection.deleteOne({ _id: ObjectId(reviewId), byUserId: ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
} 


async function add(review) {
    try {
        // peek only updatable fields!
        const reviewToAdd = {
            byUserId: ObjectId(review.byUserId),
            toyId: ObjectId(review.toyId),
            content: review.content
        }
        const collection = await dbService.getCollection('review')
        // console.log(reviewToAdd)
        await collection.insertOne(reviewToAdd)
        return reviewToAdd;
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}

module.exports = {
    query,
    remove,
    add
}


