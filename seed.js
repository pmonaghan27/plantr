const {db, Vegetable, Plot, Gardener} = require('./model');
// const {} = db;
// const {} = db;
// const {} = db;

db.sync({force: true})
  .then(() => {
    console.log('db synced')
  })
  .then(() => {
    return Vegetable.create({name: 'lettuce', color: 'green', planted_on: new Date()})
  })
  .then((veggie) => {
    return Gardener.create({name: 'bob', age: 45, favoriteVegetableId: veggie.id})
  })
  .then((owner) => {
    return Plot.create({size: 100, shaded: true, gardenerId: owner.id})
  })
  .catch((error) => {
    console.log('db is not synced: ', error)
  })
  .finally(() => {
    db.close()
  })
