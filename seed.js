const {db, Vegetable, Plot, Gardener} = require('./model');
const vegetablePlot = db.model('vegetable_plot');

db.sync({force: true})
  .then(() => {
    console.log('db synced')
  })
  .then(() => {
    const vegetable = Vegetable.create({name: 'lettuce', color: 'green', planted_on: new Date()});
    const gardener = vegetable.then((veggie) => {
      return Gardener.create({name: 'bob', age: 45, favoriteVegetableId: veggie.id})
    });
    const plot = gardener.then((owner) => {
      return Plot.create({size: 100, shaded: true, gardenerId: owner.id})
    });
    return plot;
  })
  .catch((error) => {
    console.log('db is not synced: ', error)
  })
  .finally(() => {
    db.close()
  })
