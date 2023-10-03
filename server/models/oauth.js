import mongoose from "mongoose";

const oauthSchema = mongoose.Schema({
    _id: sub,
    _type: 'user',
    name: String,
    image: String,

})

export default mongoose.model('Oauth', oauthSchema);