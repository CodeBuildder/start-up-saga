export interface userDB {
    name: string,
    email: string,
    password: string,
    phone: number
}

export interface adminDB {
    companyName: string,
    email: string,
    password: string,
    address: string,
    phone: number
}

export interface companyData {
    companyName: string,
    fromAddress: string,
    toAddress: string,
    date: Date,
    weight: number,
    price: number
}