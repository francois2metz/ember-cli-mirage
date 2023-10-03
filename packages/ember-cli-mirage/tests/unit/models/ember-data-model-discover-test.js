import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { createServer } from 'miragejs';
import { discoverEmberDataModels } from 'ember-cli-mirage';
import { dependencySatisfies } from '@embroider/macros';

module('Unit | Model | ember data model discover', function (hooks) {
  setupTest(hooks);

  let server;

  hooks.beforeEach(function () {
    const store = this.owner.lookup('service:store');
    server = createServer({
      models: discoverEmberDataModels(store),
    });
  });

  hooks.afterEach(function () {
    server.shutdown();
  });

  (dependencySatisfies('ember-data', '>=5.0.0') ? test.todo : test)(
    'it discovers the models',
    function (assert) {
      assert.ok(server.schema.modelFor('address'));
      assert.ok(server.schema.modelFor('comment'));
      assert.ok(server.schema.modelFor('post'));
      assert.ok(server.schema.modelFor('user'));
      assert.ok(server.schema.modelFor('wordSmith'));
    },
  );
});
