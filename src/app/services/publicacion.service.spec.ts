import { TestBed } from '@angular/core/testing';

import { PublicacionService} from './publicacion.service';

describe('UsuarioService', () => {
  let service: PublicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
