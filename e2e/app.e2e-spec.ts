import { PrezrxPage } from './app.po';

describe('prezrx App', () => {
  let page: PrezrxPage;

  beforeEach(() => {
    page = new PrezrxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
