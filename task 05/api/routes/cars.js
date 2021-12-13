module.exports = app => {
    const controller = app.controllers.cars;
  
    app.route('/api/v1/veiculos')
    .get(controller.listAllCars)
    .post(controller.saveCar);

    app.route('/api/v1/veiculos/find')
    .get(controller.filteredCars);

    app.route('/api/v1/veiculos/:carId')
    .delete(controller.removeCar)
    .put(controller.updateCar)
    .patch(controller.updateCarPart);
}