/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import {  RequestHandler } from "express";

const notFound:RequestHandler =(req,res,next)=>{

  return res.status(httpStatus.NOT_FOUND).json({
    success:false,
    message:'Api not Found !!',
    error:'',
    
  })
}
export default notFound;