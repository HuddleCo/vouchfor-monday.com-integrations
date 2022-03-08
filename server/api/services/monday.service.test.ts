import { expect } from 'chai';
import mondayService from './monday.service';

describe('Monday', () => {
  context('when the item is found', () => {
    it('returns the item id', () =>
      expect(mondayService('external-id')).to.equal('item-id'));
  });
});
