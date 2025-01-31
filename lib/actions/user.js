import User from "@lib/models/User";
import { connectMongoDB } from "@lib/mongodb/mongoose";


export const createOrUpdateUser = async (id, first_name, last_name, image_url, email_addresses, username) => {
    
    try{
        await connectMongoDB();
        
        const user = User.findOneAndUpdate(
            { clerkId: id },
            {
                $set: {
                    clerkId: id,
                    firstName: first_name,
                    lastName: last_name,
                    profilePhoto: image_url,
                    email: email_addresses[0].email_address,
                    username: username,
                }
            },
            { upsert: true, new: true }
        );

        await user.save();

    }
    catch ( error ){
        console.log(error);
    }

}


export const deleteUser = async (id) => {

    try{
        await connectMongoDB();
        await User.findOneAndDelete({ clerkId: id });
    }
    catch( error ){
        console.log(error);
    }
}