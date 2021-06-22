import { ArrayToStringPipe } from './array-to-string.pipe';

describe('ArrayToStringPipe', () => {
  const pipe = new ArrayToStringPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform an array of string into comma separated string', () => {
    const authors = ['Brad Dayley', 'Brendan Dayley', 'Caleb Dayley'];

    const result = pipe.transform(authors);

    expect(result).toEqual('Brad Dayley, Brendan Dayley and Caleb Dayley');
  });
});
