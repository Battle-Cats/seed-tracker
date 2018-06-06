import { TestBed, inject } from '@angular/core/testing';

import { CatSetService } from './cat-set.service';

describe('CatSetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatSetService]
    });
  });

  it('should be created', inject([CatSetService], (service: CatSetService) => {
    expect(service).toBeTruthy();
  }));
});
