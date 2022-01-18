const callToApi = () => {
  return fetch('#')
    .then((response) => response.json())
    .then((response) => {
      // Ejemplo
      // const result = {
      //   id: response.id,
      //   name: response.name,
      // };
      return result;
    });
};

export default callToApi;
