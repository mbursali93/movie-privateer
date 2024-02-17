import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GoogleOAuthGuard } from './user.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserProfile() {
    return await this.userService.getUserProfile();
  }

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
}
