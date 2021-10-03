import * as mongoDB from 'mongodb'
import * as yup from 'yup'

const adminSchema = yup.object({
    name: yup.string().trim().required().lowercase(),
    email: yup.string().email().required().required(),
    address: yup.string().trim().required(),
    password: yup.string().trim().required(),
    phone: yup.number().required()
})

type adminType = yup.InferType<typeof adminSchema>

interface adminInterface extends adminType {
    _id: mongoDB.ObjectID
}

export {
    adminSchema, adminType, adminInterface
}