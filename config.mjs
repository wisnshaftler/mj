import * as dotenv from "dotenv";
dotenv.config()

const siteSettings = {
    tnlTokens : process.env.tnlTokens,
    secret: process.env.secret,
    dbuser: process.env.dbuser,
    dbhost: process.env.dbhost,
    dbpassword: process.env.dbpassword,
    dbname: process.env.dbname
}

export default siteSettings ;