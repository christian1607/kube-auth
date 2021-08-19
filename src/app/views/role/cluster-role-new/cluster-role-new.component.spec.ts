import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterRoleNewComponent } from './cluster-role-new.component';

describe('ClusterRoleNewComponent', () => {
  let component: ClusterRoleNewComponent;
  let fixture: ComponentFixture<ClusterRoleNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterRoleNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterRoleNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
