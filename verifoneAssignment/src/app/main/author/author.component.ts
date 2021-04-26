import { Component, OnInit } from '@angular/core';
import { SearchImageService } from '../../services/main/search-image/search-image.service';
import { AuthorService } from '../../services/main/author/author.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from 'src/app/services/resource/resource.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  showPhotos = false;
  showLikes = false;
  showCollections = false;
  btnStyle: string;
  authorDetails: any;
  authorName;
  somevar;
  userDetails: any;
  uploadedPhotos: any;
  photos = [];
  likedPhotosLink: any;
  likes = [];
  collectionsLink: any;
  displayCollectioions = false;
  divPhotosStyle = 'div_for_photos';
  divLikesStyle = 'div_for_photos';
  divCollectionsStyle = 'div_for_photos';
  isSearchImage = false;

  collections = [];
  collectionsListArray = [];
  previewImages = [];
  initResourceVale: {
    follwersLabel: string;
    followingCountLabel: string;
    collectionsLabel: string;
    navPhotos: string;
    navLikes: string;
    navCollections: string;
    linkActive: string;
    linkDeactive: string;
  };
  constructor(
    private authorSrv: AuthorService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private resourceFile: ResourceService
  ) {
  }

  ngOnInit(): void {
    sessionStorage.clear();
    this.initResource();
    this.getUserData();
    this.forCollections();
  }

  onclickOnPhotos(): any {
    this.uploadedPhoto();
    this.divPhotosStyle = this.initResourceVale.linkActive;
    this.divLikesStyle = this.initResourceVale.linkDeactive;
    this.divCollectionsStyle = this.initResourceVale.linkDeactive;
    this.showPhotos = true;
    this.showCollections = false;
    this.displayCollectioions = false;
    this.showLikes = false;
    this.authorSrv.getPhotosLink(this.uploadedPhotos).subscribe(res => {
      this.photos = res;
    });

  }
  onclickOnLikes(): any {
    this.showLikes = true;
    this.showCollections = false;
    this.showPhotos = false;
    this.divPhotosStyle = this.initResourceVale.linkDeactive;
    this.divLikesStyle = this.initResourceVale.linkActive;
    this.divCollectionsStyle = this.initResourceVale.linkDeactive;
    this.displayCollectioions = false;
    this.authorSrv.getLikesLink(this.likedPhotosLink).subscribe(res => {
      this.likes = res;
    });

  }
  onclickOnCollections(): any {
    this.divPhotosStyle = this.initResourceVale.linkDeactive;
    this.divLikesStyle = this.initResourceVale.linkDeactive;
    this.divCollectionsStyle = this.initResourceVale.linkActive;
    this.showCollections = true;
    this.showLikes = false;
    this.showPhotos = false;
    if (this.userDetails.total_collections) {
      this.getCollections();
      this.authorSrv.getCollectionsLink(this.collectionsLink).subscribe((res) => {
        this.collections = res;
      });
    }
    this.displayCollectioions = true;

  }

  getUserData(): any {
    if (history.state !== null) {
      this.authorDetails = history.state.data;
      this.authorSrv.getUsers(this.authorDetails).subscribe(res => {
        this.userDetails = res;
        this.uploadedPhotos = res.links.photos;
        this.likedPhotosLink = res.links.likes;
        this.onclickOnPhotos();
      });
    }
  }

  uploadedPhoto(): any {
    this.authorSrv.getPhotosLink(this.uploadedPhotos);
  }

  likedPhotos(): any {
    this.authorSrv.getLikesLink(this.likedPhotosLink);
  }
  getCollections(): any {
    this.authorSrv.getCollectionsLink(this.collectionsLink);
  }

  forCollections(): any {
    if (this.authorDetails === undefined || this.authorDetails === null) {
      return;
    }
    this.authorSrv.getUserCollections(this.authorDetails).subscribe(res => {
      this.collectionsListArray = res;
      res.forEach(element => {
        this.collectionsLink = element.links.photos;
        element.preview_photos.forEach(ele => {
          this.previewImages.push(ele);
        });
      });
    });
  }

  private initResource(): void {
    this.initResourceVale = {
      follwersLabel: this.resourceFile.getConstValue('authorDetail.follwers.label'),
      followingCountLabel: this.resourceFile.getConstValue('authorDetail.following.label'),
      collectionsLabel: this.resourceFile.getConstValue('authorDetail.collections.label'),
      navPhotos: this.resourceFile.getConstValue('authorDetail.nav.photos'),
      navLikes: this.resourceFile.getConstValue('authorDetail.nav.likes'),
      navCollections: this.resourceFile.getConstValue('authorDetail.nav.collections'),
      linkActive: this.resourceFile.getConstValue('authorDetail.link.active'),
      linkDeactive: this.resourceFile.getConstValue('authorDetail.link.deactive')
    };
  }

  searchImages($event): void {
    if ($event.trim().length !== 0) {
      this.router.navigate(['home/images'], { state: { data: $event } });
    }
  }


}
