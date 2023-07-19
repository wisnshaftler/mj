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
    imageWebhook: process.env.imaginewebhook
}

export default siteSettings ;