import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { BookVersion } from "../../book_version/entities/book_version.entity";

interface ILanguase {
    code: string;
    name: string;
    flag: string;
}
@Table({tableName: "languages"})
export class Languase extends Model<Languase, ILanguase>{
    @Column({
        type: DataType.STRING
    })
    declare code: string;
    @Column({
        type: DataType.STRING
    })
    declare name: string;
    @Column({
        type: DataType.STRING
    })
    declare flag: string;


    @HasMany(() => BookVersion)
    declare bookVersion: BookVersion[];
}
