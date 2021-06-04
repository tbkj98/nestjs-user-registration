import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: "PasswordResetInfo" })
export class PasswordResetEntity extends BaseEntity {

    @Column({ name: "Token", nullable: false })
    private _token: string;

    @Column({ name: "UserId", nullable: false, unique: true })
    private _userId: string;

    constructor(link: string, userId: string) {
        super();
        this._token = link;
        this._userId = userId;
    }

    public get link(): string { return this._token; }
    public get userId(): string { return this._userId }
}