module.exports = (AsignacionPetstypePetsitter) => {
  AsignacionPetstypePetsitter.viewRelationsPetstypePetsittersById = async (req, res) => {
      let response = {}
      try {
        const { id } = req.query
        if(!id) { throw new Error('No se encontro PetSitter') }
        console.log(id);
        const data = await AsignacionPetstypePetsitter.find({
          where: { petsitter_id : id },
          include:{
            relation : 'PetsType',
          }
        })
        console.log(data);
        response.data = data
        res.status(200).send(response.data)
    } catch (err) {
      console.log(err)
      res.status(400).send(err.message)
    }
  }
  AsignacionPetstypePetsitter.deleteRelationsPetstypePetsitters = async (req, res) => {
    try {
      const { id } = req.query
      const data = await AsignacionPetstypePetsitter.find()
      if ( !data ) throw new Error()
      AsignacionPetstypePetsitter.deleteAll({ id })
      console.log(data);
      res.status(200).send('Se elimino correctamente la relacion')
    } catch (err) {
      console.log(err)
      res.status(400).send(err.message)
    }
  }
  AsignacionPetstypePetsitter.createRelationsPetstypePetsitters = async(req, res) =>{
    let response;
    try{
        const { petsitter_id, petstype_id } = req.body;
        console.log( req.body );
        const asignacion = await AsignacionPetstypePetsitter.create({
          petsitter_id: petsitter_id,
          petstype_id:petstype_id
        })
        res.status(200).send('Se creo la relacion rey')
    }catch( err ){
        console.log( err )
        res.status(400).send( err.message )
    }
  }
  AsignacionPetstypePetsitter.remoteMethod('viewRelationsPetstypePetsittersById', {
    description: 'Metodo test para ver las relaciones por Id del PetSitter',
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
  AsignacionPetstypePetsitter.remoteMethod('deleteRelationsPetstypePetsitters', {
    description: 'Metodo test para ver los usuarios',
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
  AsignacionPetstypePetsitter.remoteMethod('createRelationsPetstypePetsitters', {
    description: 'Metodo test para ver los usuarios',
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
}
