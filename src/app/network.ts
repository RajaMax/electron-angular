import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

export enum ConnectionStatusEnum {
  Offline,
  Online
}

export class NetworkConnection {

  public static status: ConnectionStatusEnum = ConnectionStatusEnum.Online;
  private static online$: Observable<string>;
  private static offline$: Observable<string>;

  public static init() {
    NetworkConnection.online$ = Observable.fromEvent(window, 'online');
    NetworkConnection.offline$ = Observable.fromEvent(window, 'offline');

    NetworkConnection.online$.subscribe(e => {
      console.log('Online');
      NetworkConnection.status = ConnectionStatusEnum.Online;
    });

    NetworkConnection.offline$.subscribe(e => {
      console.log('Offline');
      NetworkConnection.status = ConnectionStatusEnum.Offline;
    });
  }

  constructor() {
    NetworkConnection.init();
  }

}

new NetworkConnection();