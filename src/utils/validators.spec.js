import { validateEmptyAndEmail, validateEmptyAndLength3 } from './validators';

describe('Validators utils ', () => {
  describe('validateEmptyAndLength3', () => {
    it('should give an error with empty payload', () => {
      expect(validateEmptyAndLength3()).toBe('*Este campo é obrigatório');
    });

    it('should give an error with less than 3 character payload', () => {
      expect(validateEmptyAndLength3('12')).toBe('*Este campo precisa de no mínimo 3 caracteres');
    });

    it('should return true when value is valid', () => {
      expect(validateEmptyAndLength3('124')).toBe(true);
    });
  });

  describe('validateEmptyAndEmail', () => {
    it('should give an error with empty payload', () => {
      expect(validateEmptyAndEmail()).toBe('*Este campo é obrigatório');
    });

    it('should give an error when an invalid email is provided', () => {
      expect(validateEmptyAndEmail('fakeemailcom')).toBe('*Email inválido');
    });

    it('should return true when a valid email is provided', () => {
      expect(validateEmptyAndEmail('fake@email.com')).toBe(true);
    });
  });
});
