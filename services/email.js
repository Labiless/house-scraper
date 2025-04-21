import nodemailer from 'nodemailer';

const emailConfig = {
    adress: 'alessandromiele94@gmail.com',
    password: 'qmycpkrxvtqqojqx', // usa una app password se hai 2FA
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

/**
 * 
 * @param {string} mailBody 
 * @returns {Promise<any>}
 */
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