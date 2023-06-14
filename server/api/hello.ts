// api/hello.ts
import { readBody, defineEventHandler, send } from 'h3';
import Mock from 'mockjs';
import * as builder from 'xmlbuilder';

export default defineEventHandler(async (event: unknown) => {
  const { id } = event?.context?.params;

  const root = builder.create('updates');
  fakeData().forEach(item => {
    let el = root.ele('update');
    el.att('id', item.id);
    el.att('value', `<object label="${item.label}" load="${item.load}" placeholder="${item.placeholder}" >`),
    el.att('style', objSerialize(item.style));
  })
  const xml = root.end({pretty: true});
  // TODO: xml query

  const body = await readBody(event);
  // const query = await getQuery(event);
  // const cookies = parseCookies(event)

  // setResponseStatus(event, 202);
  // return sendStream(event, fs.createReadStream('/path/to/file'));
  // return sendRedirect(event, '/path/redirect/to', 302)

  console.log('\x1b[33m%s\x1b[0m', body, '\x1b[0m');


  // @ts-ignore
  return send(event, xml, 'text/xml');
});

// used in web
// await $fetch('/api/hello')


// const Random = Mock.Random;
const fakeData = () => {
  let news = [];
  const type = ['cube', 'oval', 'popup', 'human', 'text'];
  const now = formatDate(new Date(), '{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}');

  for (let i = 0; i < 5; i++) {
    const isText = type[i] === 'text';
    news.push(Mock.mock({
      // id: '@increment',
      "id": type[i],
      label: isText ? now: '@ctitle(2, 6)',
      load: '@integer(3, 100)',
      placeholder: '@ctitle(3, 8)',
      style: {
        "edgeStyle|1": ['none', 'elbow', 'entity', 'relation', 'segment', 'orthogonal'],
        "strokeColor": '@color',
        "fillColor": isText ? '#fff': '@color',
        "stokeWidth": '@integer(0, 5)',
        'rounded': '@integer(0, 30)'
      }

    }));
  }

  return news;
};

const formatDate = (date, exp) => exp.replace(/{.*?}/g, key => {
  return {
    '{yyyy}': `${date.getFullYear()}`,
    '{yy}': `${date.getFullYear()}`.slice(-2),
    '{MM}': `${(date.getMonth() + 1)}`.padStart(2, '0'),
    '{dd}': `${date.getDate()}`.padStart(2, '0'),
    '{HH}': `${date.getHours()}`.padStart(2, '0'),
    '{mm}': `${date.getMinutes()}`.padStart(2, '0'),
    '{ss}': `${date.getSeconds()}`.padStart(2, '0'),
    '{SSS}': `${date.getMilliseconds()}`.padStart(3, '0')
  }[key] || '';
});

const objSerialize = (obj) => Object.entries(obj).map(([key, val]) => `${key}=${val}`).join(';');