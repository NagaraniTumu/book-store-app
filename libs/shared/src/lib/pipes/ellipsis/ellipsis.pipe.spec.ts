import { EllipsisPipe } from './ellipsis.pipe';

describe('EllipsisPipe', () => {
  const pipe = new EllipsisPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return text with ellipsis', () => {
    const value = pipe.transform('Angular Momentum in Quantum Mechanics', 30);
    expect(value).toEqual('Angular Momentum in Quantum Me...');
  });

  it('should return text with out ellipsis', () => {
    const value = pipe.transform('Pro Angular 6', 30);
    expect(value).toEqual('Pro Angular 6');
  });

  it('should return text with out ellipsis', () => {
    const value = pipe.transform('Pro Angular 6', 30);
    expect(value).toEqual('Pro Angular 6');
  });

  it('should set limit to 200 as default, when limit is not passed', () => {
    const content = `Best-selling author Adam Freeman shows you how to use Angular in your projects, starting from the nuts and 
      bolts and building up to the most advanced and sophisticated features, going in-depth to give you the 
      knowledge you need. Chapters include common problems and how to avoid them.`;

    const value = pipe.transform(content);
    expect(value)
      .toEqual(`Best-selling author Adam Freeman shows you how to use Angular in your projects, starting from the nuts and 
      bolts and building up to the most advanced and sophisticated features, going in-depth ...`);
  });
});
