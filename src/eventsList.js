const eventsData = {
  types: {
    transport: new Set([`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`]),
    arrival: new Set([`Check-in`, `Sightseeing`, `Restaurant`])
  },
  destination: {
    cities: new Set([`Amsterdam`, `Geneva`, `Chamonix`, `France`]),
    sights: new Set([`Museum`, `Fountain`, `Palace`, `Park`]),
    eatingPoints: new Set([`Cafe`, `Hotel`, `Motel`]),
    checkinPoints: new Set([`Hotel`, `Motel`])
  },
  descriptions: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit`, `Cras aliquet varius magna, non porta ligula feugiat eget`,
    `Fusce tristique felis at fermentum pharetra`, `Aliquam id orci ut lectus varius viverra`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui`, `Sed sed nisi sed augue convallis suscipit in sed felis`,
    `Aliquam erat volutpat`, `Nunc fermentum tortor ac porta dapibus`, `In rutrum ac purus sit amet tempus`],

  offerDescriptions: [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`]
};
