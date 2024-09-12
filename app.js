const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine','ejs')

// Serve the index.html file
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "your_email@gmail.com",
        pass: "your_password",
      },
    });

    let info = await transporter.sendMail({
      from: '"Your Name" <your_email@gmail.com>',
      to: email,
      subject: subject,
      html: `<p>${message}</p>`,
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
