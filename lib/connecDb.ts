import mongoose from "mongoose";

export const ConnectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI || "");
		console.log(`MongoDB Connected: ${connect.connection.host}`);
	} catch (error: any) {
		throw new Error("Mongoose Error");
		console.log(error.message);
	}
};
