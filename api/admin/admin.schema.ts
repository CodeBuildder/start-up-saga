import mongoose from "mongoose";

export const adminSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
  },
});

export const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  fromAddress: {
    type: String,

    required: true,
    trim: true,
  },
  toAddress: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Array,
    required: true,
    trim: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Company = mongoose.model("company", companySchema);


export const Admin = mongoose.model("admin", adminSchema);
