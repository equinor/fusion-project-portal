import { moveItemToTopByIndex } from './move-item-by-index';

describe('move item by index', () => {
  it('Should move given index to the beginning of an array', () => {
    const list = moveItemToTopByIndex([1, 2, 3], 2);
    expect(list[0]).toBe(3);
    const list2 = moveItemToTopByIndex([1], 0);
    expect(list2[0]).toBe(1);
  });

  it('Should trow index out of scope if index greater than array length', () => {
    expect(() => {
      moveItemToTopByIndex([1, 2, 3], 3);
    }).toThrow('Index out of scope');
    expect(() => {
      moveItemToTopByIndex([1], 1);
    }).toThrow('Index out of scope');
  });

  it('Should not trow index out of scope if index less than array length', () => {
    expect(() => {
      moveItemToTopByIndex([1, 2, 3], 2);
    }).not.toThrow('Index out of scope');
  });
});
