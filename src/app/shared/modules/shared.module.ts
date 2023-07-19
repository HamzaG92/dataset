import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterPipe } from "../pipes/filter.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [FilterPipe],
  imports: [CommonModule],
  exports: [
    FilterPipe,
    CommonModule,
    FormsModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatTableModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
})
export class SharedModule {}
