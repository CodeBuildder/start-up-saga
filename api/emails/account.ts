const sgMail = require('@sendgrid/mail')
import dotenv from "dotenv";
dotenv.config({ path: "./.env" })

sgMail.setApiKey(process.env.SENDGRID_API_KEY)




export const sendOrderConfirmationEmail = (email: string, name: string, id: any, fromAddress: string, toAddress: string) => {

    const output = `
    <p style="color: #000000">Hello ${name}, 
    <br>
    <br>
    <b><i>Your order has been successfully placed.</b></i> 
    <br>
    Your parcel from ${fromAddress} to ${toAddress} has an expected of 72hours
    <br>
    <br>
    <br>
    <b>
    Order ID: ${id}
    </b>
    <br>
    <br>
    You can track your order at http://localhost:3000/track
    Post.io at your service. 
    </p>
    <br>
    <br>
    <br>    
    <br>
    <br>
    <p style="color: #000000">
    You are receving this mail because you have opted for our service. Do reach out to us 
    if you think this is a mistake. 
    </p>
  `;

    sgMail.send({
        to: email,
        from: 'kums2kaushik@gmail.com',
        subject: 'Order Placed Successfully!',
        html: output
    })
}

//expected delivery
//

// const sendCancelEmail = (email: sr, name) => {
//     sgMail.send({
//         to: email,
//         from: 'kums2kaushik@gmail.com',
//         subject: 'Thank you for allowing us to make your day easier!',
//         text: `Hey, ${name}. We are glad you took the time to use our Task App. We hope we helped your make you schedule easier to go over with. Please send a feedback to allow us to make our app better!`
//     })
// }

