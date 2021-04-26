import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ResourceService } from '../../services/resource/resource.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  floatLabelControl = 'auto';
  hideRequiredControl = false;
  searchKeyValue: string;
  inputForm: FormGroup;
  myFavoritesDropdownValue: string;
  @Output() emitSearchKey = new EventEmitter<string>();
  @Input() searchValue;
  options: any;


  constructor(private route: Router, private resourceSrv: ResourceService) { }

  ngOnInit(): void {
    this.initTemplateValues();
    this.inputForm = new FormGroup({
      searchKey: new FormControl('')
    });
    this.patchValue();

  }

  private initTemplateValues(): void {
    this.searchKeyValue = this.resourceSrv.getConstValue('nav.searchKey.placeholder.value');
    this.myFavoritesDropdownValue = this.resourceSrv.getConstValue('nav.Favorites.dropdown');

  }

  private patchValue(): void {
    this.inputForm.patchValue({
      searchKey: this.searchValue
    });
  }

  searchImage(): void {
    this.emitSearchKey.emit(this.inputForm.value.searchKey);

  }

  redirectToFavorite(): void {
    this.route.navigateByUrl('favourite');
  }

  goToHome(): void {

    if (this.route.url.includes('home')) {
      this.emitSearchKey.emit('');
      this.inputForm.reset();
    } else {
      this.route.navigateByUrl('home/images');
    }

  }
}
