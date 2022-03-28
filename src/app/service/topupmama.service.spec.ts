import { TestBed } from '@angular/core/testing';

import { TopupmamaService } from './topupmama.service';

describe('TopupmamaService', () => {
  let service: TopupmamaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopupmamaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
