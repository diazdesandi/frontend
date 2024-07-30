import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './components/side-bar/side-bar.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent, MenuComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    PrimengModule,
    FormsModule,
  ],
})
export class LayoutModule {}
