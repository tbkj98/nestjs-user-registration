import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {

    @PrimaryGeneratedColumn({ name: 'Id' })
    private _id: string;

    @CreateDateColumn({ name: 'CreatedAt', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    private _createDateTime: Date;

    @UpdateDateColumn({ name: 'LastUpdatedAt', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    private _lastUpdateDateTime: Date;

    public get id(): string {
        return this._id;
    }

    public get createDateTime(): Date {
        return this._createDateTime;
    }

    public get lastUpdateDateTime(): Date {
        return this._lastUpdateDateTime;
    }
}