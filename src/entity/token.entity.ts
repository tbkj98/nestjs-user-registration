import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";


@Entity({ name: "Tokens" })
export class TokenEntity extends BaseEntity {

    @Column({ name: "Token", nullable: false })
    private _token: string;

    constructor(token: string) {
        super();
        this._token = token;
    }

    public get token(): string { return this._token; }
}