const nodemailer = require("nodemailer")


exports.getIndexPage =(req,res)=>{
    console.log(req.session.userID)
    res.status(200).render('index',{page_name: "index"});
}


exports.getAboutPage = (req,res)=>{
    res.status(200).render('about',{page_name: "about"});
}

exports.getCoursePage = (req,res)=>{
    res.status(200).render('courses',{page_name: "courses"});
}

exports.getRegisterPage = (req,res)=>{
    res.status(200).render('register',{page_name: "register"});
}
exports.getLoginPage = (req,res)=>{
    res.status(200).render('login',{page_name: "login"});
}

exports.getContactPage = (req,res)=>{
    res.status(200).render('contact',{page_name: "contact"});
}
exports.sendEmail = async (req,res)=>{
    const outputMessage = `
    <h1>Message Details</h1>
     <ul>
        <li>Name:${req.body.name} </li>
        <li>Email:${req.body.email} </li>
        <li>Message:${req.body.message} </li>
     </ul>   `

     const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
          user: "emrekibar993@gmail.com",
          pass: "tjdx xdph oijo zgdr",
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
     
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"SmartContactEdu" <emrekibar993@gmail.com>', // sender address
          to: "emrekibar@yandex.com", // list of receivers
          subject: "Smart Edu Contact Form", // Subject line
          text: "Cantact Forum", // plain text body
          html: outputMessage, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        res.status(200).redirect('contact')
}