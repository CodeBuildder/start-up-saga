import * as mongoDB from 'mongodb'
import * as yup from 'yup'

const userSchema = yup.object({
    name: yup.string().trim().required().lowercase(),
    email: yup.string().email().required().required(),
    password: yup.string().trim().required(),
    phone: yup.number().required()
})

type userType = yup.InferType<typeof userSchema>

interface userInterface extends userType {
    _id: mongoDB.ObjectID
}

export {
    userSchema, userType, userInterface
}