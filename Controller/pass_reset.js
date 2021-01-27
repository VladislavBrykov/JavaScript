async function pass_reset(id, email) {
const nodemailer = require('nodemailer')

let testEmailAccount = await nodemailer.createTestAccount()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vlad5brykov@gmail.com',
      pass: 'Vladislav_5'
    },
  })

let link = "http://localhost:3000/api/auth/password-reset/" + id.toString();

let result = await transporter.sendMail({
  from: '<vlad5brykov@gmail.com>',
  to: email,
  subject: 'Message from Node js',
  text: link
})

console.log(result)

}

module.exports = {
    pass_reset: pass_reset
}