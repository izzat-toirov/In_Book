
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { BookCollection } from "../../book-collection/entities/book-collection.entity";

interface ICollection {
    title: string;
    description: string;
    coverImageUrl: string;
    createdBy:number;
    isPublic:boolean;
    isPremiumOnly:boolean;
    isPremium:boolean;
}
@Table({tableName: "collection"})
export class Collection extends Model<Collection, ICollection>{
    @Column({
        type: DataType.STRING
    })
    declare title: string;
    @Column({
        type: DataType.STRING
    })
    declare description: string;
    @Column({
        type: DataType.STRING
    })
    declare coverImageUrl: string;

    @Column({
        type: DataType.INTEGER
    })
    declare createdBy: number;
    @Column({
        type: DataType.BOOLEAN
    })
    declare isPublic: boolean;
    @Column({
        type: DataType.BOOLEAN
    })
    declare isPremiumOnly: boolean;
    @Column({
        type: DataType.BOOLEAN
    })
    declare isPremium: boolean;

    @HasMany(() => BookCollection)
    declare bookCollection: BookCollection[];
    
}
