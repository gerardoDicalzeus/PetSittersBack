module.exports = (Review) => {
  Review.readReviewById = async(req, res) =>{
    let response = {}
      try{
        const { id } = req.query
        console.log(req.query);
        const review = await Review.find({ where: { PettsitterId:id }})
        response.data = review
        console.log(response.data);
        res.send(review)
      }catch(err){
          console.log(err)
          res.status(400).send(err.message)
      }
  }
  Review.addReview = async(req, res) =>{
    let response = {}
      try{
        const { PettsitterId, rating, comments } = req.body
        console.log(req.body);
        const review = await Review.create({ PettsitterId: PettsitterId, rating: rating, comments: comments })
        response.data = review
        console.log(response.data);
        res.send(review)
      }catch(err){
          console.log(err)
          res.status(400).send(err.message)
      }
  }
  Review.remoteMethod('readReviewById', {
      description: 'Metodo test para obtener las reviews por petsitter',
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
    Review.remoteMethod('addReview', {
      description: 'Metodo test para obtener las reviews por petsitter',
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
