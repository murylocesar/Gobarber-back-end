import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakesMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default FakesMailTemplateProvider;
