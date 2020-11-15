import {Module} from '@nestjs/common';
import IUserStore from 'database/stores/user/IUserStore';
import UserStore from 'database/stores/user/UserStore';
import {DatabaseModule} from 'database/DatabaseModule';
import ISessionStore from 'database/stores/session/ISessionStore';
import SessionStore from 'database/stores/session/SessionStore';
import IFileStore from 'database/stores/file/IFileStore';
import FileStore from 'database/stores/file/FileStore';
import ILoginStore from 'database/stores/login/ILoginStore';
import LoginStore from 'database/stores/login/LoginStore';
import IRateStore from 'database/stores/rate/IRateStore';
import RateStore from 'database/stores/rate/RateStore';

@Module({
  imports: [
    //
    DatabaseModule,
  ],
  providers: [
    {
      provide: ISessionStore,
      useClass: SessionStore,
    },
    {
      provide: IUserStore,
      useClass: UserStore,
    },
    {
      provide: IFileStore,
      useClass: FileStore,
    },
    {
      provide: ILoginStore,
      useClass: LoginStore,
    },
    {
      provide: IRateStore,
      useClass: RateStore,
    },
  ],
  exports: [ISessionStore, IUserStore, IFileStore, ILoginStore, IRateStore],
})
export class StoresModule {}
