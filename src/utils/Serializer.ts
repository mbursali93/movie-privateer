import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  serializeUser(user: User, done: Function) {
    console.log('serialize');
    done(null, user.id);
  }

  deserializeUser(payload: any, done: Function) {
    console.log('deserialize');
    done(null, payload);
  }
}
