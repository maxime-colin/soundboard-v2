import { SoundboardPage } from './app.po';

describe('soundboard App', function() {
  let page: SoundboardPage;

  beforeEach(() => {
    page = new SoundboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
