import User from "@/lib/model/user.model";

interface Account {
	provider: string,
    access_token: string,
    id_token:string
}

interface Profile{
    email: string,
    email_verified?: boolean,
    name?: string,
    givenName?: string; // TODO: check if this is correct type for the field
    picture?:string
}

export async function signInWithOauth({ account, profile }: {account:Account, profile:Profile}) {
	try {
		const user = await User.findOne({ email: profile.email });
		if (user) return true; //sign in

		//new user
		const newUser = new User({
			name: profile.name,
			email: profile.email,
			image: profile.picture,
			provider: account.provider,
		});

		// console.log({newUser});
		await newUser.save();
		return true; //sign up and login
	} catch (error:any) {
        console.log(error.message);
        return false
        
    }
}

export async function getUserByEmail(email:string) {
    const user = await User.findOne({ email })
    if(!user) throw new Error("User doesn't exist");
    return {...user._doc, _id:user._id.toString()}
    
}
