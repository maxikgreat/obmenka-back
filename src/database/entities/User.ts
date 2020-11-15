import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import File from 'database/entities/File';

@Entity()
export default class User {
  constructor(
    id: string,
    image: File,
    imageId: string,
    name: string,
    email: string,
    phoneNumber: string,
    isAdmin: boolean,
  ) {
    this.id = id;
    this.image = image;
    this.imageId = imageId;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.isAdmin = isAdmin;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => File, {nullable: true})
  image?: File;

  @Column({nullable: true})
  imageId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  isAdmin: boolean;
}
