import User from "../model/userModel.js";

export const create = async(req, res)=>{
    try {

        const userData = new User(req.body);

        if(!userData){
            return res.status(404).json({msg: "User data not found"});
        }

        await userData.save();
        res.status(200).json({msg: "довталаб бомуваффақият сохта шудааст"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const getAll = async(req, res) =>{
    try {

        const userData = await User.find();
        if(!userData){
            return res.status(404).json({msg:"User data not found"});
        }
        res.status(200).json(userData);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const getOne = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json(userExist);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}




export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(401).json({ msg: "Пользователь не найден" });
        }
        
        // Обновляем данные массива achievements
        const achievementsUpdate = req.body.achievements;
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: { achievements: achievementsUpdate }
        }, { new: true });

        res.status(200).json({ msg: "Пользователь успешно обновлен", updatedUser });
        console.log("Updated user:", updatedUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}






export const deleteUser = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User not exist"});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({msg: "довталаб бомуваффақият нест карда шуд"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}