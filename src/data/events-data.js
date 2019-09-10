// import {getRandomFlag, getRandomElement, getRandomNumber, shuffle, capitalizeFirstLetter} from '../utils/utils.js';
// import getRandomOptimalDestination from '../utils/random-optimal-destination.js';
// import getRandomEventTime from '../utils/random-event-time.js';


// const eventsData = {
//   types: {
//     transfer: new Set([`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`]),
//     activity: new Set([`Check-in`, `Sightseeing`, `Restaurant`])
//   },
//   destination: {
//     cities: new Set([`Amsterdam`, `Geneva`, `Chamonix`, `France`]),
//     sights: new Set([`Museum`, `Fountain`, `Palace`, `Park`]),
//     eatingPoints: new Set([`Cafe`, `Hotel`, `Motel`]),
//     checkinPoints: new Set([`Hotel`, `Motel`])
//   },
//   sentences: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit`, `Cras aliquet varius magna, non porta ligula feugiat eget`,
//     `Fusce tristique felis at fermentum pharetra`, `Aliquam id orci ut lectus varius viverra`,
//     `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`,
//     `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui`, `Sed sed nisi sed augue convallis suscipit in sed felis`,
//     `Aliquam erat volutpat`, `Nunc fermentum tortor ac porta dapibus`, `In rutrum ac purus sit amet tempus`],

//   offerDescriptions: [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`],

//   photosDefaultURL: `http://picsum.photos/300/150?r=`
// };

// //  Сформировать доп. данные типа. {наименование типа, иконка типа, отображаемый заголовок}
// const generateTypeData = (type, data) => ({
//   name: type,
//   icon: type.toLowerCase(),
//   title: data.types.transfer.has(type) ? `${capitalizeFirstLetter(type)} to` : `${capitalizeFirstLetter(type)} in`
// });

// //  Сформировать предложение. {описание, цена, активность}
// const getOfferData = (offerDescription, config) => ({
//   description: offerDescription,
//   price: getRandomNumber(config.offer.price.min, config.offer.price.max),
//   isActive: getRandomFlag()
// });

// //  Сгенерировать случайные данные пункта назначения. Данные пункт назначения содержат:
// //  {описание, цену, предложения, фотографии}
// const getRandomDestinationData = (data, config) => ({
//   description: shuffle(data.sentences)
//   .slice(0, getRandomNumber(config.sentences.minAmount, config.sentences.maxAmount))
//   .join(`. `),
//   price: getRandomNumber(config.price.min, config.price.max),
//   offers: shuffle(data.offerDescriptions)
//   .slice(0, getRandomNumber(config.offer.minAmount, config.offer.maxAmount))
//   .map((offerDescription) => getOfferData(offerDescription, config)),
//   photos: new Array(getRandomNumber(config.photos.minAmount, config.photos.maxAmount))
//   .fill(``)
//   .map(() => data.photosDefaultURL + Math.random())
// });

// //  Сгенерировать случайные мок-данные для одной точки
// const getEventData = (data, config, id) => {
//   const randomType = getRandomElement(new Set([...data.types.transfer, ...data.types.activity]));
//   const optimalDestination = getRandomOptimalDestination(randomType, data);
//   const destinationData = getRandomDestinationData(data, config);

//   return {
//     id,
//     type: generateTypeData(randomType, data),
//     destination: optimalDestination,
//     description: destinationData.description,
//     time: getRandomEventTime(config.periodOfTime.past, config.periodOfTime.future),
//     price: destinationData.price,
//     offers: destinationData.offers,
//     photos: destinationData.photos,
//     isFavorite: getRandomFlag(),
//   };
// };


// export {getEventData, getRandomDestinationData, generateTypeData, eventsData};
