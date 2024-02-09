module.exports = (User) => {
  User.createUser = async (req, res) => {
    let response;
    try {
      const { nombre, apellido, direccion, telefono, email, password } = req.body;
      console.log(nombre);
      const user = await User.create({
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        telefono: telefono,
        email: email,
        password: password
      })
      res.status(200).send('Se creo el usuario correctisimo rey')
    } catch (err) {
      console.log(err)
      res.status(400).send(err.message)
    }
  }
  User.viewUsers = async (req, res) => {
    let response;
    try {
      const data = await User.find()
      console.log(data);
      res.send(data)
    } catch (err) {
      console.log(err)
      res.status(400).send(err.message)
    }
  }
  User.updateUsers = async (req, res) => {
    let response = {};
    try {
      const { id } = req.query
      const { nombre, apellido, direccion, telefono, email, password } = await req.body
      const petSitter = await User.updateAll({ id: id }, {
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        telefono: telefono,
        email: email,
        password: password
      })
      response.data = petSitter
      console.log(response.data);
      res.status(200).send({
        message: 'Se cambio correctamente el petsitter',
        data: {
          nombre: nombre,
          apellido: apellido,
          direccion: direccion,
          telefono: telefono,
          email: email,
          password: password
        }
      })
    } catch (err) {
      console.log(err)
      res.status(400).send(err.message)
    }
  }
  User.deleteUsers = async (req, res) => {
    let response = {};
    try {
      const { id } = req.query
      const data = await User.find()
      if (!data) throw new Error()
      User.deleteAll({ id })
      console.log(data);
      res.status(200).send('Se elimino correctamente el usuario')
    } catch (err) {
      console.log(err)
      res.status(400).send(err.message)
    }
  }
  User.loginUser = async (req, res) => {
    let response = {}
    try {
      // TODO: Validar campos desde cliente
      const { email, password } = req.body
      if (!email || !password) {
        throw new Error("datos faltantes")
      }

      const user = await User.findOne({ where: { email } })

      if (email != user.email || password != user.password) {
        throw new Error("credenciales incorrectas")
      }

      // TODO: Validar usuario en DB con credenciales obtenidas
      // TODO: Enviar los datos del usuario, en caso de ser valido
      res.status(200).json({
        message: "Login exitoso",
        data: user
      })
    } catch (error) {
      res.send({ message: error.message })
    }
  }
  User.remoteMethod('viewUsers', {
    description: 'Metodo test para ver los usuarios',
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
  User.remoteMethod('createUser', {
    description: 'Metodo para crear un nuevo usuario',
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
  User.remoteMethod('updateUsers', {
    description: 'Metodo para editar un usuario',
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
  User.remoteMethod('deleteUsers', {
    description: 'Metodo para editar un usuario',
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
  User.remoteMethod('loginUser', {
    description: 'Metodo de login para el usuario',
    http: {
      path: '/testlogin',
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
