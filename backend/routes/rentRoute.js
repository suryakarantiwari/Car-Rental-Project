import express from 'express';
import Cars from '../models/carsModel.js';
import Rent from '../models/rentModel.js';

const rentRouter = express.Router();

rentRouter.post('/rentcar', async (req, res) => {
    try {

        const newRent = new Rent(req.body);
        await newRent.save();

        const car = await Cars.findById({_id: req.body.car});
        car.bookedTimeSlots.push(req.body.bookedTimeSlots);
        await car.save();
        
        res.send('Your Rent is Successfull!')

    } catch(error) {
        return res.status(400).json(error);
    }
});

rentRouter.get('/rentcar', async (req,res) =>{
    const category = await Rent.find();
    res.send(category);
})

rentRouter.get('/rentcar/:userId' , async (req,res) =>{
    const userCars = await Rent.find({user:req.params.userId});
    res.send(userCars);
})

rentRouter.delete('/rentcar/:id', async(req,res)=>{
    const deleted =  await Rent.deleteOne({_id : req.params.id});
    res.send(deleted)
})

export default rentRouter;