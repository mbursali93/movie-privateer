import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard, GoogleOAuthGuard } from './user.guard';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google/login')
  async googleLogin() {
    return 'login';
  }

  @UseGuards(GoogleOAuthGuard)
  @Get('google/redirect')
  async googleRedirect() {
    return 'redirect';
  }

  @UseGuards(AuthGuard)
  @Get()
  async getUserProfile(@Req() req) {
    console.log(req.user);
    return await this.userService.getUserProfile();
  }
}
