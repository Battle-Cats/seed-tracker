import { Observable } from 'rxjs';

export interface ILocalItemStorage<T> {
    readonly currentValue: T;
    value: Observable<T>;
    asObservable(): Observable<T>;
}