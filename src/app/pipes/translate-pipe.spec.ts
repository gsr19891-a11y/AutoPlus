import { LangService } from '../services/lang-service';
import { TranslatePipe } from './translate-pipe';

describe('TranslatePipe', () => {
  it('create an instance', () => {
   
    const mockLangService = {
      translate: (key: string) => key
    } as unknown as LangService;

    const pipe = new TranslatePipe(mockLangService);
    expect(pipe).toBeTruthy();
  });
});