class User{
    constructor(id,dob,email,name,otp,otpExpiredTime,password,phone,profileId,profilePic){
        this.id = id;
        this.dob = dob;
        this.email = email;
        this.name = name;
        this.otp = otp;
        this.otpExpiredTime = otpExpiredTime;
        this.password= password;
        this.phone= phone;
        this.profileId = profileId;
        this.profilePic = profilePic;
    }
}


module.exports = User;