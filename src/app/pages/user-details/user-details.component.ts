import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserDetails } from '../../types/types';
import { HeaderComponent } from '../../components/header/header.component';
import { PageLoader } from '../../decorators';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, AsyncPipe]
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  userDetails!: Promise<UserDetails>; 
  fullName!: string;

  async ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');

    if (!userId) return;

    this.userDetails = this.getUserDetails(userId);
  }

  /**
   * 
   * @param userId 
   * @returns void
   * 
   * Load user details.
   */
  @PageLoader
  async getUserDetails(userId: number | string) {
    return firstValueFrom(
      this.httpClient.get<UserDetails>(`https://reqres.in/api/users/${userId}`)
    );
  }

  /**
   * Go back to list of users.
   */
  backToUserList(){
    this.router.navigateByUrl('/')
  }
}
