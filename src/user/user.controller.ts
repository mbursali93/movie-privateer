import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
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

  // @UseGuards(AuthGuard)
  @Get('like/:id') //TODO: change method back to POST
  async likeMovie(@Param() params) {
    const user_id = '118006333011418088831';
    const movie_id = params.id;

    return await this.userService.likeMovie(user_id, movie_id);
  }

  @UseGuards(AuthGuard)
  @Get('dislike') //TODO: change method back to DELETE
  async dislikeMovie() {
    return 'ok';
  }
}
