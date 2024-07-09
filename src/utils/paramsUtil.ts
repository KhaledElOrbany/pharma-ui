function generateUrlParams(filters: any[]) {
  const params = new URLSearchParams();
  filters.forEach(({ id, value }) => {
    params.append(id, value);
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
