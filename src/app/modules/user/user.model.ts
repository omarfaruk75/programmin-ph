/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt'
import config from '../../config';
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required:true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      maxlength:[20,'Password can not be more than 20 characterts']
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },

    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },

  
);


userSchema.pre('save',async function(next){
  const user=this;
  user.password= await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds))
  next();
})
userSchema.post('save',async function(doc,next){
  doc.password='';
  next();
})


export const User = model<TUser>('User', userSchema);
