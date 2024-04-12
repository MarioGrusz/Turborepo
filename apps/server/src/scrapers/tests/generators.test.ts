import { describe, expect, it } from 'vitest';

async function* linkProducer()  {
  while(true) {
    yield {link: 'https://www.google.com', type: 'coffee'};
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

async function linkProcessor(queue: Array<{link: string, type: string}>) {
  while(true) {
    const result = queue.pop();
    if(result !== undefined) {
      const {link, type} = result;
      console.log('processor', link)
    }

    await new Promise(resolve => setTimeout(resolve, 1200));

  }
}

describe.skipIf(() => process.env.CI != 'true')('someGenerators', () => {
  it('should extract product data correctly', async () => {
    expect(1).toBe(1)
    const queue = [];
    linkProcessor(queue)

    for await (const link of linkProducer()) {
        console.log('link', link)
        queue.push(link)
    }
    }, {timeout: 0})
  })



