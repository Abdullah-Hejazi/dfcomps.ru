import { NewsSimpleInterface } from '../../../../services/news-service/interfaces/news-simple.interface';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-news-simple',
    templateUrl: './news-simple.component.html',
    styleUrls: ['./news-simple.component.less'],
})
export class NewsSimpleComponent {
    @Input() news: NewsSimpleInterface;
}
