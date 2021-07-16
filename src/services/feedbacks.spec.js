import mockAxios from 'axios';
import FeedbacksService from './feedbacks';

jest.mock('axios');

describe('FeedbacksService', () => {
  afterEach(() => { jest.clearAllMocks(); });

  describe('getAll', () => {
    it('should return all feedbacks', async () => {
      mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: [{ fingerprint: '123' }, { fingerprint: '321' }] }));

      const response = await FeedbacksService(mockAxios).getAll();
      expect(mockAxios.get).toHaveBeenCalledWith('/feedbacks', { params: { offset: 0, limit: 5 } });
      expect(response.data).toHaveLength(2);
    });

    it('should return all feedbacks filtering by type', async () => {
      mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: [{ fingerprint: '123' }, { fingerprint: '321' }] }));

      const response = await FeedbacksService(mockAxios).getAll({ offset: 0, limit: 5, type: 'other' });
      expect(mockAxios.get).toHaveBeenCalledWith('/feedbacks', { params: { offset: 0, limit: 5, type: 'other' } });
      expect(response.data).toHaveLength(2);
    });
  });

  describe('getSummary', () => {
    it('should return all summaries', async () => {
      const filters = {
        all: 10,
        issue: 5,
        idea: 2,
        other: 3,
      };

      mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: filters }));

      const response = await FeedbacksService(mockAxios).getSummary();
      expect(mockAxios.get).toHaveBeenCalledWith('/feedbacks/summary');
      expect(response.data).toEqual(filters);
    });
  });
});
