function weatherIcon(condition) {
  import(`../logos/${condition}.svg`)
    .then((module) => {
      const icon = document.querySelector('.weatherIcon');
      icon.setAttribute('src', module.default);
    })
    .catch((error) => {
      console.error('Error loading icon:', error);
    });
}

export default weatherIcon;
