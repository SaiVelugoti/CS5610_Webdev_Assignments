import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {TestComponent} from './components/test/test.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {WebsiteListComponent} from './components/website/website-list/website-list.component';
import {WebsiteEditComponent} from './components/website/website-edit/website-edit.component';
import {PageNewComponent} from './components/page/page-new/page-new.component';
import {PageListComponent} from './components/page/page-list/page-list.component';
import {WebsiteNewComponent} from './components/website/website-new/website-new.component';
import {PageEditComponent} from './components/page/page-edit/page-edit.component';
import {WidgetListComponent} from './components/widget/widget-list/widget-list.component';
import {WidgetChooserComponent} from './components/widget/widget-chooser/widget-chooser.component';
import {WidgetEditComponent} from './components/widget/widget-edit/widget-edit.component';
import {AuthGuard} from './services/auth-guard.service';
import {FlickrSearchComponent} from './components/widget/widget-edit/widget-image/flickr-search/flickr-search.component';

const APP_ROUTES: Routes = [
  { path : '' , component: LoginComponent},
  { path : 'test', component: TestComponent},
  { path : 'login' , component: LoginComponent},
  { path : 'register' , component: RegisterComponent},
  // { path : 'user/:userId' , component: ProfileComponent, canActivate: [AuthGuard]},
  { path : 'profile' , component: ProfileComponent, canActivate: [AuthGuard]},
  { path : 'website' , component: WebsiteListComponent, canActivate: [AuthGuard]},
  { path : 'user/:userId/website' , component: WebsiteListComponent},
  { path : 'user/:userId/website/new' , component: WebsiteNewComponent},
  { path : 'user/:userId/website/:websiteId' , component: WebsiteEditComponent},
  { path : 'user/:userId/website/:websiteId/page' , component: PageListComponent},
  { path : 'user/:userId/website/:websiteId/page/new' , component: PageNewComponent},
  { path : 'user/:userId/website/:websiteId/page/:pageId' , component: PageEditComponent},
  { path : 'user/:userId/website/:websiteId/page/:pageId/widget' , component: WidgetListComponent},
  { path : 'user/:userId/website/:websiteId/page/:pageId/widget/new' , component: WidgetChooserComponent},
  { path : 'user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/flickrSearch', component: FlickrSearchComponent},
  { path : 'user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/:widtype' , component: WidgetEditComponent}
];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
