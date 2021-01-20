import { sanitize } from './index';

describe('sanitize', () => {
  it('should remove fields that start with $ from objects', () => {
    expect(Object.keys(sanitize({ $gt: 5 })).length).toBe(0);
    expect(sanitize({ $gt: 5, a: 1 })).toStrictEqual({ a: 1 });
    expect(sanitize({ '$gt': '' })).toStrictEqual({});
  });
  
  it('should remove fields that start with $ from objects but retain rsi fields', () => {
    const object = {
        a: 1,
        $gt: 5,
        $fields: 'fields',
        $expand: 'expand',
        $sortby: 'sortby',
        $offset: 'offset',
        $limit: 'limit',
        $accessrights: 'accessrights',
        $id: 'id',
        $spec: 'spec',
    }

    const expected = {
        a: 1,
        $fields: 'fields',
        $expand: 'expand',
        $sortby: 'sortby',
        $offset: 'offset',
        $limit: 'limit',
        $accessrights: 'accessrights',
        $id: 'id',
        $spec: 'spec',
    }
    expect(Object.keys(sanitize(object)).length).toBe(9);
    expect(sanitize(object)).toStrictEqual(expected);
  });
  
  it('should retain fields added', () => {
    const object = {
        a: 1,
        $gt: 5,
        $id: 'id',
        $spec: 'spec',
        $q: 'q',
        $keep: 'keep',
    }

    const expected = {
        a: 1,
        $id: 'id',
        $spec: 'spec',
        $q: 'q',
        $keep: 'keep',
    }
    expect(Object.keys(sanitize(object, ['$q', '$keep'])).length).toBe(5);
    expect(sanitize(object, ['$q', '$keep'])).toStrictEqual(expected);
  });

  it('should do nothing for numbers and strings', () => {
    expect(sanitize(1)).toEqual(1);
    expect(sanitize('a')).toEqual('a');
  });

  it('should do nothing for arrays', () => {
    expect(sanitize([1, 2, 3])).toStrictEqual([1, 2, 3]);
  });

  it('shouldnt be fooled by non-POJOs', () => {
    class Clazz {
      $gt: number;
      a: number;
      constructor() {
          this.$gt = 5;
          this.a = 1
      }
    };

    const o = sanitize(new Clazz());
    expect(o).toEqual({ a: 1 });
  });

  it('should remove nested fields', () => {
    const obj = { username: { $ne: null }};
    expect(sanitize(obj)).toStrictEqual({ username: {} });

    const issue3 = { "foo": { "bar": { "$ref": "foo" } } };
    expect(sanitize(issue3)).toStrictEqual({ foo: { bar: {} } });
  });

  it('should do nothing for null or undefined', () => {
    expect(null).toStrictEqual(sanitize(null));
    expect(undefined).toStrictEqual(sanitize(undefined));
    expect(sanitize({ 'a': null })).toStrictEqual({ 'a': null });
  });
});
