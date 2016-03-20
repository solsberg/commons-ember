import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

var data = [
  {
    name: 'Simon',
    month: 'June'
  },
  {
    name: 'Marla',
    month: 'July'
  }
];

moduleForComponent('tab-view', 'Integration | Component | tab view', {
  integration: true,

  beforeEach(){
    this.set("tab_data", data);
  }
});

test('it creates tabs with provided titles', function(assert) {
  assert.expect(2);

  this.render(hbs`{{tab-view title_key="name" data=tab_data}}`);

  var title_links = this.$('ul.nav-tabs > li > a[role=tab]');
  assert.equal(title_links.length, data.length, "has one tab per element");

  var titles = title_links
    .map((i, el) => this.$(el).text().trim())
    .toArray();
  assert.deepEqual(titles, data.map(el => el.name), "displays correct titles");
});

test('it yields the content to render in tabs', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{#tab-view title_key="name" data=tab_data as |data|}}
      {{data.month}}
    {{/tab-view}}
  `);

  var tabs = this.$('.tab-pane');
  assert.equal(tabs.length, data.length, "has one tab per element");

  var content = tabs
    .map((i, el) => this.$(el).text().trim())
    .toArray();
  assert.deepEqual(content, data.map(el => el.month), "displays correct tab content");
});

test('it sets the dom links correctly', function(assert){
  assert.expect(4);

  this.render(hbs`{{tab-view title_key="name" data=tab_data prefix="section"}}`);

  var title_links = this.$('ul.nav-tabs > li > a[role=tab]');
  var tabs = this.$('.tab-pane');

  title_links.each((i, el) => {
    var tab_pane_id = this.$(tabs[i]).attr('id');
    assert.equal(this.$(el).attr('aria-controls'), tab_pane_id, "aria-controls value matches tab pane id");
    assert.equal(this.$(el).attr('href'), '#' + tab_pane_id, "title links to tab pane");
  });
});
