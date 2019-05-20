const nodemailer = require("nodemailer");

module.exports.send = async function (req, res, next) {

  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'pyramidesparaschool@gmail.com', // generated ethereal user
      pass: 'Azerty123@' // generated ethereal password
    }
  });

  let mailOption = {
    from: '"Pyramides Paraschool" <pyramidesparaschool@gmail.com>', // sender address
    to: req.body.emails, // list of receivers
    subject: req.body.subject, // Subject line
    text: "", // plain text body
    html: req.body.content // html body
  };
  
  let info = await transporter.sendMail(mailOption, (err,info) => {
	  if (err) {
            res.json({status:false});
        }
        else {
            res.json({status:true});
        }
	  
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}