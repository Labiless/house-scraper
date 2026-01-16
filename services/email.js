import nodemailer from 'nodemailer';

const emailConfig = {
    adress: process.env.GMAIL,
    password: process.env.GMAIL_PASSWORD,
    mailingList: ['alessandromiele94@gmail.com'],
}

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: emailConfig.adress,
        pass: emailConfig.password
    }
});

const mailOptions = {
    from: emailConfig.adress,
    to: emailConfig.mailingList,
    subject: 'Nuove case!',
};

const sendMail = async (mailBody) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail({ ...mailOptions, html: mailBody }, function (error, info) {
            if (error) {
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
}

export default sendMail;