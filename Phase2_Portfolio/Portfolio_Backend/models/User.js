import mongoose from "mongoose";

const userSchema = new mongoose.Schema (
{
    resetToken: String,
    resetTokenExpiry: Date, 

  username: { 
    type: String, 
    required: true 
  },

  email: { 
    type: String, 
    required: true, 
    unique: true 
    },

  passwordHash: { 
    type: String 
    },
    
  role: { 
    type: String, 
    enum: ["User", "Admin", "Editor", "Viewer"], 
    default: "User" 
    },
  
   provider: { 
    type: String, 
    default: "local" 
    },

    
});

export default mongoose.model("User", userSchema);