import * as dotenv from "dotenv";
dotenv.config()

const siteSettings = {
    tnlTokens : process.env.tnlTokens,
    secret: process.env.secret,
    dbuser: process.env.dbuser,
    dbhost: process.env.dbhost,
    dbpassword: process.env.dbpassword,
    dbname: process.env.dbname,
    tnlImagine: "https://api.thenextleg.io/v2/imagine",
    tnlStatus: "'https://api.thenextleg.io/v2/message/",
    tnlNaugtyTest: "https://api.thenextleg.io/v2/is-this-naughty",
    imageWebhook: "https://mj-with-shopify.onrender.com/webhooks/image_callback"
}

export default siteSettings ;