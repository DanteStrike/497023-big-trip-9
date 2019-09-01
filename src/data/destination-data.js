import {shuffle, getRandomNumber} from '../utils/utils.js';
import {destinationConfig} from '../configs.js';

//  Дано согласно заданию
const destinations = new Set([`Amsterdam`, `Geneva`, `Chamonix`, `France`, `Museum`, `Fountain`, `Palace`, `Park`, `Cafe`, `Hotel`, `Motel`]);
const sentences = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit`, `Cras aliquet varius magna, non porta ligula feugiat eget`,
  `Fusce tristique felis at fermentum pharetra`, `Aliquam id orci ut lectus varius viverra`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui`, `Sed sed nisi sed augue convallis suscipit in sed felis`,
  `Aliquam erat volutpat`, `Nunc fermentum tortor ac porta dapibus`, `In rutrum ac purus sit amet tempus`];
const offerDescriptions = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`];
const photosDefaultURL = `http://picsum.photos/300/150?r=`;

//  Сгенерировать 1-но предложение
const getOffer = (offerDescription, config) => ({
  description: offerDescription,
  price: getRandomNumber(config.offer.price.min, config.offer.price.max),
  isActive: false
});

//  Сгенерировать мок-данные для каждого пункта назначения.
//  Каждому пункту назначения соответствует свое описание, цена, предложения, фотографии
const destinationsData = Array.from(destinations).reduce((accum, destination) => {
  accum[destination] = {
    description: shuffle(sentences)
        .slice(0, getRandomNumber(destinationConfig.sentences.minAmount, destinationConfig.sentences.maxAmount))
        .join(`. `),
    price: getRandomNumber(destinationConfig.price.min, destinationConfig.price.max),
    offers: shuffle(offerDescriptions)
        .slice(0, getRandomNumber(destinationConfig.offer.minAmount, destinationConfig.offer.maxAmount))
        .map((offerDescription) => getOffer(offerDescription, destinationConfig)),
    photos: new Array(getRandomNumber(destinationConfig.photos.minAmount, destinationConfig.photos.maxAmount))
        .fill(``)
        .map(() => photosDefaultURL + Math.random()),
  };

  return accum;
}, {});


export {destinationsData};
