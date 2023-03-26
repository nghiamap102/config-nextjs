const config = {
    production: {
        JWT_SECRET: process.env.JWT_SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        JWT_SECRET: process.env.JWT_SECRET || 'condimemay',
        DATABASE: process.env.DATABASE_URL || 'mongodb+srv://next-ecom:Nmap123456@cluster0.3mgeguf.mongodb.net/?retryWrites=true&w=majority'
    }
}


module.exports = config.default