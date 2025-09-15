const userModel = require('../models/userSchema');
const Freelancer = require('../models/freelanceSchema'); // 🔹 ajouter l'import
const jwt = require('jsonwebtoken');

const maxTime = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'net secret pfe', { expiresIn: maxTime });
};

module.exports.addUserClient = async (req, res) => {
  try {
    const { username, email, password, phone,address, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Tous les champs obligatoires ne sont pas fournis." });
    }

    const allowedRoles = ["client", "freelancer"];
    const userRole = allowedRoles.includes(role) ? role : "client";

    // 1️⃣ Créer l'utilisateur
    const user = await userModel.create({
      username,
      email,
      password,
      role: userRole,
      phone,
    address
     

    });

    // 2️⃣ Si c'est un freelancer → créer aussi un document Freelance
    if (userRole === "freelancer") {
      await Freelancer.create({
        userId: user._id,
        info: {
          nom: "",
          prenom: "",
          email: user.email,
          password: user.password,
          photo: "",
          adresse: {}
        }
      });
    }

    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      age: user.age,
    };

    res.status(201).json({ user: userData });

  } catch (error) {
    console.error("Erreur création utilisateur:", error);
    if (error.code === 11000) {
      const duplicatedField = Object.keys(error.keyValue)[0];
      return res.status(409).json({ message: `Le ${duplicatedField} est déjà utilisé.` });
    }
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur." });
  }
};

module.exports.addUserClientWithImg = async (req, res) => {
  try {
    const { username, email, role } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Aucune image envoyée !" });
    }

    // Mettre à jour l'utilisateur ou en créer un nouveau
    let user = await userModel.findOne({ email }); // si tu veux update selon email
    if (!user) {
      user = new userModel({
        username,
        email,
        role: role || "client",
        user_image: "/files/" + req.file.filename // chemin relatif à public
      });
    } else {
      user.user_image = "/files/" + req.file.filename;
    }

    await user.save();

    res.status(200).json({ message: "Image ajoutée avec succès ✅", user });
  } catch (error) {
    console.error("Erreur addUserClientWithImg:", error);
    res.status(500).json({ message: error.message });
  }
};


    module.exports.addUserAdmin = async (req,res) => {
    try{
        const {username , email , password } = req.body;
        const roleAdmin = 'admin';
        const user =await userModel.create({
            username,email,password,role : roleAdmin
        });
       
         res.status(200).json({user});
    }catch (error){
        res.status(500).json({message: error.message});
    }
    }



    module.exports.getAllUsers= async (req,res) => {
    try {
        const userListe = await userModel.find()
        res.status(200).json({userListe});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



    module.exports.getUserById= async (req,res) => {
    try {
        //const id = req.params.id
        const{id} = req.params
        //console.log(req.params.id)
        const user = await userModel.findById(id)
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
    module.exports.deleteUserById= async (req,res) => {
    try {
      
        const{id} = req.params

        const checkIfUserExists = await userModel.findById(id);
        if (!checkIfUserExists) {
            throw new Error("User not found");
        }


        await userModel.findByIdAndDelete(id)
        res.status(200).json("delete");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports.updateuserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, username, phone, address, bio } = req.body;

    // ⚡ On update tous les champs que tu veux
    await userModel.findByIdAndUpdate(
      id,
      { $set: { email, username, phone, address, bio } },
      { new: true } // pour retourner le user mis à jour directement
    );

    const updated = await userModel.findById(id);
    res.status(200).json({ updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.searchUserByUsername = async (req, res) => {
    try {

        const { username } = req.query
        if(!username){
            throw new Error("Veuillez fournir un nom pour la recherche.");
        }

        const userListe = await userModel.find({
            username: {$regex: username , $options: "i"}
        })

        if (!userListe) {
            throw new Error("User not found");
          }
          const count = userListe.length
        res.status(200).json({userListe,count})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    }
        module.exports.getAllUsersSortByAge= async (req,res) => {
        try {
            const userListe = await userModel.find().sort({age : 1}).limit(2)
            //const userListe = await userModel.find().sort({age : -1}).limit(2)
    
            res.status(200).json({userListe});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
        module.exports.getAllUsersAge= async (req,res) => {
        try {
            const {age} = req.params
            const userListe = await userModel.find({ age : age})
    
            res.status(200).json({userListe});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
        module.exports.getAllUsersAgeBetMaxAgeMinAge= async (req,res) => {
        try {
            const MaxAge = req.query.MaxAge
            const MinAge = req.query.MinAge
            const userListe = await userModel.find({age : { $gt : MinAge , $lt : MaxAge}}).sort({age : 1})
    
            res.status(200).json({userListe});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
       module.exports.getAllClient= async (req,res) => {
        try {

            const userListe = await userModel.find({role : "client"})
    
            res.status(200).json({userListe});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
        module.exports.getAllAdmin= async (req,res) => {
        try {

            const userListe = await userModel.find({role : "admin"})
    
            res.status(200).json({userListe});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
    module.exports.login= async (req,res) => {
    try {
        const { email , password } = req.body;
        const user = await userModel.login(email, password)
        const token = createToken(user._id)
        res.cookie("jwt_token_9antra", token, {httpOnly:false,maxAge:maxTime * 1000})
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
module.exports.logout= async (req,res) => {
    try {
  
        res.cookie("jwt_token_9antra", "", {httpOnly:false,maxAge:1})
        res.status(200).json("logged")
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
