const Schema = require('../models/user.model');

exports.getUsers = async(req, res) => {
    const users = await Schema.find({});

    try{
        res.send(users);
    }catch (error){
        res.status(400).send(error);
    }
}



exports.CreateUser = async(req, res) => {
    try {
        const user = await Schema.create(req.body);
        return res.send(user);
    } catch(err) {
        res.send('Failed !!');
    }

}


exports.findOneUser = async(req, res)=>{
    try{
        const user = await Schema.findById(req.params.id);

         res.send({data: user});
    }catch{
        res.status(404).send("user not found ! ")
    }
}

exports.UpdateUser = async(req, res)=>{
    try{
        const user = await Schema.findById(req.params.id);
        Object.assign(user, req.body)
        user.save()
        res.send({data: user});
    }catch(err){
        res.send(err)
    }
}
exports.delete = async(req, res)=>{
    try{
        const user = await Schema.findById(req.params.id);
        await user.remove()
        res.send({data: true});
    }catch(err){
        res.send(err)
    }
}