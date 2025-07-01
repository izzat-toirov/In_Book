import { BelongsTo, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { AudioPart } from "../../audio_parts/entities/audio_part.entity";

interface IAudio_Book {
    book_version_id: number;
    narrator_name: string;
    total_duration: number;
    total_size_mb: number;
}
@Table({tableName: "audio_book"})
export class AudioBook extends Model<AudioBook, IAudio_Book>{
     @Column({
            type: DataType.INTEGER
        })
        declare book_version_id: number;
    @Column({
            type: DataType.STRING
        })
        declare narrator_name: string;
    @Column({
            type: DataType.INTEGER
        })
        declare total_duration: number;

    @Column({
        type: DataType.DECIMAL(15, 2)
    })
        declare total_size_mb: number;


    @HasMany(() => AudioPart)
    declare audioParts: AudioPart[];
}
