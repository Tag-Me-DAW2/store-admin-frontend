import { Component } from "@angular/core";

@Component({
    selector: 'dashboard-detail-card',
    templateUrl: './dashboard-detail-card.html',
    styleUrl: './dashboard-detail-card.scss',
    inputs: ['icon', 'title', 'count']
})
export class DashboardDetailCard {
    icon!: string;
    title!: string;
    count!: number;
}