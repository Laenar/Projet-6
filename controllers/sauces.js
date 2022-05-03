const Sauce = require('../models/sauces');

let pathImg = process.env.PATH_IMG || "/images/";

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(404).json({ error }));
};

exports.updateOneSauce = (req, res, next) => {   
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}`+pathImg+`${req.file.filename}`
    } : {...req.body }

    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
        .then(res.status(200).json({ message: "la sauce à été modifiée !" }))
        .catch((error) => res.status(400).json({ error }))
};
exports.deleteOneSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'La sauce à été supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};
exports.addOneSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}`+pathImg+`${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.likeOneSauce = (req, res, next) => {
    const likeValue = req.body.like;
    const userId = req.body.userId;
    const sauceId = req.params.id;

    console.log("###> likeOneSauce requête entrante\n###> likeValue : "+likeValue+"\t userId : "+userId+"\t sauceId : " + sauceId);
    switch (likeValue) {
        case -1:
            Sauce.updateOne({ _id: sauceId }, { $inc: { dislikes: 1 }, $push: { usersDisliked: userId } })
                .then(() => res.status(200).json({ message: "dislike ajouté à la sauce" }))
                .catch((error) => res.status(400).json({ error }));
            break;
        case 0:
            Sauce.findOne({ _id: sauceId })
                .then(sauce => {
                    if (sauce.usersLiked == userId) {
                        Sauce.updateOne({ _id: sauceId }, { $inc: { likes: -1 }, $pull: { usersLiked: userId } })
                            .then(() => res.status(200).json({ message: "Vous avez enlever votre like !" }))
                            .catch(error => res.status(400).json({ error }));
                    } else if (sauce.usersDisliked == userId) {
                        Sauce.updateOne({ _id: sauceId }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } })
                            .then(() => res.status(200).json({ message: "Vous avez enlever votre dislike !" }))
                            .catch(error => res.status(400).json({ error }));
                    }
                })
                .catch(error => res.status(400).json({ error }));
            break;
        case 1:
            Sauce.updateOne({ _id: sauceId }, { $inc: { likes: 1 }, $push: { usersLiked: userId } })
                .then(() => res.status(200).json({ message: "Like ajouté à la sauce" }))
                .catch((error) => res.status(400).json({ error }));
            break;

        default:
            res.status(400).json({ error });
            break;
    }
};