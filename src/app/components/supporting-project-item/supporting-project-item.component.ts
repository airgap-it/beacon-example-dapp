import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'beacon-supporting-project-item',
  templateUrl: './supporting-project-item.component.html',
  styleUrls: ['./supporting-project-item.component.scss']
})
export class SupportingProjectItemComponent implements OnInit {
  @Input()
  public logo: string | undefined

  @Input()
  public title: string | undefined

  @Input()
  public description: string | undefined

  @Input()
  public btnDescription: string | undefined

  @Input()
  public btnLink: string | undefined

  constructor() {}

  ngOnInit() {}
}
