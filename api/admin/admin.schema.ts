import * as mongoDB from "mongodb";
import * as yup from "yup";

const adminSchema = yup.object({
  companyName: yup.string().trim().required().lowercase(),
  email: yup.string().email().required().required(),
  address: yup.string().trim().required(),
  password: yup.string().trim().required(),
  phone: yup.number().required(),
});

const companySchema = yup.object({
  companyName: yup.string().trim().required(),
  fromAddress: yup.string().trim().required(),
  toAddress: yup.string().trim().required(),
  date: yup.array().of(yup.date().required()).required(),
  weight: yup.number().required(),
  price: yup.number().required(),
});

type adminType = yup.InferType<typeof adminSchema>;
type companyType = yup.InferType<typeof companySchema>;

interface adminInterface extends adminType {
  _id: mongoDB.ObjectID;
}

interface companyInterface extends companyType {
  _id: mongoDB.ObjectID;
}

export {
  adminSchema,
  adminType,
  adminInterface,
  companySchema,
  companyType,
  companyInterface,
};
