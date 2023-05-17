const mongoose = require("mongoose");
var validator = require("validator");

const usersSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email must be unique"],
            validate: [validator.isEmail, "Please provide a valid email"],
        },
        school: {
            type: String,
            // required: [true, "School/collage is required"],
            
        },
        address: {
            type: String,
            // required: [true, "Address is required"],
          
        },
        img: {
            type: String,
            validate: [validator.isURL, "Please provide an URL"],
        },
        
        role: {
            // required: true,
            type: String,
            enum: {
                values: ["admin", "moderator", "user"],
                message: "{VALUE} is wrong. must be admin/moderator/user",
            },
        },
        
    },
    {
        timestamps: true,
    }
);

const Users = mongoose.model("users", usersSchema);

module.exports = Users;
