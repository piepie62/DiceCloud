import inputProviderForTests from '/imports/api/engine/action/functions/inputProviderForTests.testFn';
import { parse } from '/imports/parser/parser';
import resolve from '/imports/parser/resolve';
import toString from '/imports/parser/toString';
import { assert } from 'chai';

describe('Call Node', function () {
  it('compiles', async function () {
    const callNode = parse('min( unknownVariable, 1 + 2, 3d30 )');
    const { result, context } = await resolve('compile', callNode, undefined, undefined, inputProviderForTests);
    assert.isEmpty(context.errors)
    assert.equal(toString(result), 'min(unknownVariable, 3, 3d30)');
  });
  it('reduces', async function () {
    const callNode = parse('min( unknownVariable, 1 + 2, 3d30 )');
    const { result, context } = await resolve('reduce', callNode, undefined, undefined, inputProviderForTests);
    assert.isEmpty(context.errors)
    assert.equal(toString(result), '0');
  });
});
