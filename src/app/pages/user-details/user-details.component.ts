import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserDetails } from '../../types/types';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  userDetails!: UserDetails;

  async ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');

    if (!userId) return;

    this.userDetails = await this.getUserDetails(userId);
  }

  getUserDetails(userId: number | string) {
    return firstValueFrom(
      this.httpClient.get<UserDetails>(`https://reqres.in/api/users/${userId}`)
    );
  }
}
