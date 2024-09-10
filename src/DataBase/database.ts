import mongoose from "mongoose";

const database = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI || "", {
            dbName:"nextauth",
        })
        const connection = mongoose.connection
        
        connection.on("connected", () => {
            console.log("Database connected");
        })

        connection.on("error", () => {
            console.log("Database disconnected");
            process.exit()
        })
    } catch (error:any) {
        console.log("Internal server failed Database",error);
    }
}

export default database;