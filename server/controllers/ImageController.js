import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import userModel from '../models/userModel.js'

//controller function to reomve bhg from image

const removeBgImage = async (req,res) => {
    try {

        const clerkId  = req.clerkId

        const user = await userModel.findOne({ clerkId })

        if(!user){
            return res.json({ succes:false, message:'user not found'})
        }

        if(user.creditBalance === 0){
            return res.json({ succes:false, message:'No credit balance', creditBalance: user.creditBalance})
        }

        const imagePath = req.file.path;

        //reading the image file
        const imageFile = fs.createReadStream(imagePath)

        const formdata = new FormData()
        formdata.append('image_file', imageFile)

        const {data} = await axios.post('https://clipdrop-api.co/remove-background/v1', formdata,{
            headers: {
                'x-api-key': process.env.CLIPDROP_API,

            },
            responseType: 'arraybuffer'
        })

        const base64Image = Buffer.f(data, 'binary').toString('base64')

        const resultImage = `data:${req.file.mimetype};base64Image,${base64Image}`

        await userModel.findByIdAndUpdate(user._id,{creditBalance: user.creditBalance - 1})

        res.json({success: true, resultImage, creditBalance: user.creditBalance-1, message:'background removed'})
        
    } catch (error) {
        console.log(error.message)
        res.json({succes: false, message: error.message})
        
    }
}

export {removeBgImage}