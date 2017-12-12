import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';

@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {
  // @Input()
  widget: any;

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widtype: string;
  errorFlag: boolean;
  errMsg: string;
  widgetRet: {};
  widgetNew: {};
  widgetExists: boolean;
  widgettext: string;
  widgetname: string;

  public editor;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
    placeholder: 'insert content...'
  };

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  onEditorBlured(quill) {
  }

  onEditorFocused(quill) {
  }

  onEditorCreated(quill) {
    this.editor = quill;
  }

  onContentChanged({quill, html, text}) {
  }

  ngOnInit() {
    this.errorFlag = false;
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.websiteId = params['websiteId'];
          this.pageId = params['pageId'];
          this.widgetId = params['widgetId'];
          this.widtype = params['widtype'];
          this.widgetService.findWidgetById(this.widgetId).subscribe((widget: any) => {
            this.widgetRet = widget;
            if (this.widgetRet) {
              this.widget = widget;
              this.widgetname = this.widget['name'];
              this.widgettext = this.widget['text'];
              this.widgetExists = true;
            } else {
              this.widgetname = '';
              this.widgettext = '';
              this.widgetExists = false;
            }
          });
        }
      );
  }

  createEditHeader() {
    if (this.widgetname === '' || this.widgetname === undefined) {
      this.errMsg = 'Enter name'
      this.errorFlag = true;
    } else if (this.widgetRet) {
      const widgetNew = {
        _id: this.widgetId,
        widgetType: 'HTML',
        pageId: this.pageId,
        text: this.widgettext,
        name: this.widgetname
      };
      this.widgetService
        .updateWidget(this.widgetId, widgetNew)
        .subscribe((widgets: any) => {
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
        });
    } else {
      this.widgetExists = false;
      this.widgetNew = {
        widgetType: 'HTML', pageId: this.pageId, text: this.widgettext, name: this.widgetname
      };
      this.widgetService.createWidget(this.pageId, this.widgetNew)
        .subscribe((widgets: any) => {
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
        });
    }
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId)
      .subscribe((widgets: any) => {
        this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
      });
  }
}
