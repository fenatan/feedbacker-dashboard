const defaultPagination = {
  limit: 5,
  offset: 0
};

export default (httpClient) => ({
  async getAll({ type, limit, offset } = defaultPagination) {
    const query = { limit, offset };

    if (type) {
      query.type = type;
    }

    const response = await httpClient.get('/feedbacks', { params: query });

    return {
      data: response.data
    };
  },
  async getSummary() {
    const response = await httpClient.get('/feedbacks/summary');

    return {
      data: response.data
    };
  }
});
