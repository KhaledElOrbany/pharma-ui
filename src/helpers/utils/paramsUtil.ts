function generateUrlParams(parameters: { key: string; value: any }[]) {
  const params = new URLSearchParams();
  parameters.forEach(({ key, value }) => {
    params.append(key, value);
  });
  return params.toString();
}

const handleOnFilter = (newFilters: any, setFiltersList: any) => {
  if (newFilters.length === 0) {
    setFiltersList([]);
  } else {
    setFiltersList((prevFilters: any) => {
      const updatedFilters = [...prevFilters];

      newFilters.forEach((newFilter: any) => {
        const existingFilterIndex = updatedFilters.findIndex(
          (filter) => filter.id === newFilter.id
        );

        if (existingFilterIndex !== -1) {
          updatedFilters[existingFilterIndex] = newFilter;
        } else {
          updatedFilters.push(newFilter);
        }
      });

      return updatedFilters;
    });
  }
};

export { handleOnFilter, generateUrlParams };
