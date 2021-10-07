import * as mongoDB from 'mongodb'
import * as yup from 'yup'


const userPostSchema = yup.object({
    companyID: yup.number(),
    userID: yup.number(),
    companyName: yup.string().trim().required(),
    fromAddress: yup.string().trim().required(),
    toAddress: yup.string().trim().required(),
    date: yup.date().required(),
    weight: yup.number().required(),
    price: yup.number().required()
})

type userPostType = yup.InferType<typeof userPostSchema>

interface userPostInterface extends userPostType {
    _id: mongoDB.ObjectID
}

export {
    userPostSchema, userPostType, userPostInterface
}