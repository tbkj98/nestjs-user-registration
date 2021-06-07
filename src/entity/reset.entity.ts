import { User } from "src/model/pojo/User";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "PasswordResetInfo" })
export class PasswordResetEntity extends BaseEntity {

    @Column({ name: "Token", nullable: false })
    private readonly _token: string;

    @OneToOne(() => UserEntity, {eager:true, nullable:false, onUpdate:"NO ACTION", })
    @JoinColumn({referencedColumnName:"_id", name:"UserId"})
    private readonly _user: UserEntity;

    constructor(link: string, user: UserEntity) {
        super();
        this._token = link;
        this._user = user;
    }

    public get link(): string { return this._token; }
    public get user(): UserEntity { return this._user }
}