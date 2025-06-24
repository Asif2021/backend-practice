import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/Cloudinay.js'
import { ApiResponse } from '../utils/ApiResponse.js'


const registerUser = asyncHandler(async (req, res)=>{
    // all data points are extracted from req.body
    const {fullName, email, username, password} = req.body


    // we can use simple if else to check all fields are valid or not!!! but there is another way so we are using new way ([].some)
    //validation to check all data points
if ([fullName, email, username, password].some((field)=> field?.trim()=== "")
) {
    throw new ApiError(400, "All field are required")
}
 
    // check if user is already exist 
const existedUser = await User.findOne({$or:[{username},{email}]})
if (existedUser) {
    // if user exist then give error
throw new ApiError(409, "User with email Or username is already exist")}

    // avatar path find
const avatarLocalPath =  req.files?.avatar[0]?.path;
// const coverImageLocalPath = req.files?.coverImage[0].path;

// cover Image checking
let coverImageLocalPath;
if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path}




// avatar file is must required
if (!avatarLocalPath) { throw new ApiError(400, "Avatar is required")}

// upload avatar and coverImage on cloudinary
const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

// avatar must be uploaded
if (!avatar) { throw new ApiError(400, "Avatar is required")}

// if above whole code is working fine then push the code to db
const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
})

    // remove password and refresh token from received value
const createdUser = await User.findById(user._id).select(
    "-password -refreshToken")
    // if user is not created then give error
if(!createdUser){throw new ApiError(500, "something went wrong while registering User")}
 
    // if everything is fine then give message 
return res.status(201).json(
    new ApiResponse(200, createdUser, "User Registered Successfully")
)

})

export {registerUser}