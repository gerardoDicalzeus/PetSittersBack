module.exports = (PetSitter) => {
  PetSitter.createPetSitter = async(req, res) =>{
    let response;
    try{
        const { city_id, name, lastname, email, cellphone, photoURL, edad } = req.body;
        console.log(name);
        const petSitter = await PetSitter.create({
            city_id: city_id,
            name: name,
            lastname: lastname,
            email: email,
            cellphone: cellphone,
            photoURL: photoURL,
            edad: edad
        })
        res.status(200).send('Se creo el Petsitter pa')
    }catch(err){
        console.log(err)
        res.status(400).send(err.message)
    }
  }
  PetSitter.viewPetSitters = async (req, res) => {
      let response;
      try {
        const data = await PetSitter.find()
        console.log(data);
        res.send(data)
      } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
      }
    }
    PetSitter.updatePetsitters = async (req, res) => {
      let response = {};
      try {
        const { id } = req.query
        const { city_id, name, lastname, email, cellphone, photoURL, edad } = await req.body
        const petSitter = await PetSitter.updateAll({ id: id }, {
            city_id: city_id,
            name: name,
            lastname: lastname,
            email: email,
            cellphone: cellphone,
            photoURL: photoURL,
            edad: edad
        })
        response.data = petSitter
        console.log(response.data);
        res.status(200).send({
          message: 'Se cambio correctamente el petsitter',
          data: {
            city_id: city_id,
            name: name,
            lastname: lastname,
            email: email,
            cellphone: cellphone,
            photoURL: photoURL,
            edad: edad
          }
        })
      } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
      }
    }
    PetSitter.deletePetSitter = async (req, res) => {
      let response = {};
      try {
        const { id } = req.query
        const data = await PetSitter.find()
        if (!data) throw new Error()
        PetSitter.deleteAll({ id })
        console.log(data);
        res.status(200).send('Se elimino correctamente el petsitter')
      } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
      }
    }
    PetSitter.viewPetSitterByState = async (req,res) => {
      let response = {}
      try {
        const { id } = req.query
        const data = await PetSitter.find({
          include:{
            relation:'City',
            scope: {
              include: {
                relation: 'State',
                scope:{
                  where: { id }
                }
              }
            }
          }
        })
        console.log(data);
        response.data = data
        res.status(200).send(response.data)
      } catch(err) {
        res.status(400).send(err.message)
      }
    }
    PetSitter.remoteMethod('createPetSitter', {
      description: 'Metodo test para crear petsitters',
      http: {
        path: '/test',
        verb: 'POST'
      },
      accepts: [
        { arg: 'req', type: 'object', http: ctx => { return ctx.req } },
        { arg: 'res', type: 'object', http: ctx => { return ctx.res } }
      ],
      returns: {
        arg: 'response',
        type: 'object',
        root: true
      }
    })
    PetSitter.remoteMethod('viewPetSitters', {
      description: 'Metodo test para ver los petsitters',
      http: {
        path: '/test',
        verb: 'GET'
      },
      accepts: [
        { arg: 'req', type: 'object', http: ctx => { return ctx.req } },
        { arg: 'res', type: 'object', http: ctx => { return ctx.res } }
      ],
      returns: {
        arg: 'response',
        type: 'object',
        root: true
      }
    })
    PetSitter.remoteMethod('updatePetsitters', {
      description: 'Metodo test para ver los petsitters',
      http: {
        path: '/test',
        verb: 'PUT'
      },
      accepts: [
        { arg: 'req', type: 'object', http: ctx => { return ctx.req } },
        { arg: 'res', type: 'object', http: ctx => { return ctx.res } }
      ],
      returns: {
        arg: 'response',
        type: 'object',
        root: true
      }
    })
    PetSitter.remoteMethod('deletePetSitter', {
      description: 'Metodo test para eliminiar petsitters',
      http: {
        path: '/test',
        verb: 'DELETE'
      },
      accepts: [
        { arg: 'req', type: 'object', http: ctx => { return ctx.req } },
        { arg: 'res', type: 'object', http: ctx => { return ctx.res } }
      ],
      returns: {
        arg: 'response',
        type: 'object',
        root: true
      }
    })
    PetSitter.remoteMethod('viewPetSitterByState', {
      description: 'Metodo test para ver petsitters bystate',
      http: {
        path: '/teststate',
        verb: 'GET'
      },
      accepts: [
        { arg: 'req', type: 'object', http: ctx => { return ctx.req } },
        { arg: 'res', type: 'object', http: ctx => { return ctx.res } }
      ],
      returns: {
        arg: 'response',
        type: 'object',
        root: true
      }
    })
}

