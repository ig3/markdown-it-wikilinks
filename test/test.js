'use strict';

const t = require('@ig3/test');

t.test('markdown-it-wikilinks no options', (t) => {
  const plugin = require('../')();
  const md = require('markdown-it')()
  .use(plugin);

  t.equal(
    md.render('[[Wiki Link]]'),
    '<p><a href="./Wiki_Link.html">Wiki Link</a></p>\n'
  );
  t.equal(
    md.render('[[Help/Wiki Link]]'),
    '<p><a href="./Help/Wiki_Link.html">Help/Wiki Link</a></p>\n'
  );
  t.equal(
    md.render('[[/Main/Wiki Link]]'),
    '<p><a href="/Main/Wiki_Link.html">/Main/Wiki Link</a></p>\n'
  );
  t.equal(
    md.render('Here is a [[Wiki Link]]'),
    '<p>Here is a <a href="./Wiki_Link.html">Wiki Link</a></p>\n'
  );
  t.equal(
    md.render('[[Wiki Link]]s are cool'),
    '<p><a href="./Wiki_Link.html">Wiki Link</a>s are cool</p>\n'
  );
  t.equal(
    md.render('Click [[Wiki Link|here]] to learn about wiki links'),
    '<p>Click <a href="./Wiki_Link.html">here</a> to learn about wiki links</p>\n'
  );
  t.equal(
    md.render('This is [[not a valid wiki link]'),
    '<p>This is [[not a valid wiki link]</p>\n'
  );
  t.equal(
    md.render('This is [not a valid wiki link]] either'),
    '<p>This is [not a valid wiki link]] either</p>\n'
  );
  t.equal(
    md.render('[[Wiki Link| ]]'),
    '<p>[[Wiki Link| ]]</p>\n'
  );
  t.equal(
    md.render('[[ ]]'),
    '<p>[[ ]]</p>\n'
  );
  t.end();
});

t.test('markdown-it-wikilinks option linkPattern', (t) => {
  const plugin = require('../')({
    linkPattern: /\[\[\[([-\w\s/]+)(\|([-\w\s/]+))?\]\]\]/,
  });
  const md = require('markdown-it')()
  .use(plugin);

  t.equal(
    md.render('[[Wiki Link]]'),
    '<p>[[Wiki Link]]</p>\n'
  );
  t.equal(
    md.render('[[[Wiki Link]]]'),
    '<p><a href="./Wiki_Link.html">Wiki Link</a></p>\n'
  );
  t.end();
});

t.test('markdown-it-wikilinks option baseUrl', (t) => {
  const plugin = require('../')({
    baseURL: '/root/',
  });
  const md = require('markdown-it')()
  .use(plugin);

  t.equal(
    md.render('[[Wiki Link]]'),
    '<p><a href="./Wiki_Link.html">Wiki Link</a></p>\n'
  );
  t.equal(
    md.render('[[/Wiki Link]]'),
    '<p><a href="/root/Wiki_Link.html">/Wiki Link</a></p>\n'
  );
  t.end();
});

t.test('markdown-it-wikilinks option baseUrl', (t) => {
  const plugin = require('../')({
    relativeBaseURL: '/root/',
  });
  const md = require('markdown-it')()
  .use(plugin);

  t.equal(
    md.render('[[Wiki Link]]'),
    '<p><a href="/root/Wiki_Link.html">Wiki Link</a></p>\n'
  );
  t.equal(
    md.render('[[/Wiki Link]]'),
    '<p><a href="/Wiki_Link.html">/Wiki Link</a></p>\n'
  );
  t.end();
});

t.test('markdown-it-wikilinks option makeAllLinksAbsolute', (t) => {
  const plugin = require('../')({
    makeAllLinksAbsolute: true,
  });
  const md = require('markdown-it')()
  .use(plugin);

  t.equal(
    md.render('[[Wiki Link]]'),
    '<p><a href="/Wiki_Link.html">Wiki Link</a></p>\n'
  );
  t.end();
});

t.test('markdown-it-wikilinks option uriSuffix', (t) => {
  const plugin = require('../')({
    uriSuffix: '.xhtml',
  });
  const md = require('markdown-it')()
  .use(plugin);

  t.equal(
    md.render('[[Wiki Link]]'),
    '<p><a href="./Wiki_Link.xhtml">Wiki Link</a></p>\n'
  );
  t.end();
});

t.test('markdown-it-wikilinks option htmlAttributes', (t) => {
  const plugin = require('../')({
    htmlAttributes: {
      class: 'special',
    },
  });
  const md = require('markdown-it')()
  .use(plugin);

  t.equal(
    md.render('[[Wiki Link]]'),
    '<p><a href="./Wiki_Link.html" class="special">Wiki Link</a></p>\n'
  );

  t.end();
});

t.test('markdown-it-wikilinks option generatePageNameFromLabel', (t) => {
  const plugin = require('../')({
    generatePageNameFromLabel: (label) => {
      return 'TEST';
    },
  });
  const md = require('markdown-it')()
  .use(plugin);

  t.equal(
    md.render('[[Wiki Link]]'),
    '<p><a href="./TEST.html">Wiki Link</a></p>\n'
  );
  t.end();
});

t.test('markdown-it-wikilinks option postProcessPageName', (t) => {
  const plugin = require('../')({
    postProcessPageName: (label) => {
      return 'TEST';
    },
  });
  const md = require('markdown-it')()
  .use(plugin);

  t.equal(
    md.render('[[Wiki Link]]'),
    '<p><a href="./TEST.html">Wiki Link</a></p>\n'
  );
  t.end();
});

t.test('markdown-it-wikilinks option postProcessLabel', (t) => {
  const plugin = require('../')({
    postProcessLabel: (label) => {
      return 'TEST';
    },
  });
  const md = require('markdown-it')()
  .use(plugin);

  t.equal(
    md.render('[[Wiki Link]]'),
    '<p><a href="./Wiki_Link.html">TEST</a></p>\n'
  );
  t.end();
});
