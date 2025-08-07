const validator =require("validator");

// req.body 

const validate = (data)=>{
    const mandatoryField = ['firstName',"emailId",'password'];

    const IsAllowed = mandatoryField.every((k)=> Object.keys(data).includes(k));

    if(!IsAllowed) {
        throw new Error("Required fields missing: firstName, emailId, password");
    }

    if(!validator.isEmail(data.emailId)) {
        throw new Error("Invalid email format");
    }

    if(!validator.isStrongPassword(data.password)) {
        throw new Error("Password must contain at least 8 characters including uppercase, lowercase, number and special character");
    }
}

module.exports = validate;