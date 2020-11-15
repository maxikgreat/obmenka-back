import {Module} from '@nestjs/common';
import {StoresModule} from 'database/stores/StoresModule';
import IAccountManager from './account/IAccountManager';
import AccountManager from './account/AccountManager';
import {AuthModule} from './auth/AuthModule';
import {ServicesModule} from 'services/ServicesModule';
import IUserManager from './user/IUserManager';
import UserManager from './user/UserManager';
import IFileManager from './file/IFileManager';
import FileManager from './file/FileManager';
import IRateManager from './rate/IRateManager';
import RateManager from './rate/RateManager';

@Module({
  imports: [
    //
    StoresModule,
    AuthModule,
    ServicesModule,
  ],
  providers: [
    {
      provide: IFileManager,
      useClass: FileManager,
    },
    {
      provide: IAccountManager,
      useClass: AccountManager,
    },
    {
      provide: IUserManager,
      useClass: UserManager,
    },
    {
      provide: IFileManager,
      useClass: FileManager,
    },
    {
      provide: IRateManager,
      useClass: RateManager,
    },
  ],
  exports: [
    IFileManager,
    AuthModule,
    IAccountManager,
    IUserManager,
    AuthModule,
    IFileManager,
    IRateManager,
  ],
})
export class ManagerModule {}
