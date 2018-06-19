import { ILocalItemStorage } from "../interfaces/ILocalItemStorage";
import { BehaviorSubject, Observable } from "rxjs";


export class LocalItemStorage<T> implements ILocalItemStorage<T> {
    protected subject: BehaviorSubject<T>;

    public currentValue: T;
    public value: Observable<T>;

    constructor(protected key: string, initValue: T, 
                private toString: (val: T) => string, 
                private fromString: (val: string) => T) {
        this.currentValue = initValue;
        this.subject = new BehaviorSubject<T>(initValue);
        this.value = this.subject.asObservable();
    }

    public update(value: T) {
        let strValue = this.toString(value);
        console.log(`Updating storage '${this.key}' to '${strValue}`);
        this.currentValue = value;
        localStorage.setItem(this.key, strValue);
        this.subject.next(value);
    }

    public fetch(): T {
        let value = this.fromString(localStorage.getItem(this.key));
        this.subject.next(value);
        return value; 
    }

    public asObservable(): Observable<T> {
        return this.value;
    }
}


export class LocalNumberItemStorage extends LocalItemStorage<number> implements ILocalItemStorage<number> {
    constructor(key: string, initValue: number) {
        super(key, initValue, v => String(v), v => +v);
    }

    public fetchNull(): number | null {
        let val = localStorage.getItem(this.key);

        if (val === '')
            return null;
        return +val;
    }
}

export class LocalStringItemStorage extends LocalItemStorage<string> implements ILocalItemStorage<string> {
    constructor(key: string, initValue: string) {
        super(key, initValue, v => v, v => v);
    }
}
