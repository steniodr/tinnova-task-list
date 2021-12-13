const uuid = require('uuid');
const moment = require('moment');

// JSON SCHEMA VALIDATION
const Ajv = require("ajv");
const ajv = new Ajv({allError: true});

const schema = {
    type: "object",
    properties: {
        veiculo: {type: "string"},
        marca: {
            type: "string",
            pattern: "(?=(\\bChevrolet\\b|\\bVolkswagen\\b|\\bFord\\b|\\bFiat\\b|\\bRenault\\b|\\bToyota\\b|\\bHyundai\b|\\bJeep\b|\\bHonda\b|\\bNissan\b|\\bCitroën\b))"
        },
        ano: {
            type: "integer",
        },
        descricao: {
            type: "string"
        },
        vendido: {
            type: "boolean"
        },
    },
    required: ["veiculo", "marca", "ano", "descricao", "vendido"]
}

const validate = ajv.compile(schema)

module.exports = app => {
    const carsDB = app.data.cars;
    const controller = {};
      
    const {
      allCars: allCarsMock,
    } = carsDB;
    
    controller.listAllCars = (req, res) => {
      const unSolds = allCarsMock.data.filter(car => car.vendido == false);
      const filterDecades = {};
      const totalBrands = {};
      const carsThisWeek = [];
      const sevenDaysBefore = moment().subtract(7, 'days');
      const today = moment();
      
      allCarsMock.data.forEach(car => {
        let decade = car.ano.toString().substring(0,3) + '0';
        let brand = car.marca.trim();
        let registerDate = moment(car.created);

        if(filterDecades.hasOwnProperty(decade)){
          filterDecades[decade] += 1;
        } else {
          filterDecades[decade] = 1;
        }

        if(totalBrands.hasOwnProperty(brand)){
          totalBrands[brand] += 1;
        } else {
          totalBrands[brand] = 1;
        }

        if(registerDate.isBetween(sevenDaysBefore, today, 'day', '[]')){
          carsThisWeek.push(car);
        }

      });

      res.status(200).json({
        carsDB,
        car_registered_this_week: carsThisWeek,
        more_informations: {
          decades: filterDecades,
          unsolds: unSolds.length,
          brands: totalBrands
        }
      });
    };

    controller.saveCar = (req, res) => {
      const rawCar = {
        "id": uuid.v4(),
        "parentId": uuid.v4(),
        "veiculo": req.body.veiculo.trim(),
        "marca": req.body.marca.trim(),
        "ano": req.body.ano,
        "descricao": req.body.descricao.trim(),
        "vendido": req.body.vendido,
        "created": new Date(),
        "updated": new Date()
      }

      if (validate(rawCar)){
        allCarsMock.data.push(rawCar);
        
        res.status(201).json({
          message: 'Veiculo criado com sucesso!',
          success: true,
          allCars: allCarsMock
        });
      }
      else{
        res.status(401).send({
          message: 'Erro ao criar novo registro!',
          success: false,
          errorMessage: { message: ajv.errorsText(validate.errors)}})
      }

    };

    controller.removeCar = (req, res) => {
      const {
        carId,
      } = req.params;

      const foundCarIndex = allCarsMock.data.findIndex(car => car.id == carId);

      if (foundCarIndex == -1) {
        res.status(404).json({
          message: 'Veiculo não encontrado na base da dados',
          success: false,
          allCars: allCarsMock
        });
      } else{
        allCarsMock.data.splice(foundCarIndex, 1);
        res.status(200).json({
          message: 'Veiculo encontrado e deletado com sucesso!',
          success: true,
          allCars: allCarsMock
        })
      }
    };

    controller.updateCar = (req, res) => {
      const {
        carId,
      } = req.params;

      const foundCarIndex = allCarsMock.data.findIndex(car => car.id == carId);

      if (foundCarIndex == -1) {
        res.status(404).json({
          message: 'Veiculo não encontrado na base da dados',
          success: false,
          allCars: allCarsMock
        });
      } else{
        const created = allCarsMock.data[foundCarIndex].created;

        const newCar = {
          "id": uuid.v4(),
          "parentId": uuid.v4(),
          "veiculo": req.body.veiculo,
          "marca": req.body.marca,
          "ano": req.body.ano,
          "descricao": req.body.descricao,
          "vendido": req.body.vendido,
          "created": created,
          "updated": new Date()
        }
  
        if (validate(newCar)){
          allCarsMock.data.splice(foundCarIndex, 1, newCar);
          
          res.status(200).json({
            message: 'Veiculo encontrado e atualizado com sucesso!',
            success: true,
            allCars: allCarsMock
          })
        }
        else{
          res.status(401).json({ 
            message: 'Veiculo encontrado, porem não atualizado.',
            success: false,
            errorMessage: { message: ajv.errorsText(validate.errors)},
            allCars: allCarsMock
          })
        }
      }
    };

    controller.updateCarPart = (req, res) => {
      const {
        carId,
      } = req.params;

      const foundCarIndex = allCarsMock.data.findIndex(car => car.id == carId);

      if (foundCarIndex == -1) {
        res.status(404).json({
          message: 'Veiculo não encontrado na base da dados',
          success: false,
          allCars: allCarsMock
        });
      } else {
        const actualCar = allCarsMock.data[foundCarIndex];

        let error = {
          message: '',
          errorFound: false
        };

        for(let b in req.body) {
          if (b == 'marca'){
            let validate = req.body[b].match('(?=(\\bChevrolet\\b|\\bVolkswagen\\b|\\bFord\\b|\\bFiat\\b|\\bRenault\\b|\\bToyota\\b|\\bHyundai\b|\\bJeep\b|\\bHonda\b|\\bNissan\b|\\bCitroën\b))')
            if (validate == null) {
              error.message = 'data/marca must match pattern \"(?=(\\bChevrolet\\b|\\bVolkswagen\\b|\\bFord\\b|\\bFiat\\b|\\bRenault\\b|\\bToyota\\b|\\bHyundai\b|\\bJeep\b|\\bHonda\b|\\bNissan\b|\\bCitroën\b))\"';
              error.errorFound = true;
            } else {
              actualCar[b] = req.body[b];
            }
          } else if (actualCar[b] != req.body[b] && !error.errorFound)
            actualCar[b] = req.body[b];
        }

        if (!error.errorFound){
          res.status(200).json({
            message: 'Veiculo encontrado e atualizado com sucesso!',
            success: true,
            allCars: allCarsMock
          })
        } else {
          res.status(401).json({ 
            message: 'Veiculo encontrado, porem não atualizado.',
            success: false,
            errorMessage: { message: error.message},
            allCars: allCarsMock
          })
        }
      }
    };

    controller.filteredCars = (req, res) => {
      const filters = req.query;
      const filteredCars = allCarsMock.data.filter(car => {
        let isValid = true;
        for (key in filters) {
          isValid = isValid && car[key] == filters[key];
        }
        return isValid;
      })
      if (filteredCars.length){
        res.status(200).json({
          message: 'Resultado encontrado com sucesso!',
          success: true,
          filteredCars: filteredCars
        })
      } else {
        res.status(404).json({
          message: 'Nenhum resultado encontrado com esse filtro.',
          success: false,
          allCars: allCarsMock
        })
      }
      
    }
    return controller;
  }