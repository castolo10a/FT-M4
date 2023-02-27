const { Router } = require("express");
const { Character } = require("../db");
const router = Router();

router.post('/', async(req, res) => {
    try {
        const {code, name, age, race, hp, mana, date_added} = req.body;

        if(!code || !name || !age || !race || !hp || !mana){
            return res.status(404).send('Falta enviar datos obligatorios')
        }

        const newCharacter = await Character.create({
            code,
            name,
            age,
            race,
            hp,
            mana,
            date_added
        })

        return res.status(201).json(newCharacter)
    } catch (error) {
        return res.status(404).send('Error en alguno de los datos provistos')
    }
})

router.get('/', async(req, res) => {
    try {
        const {race, age} = req.query;

        const condition = {};
        const where = {};

        if(race) where.race = race;

        if(age) where.age = age;

        condition.where = where;

        const characters = await Character.findAll(condition);

        return res.status(200).json(characters)

    } catch (error) {
        return res.status(404).send('Error en alguno de los datos provistos')
    }
})

router.get('/:code', async(req, res) => {
    try {
        const { code } = req.params;

        const characterByPk = await Character.findByPk(code);

        if(!characterByPk) throw new Error(`El codigo ${code} no corresponde a un personaje existente`);

        return res.status(200).json(characterByPk);
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.put('/:attribute', async(req, res) => {
    try {
        const { attribute } = req.params;
        const { value } = req.query;

        await Character.update({[attribute]: value}, {
            where:{
                [attribute]: null
            }
        })

        return res.status(200).send('Personajes actualizados');
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

module.exports = router;
