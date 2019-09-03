const menuData = {
  titles: [`Table`, `Stats`]
};
const getMenuItem = (title, index) => {
  return {
    title,
    isActive: (index === 0) ? true : false
  };
};
const tripMenu = menuData.titles.map((title, index) => getMenuItem(title, index));


export {tripMenu};
