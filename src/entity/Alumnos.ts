import { Entity, Column } from 'typeorm';

@Entity()
export class Alumnos {
    
    @Column('int', { primary: true, nullable: false })
    leg_alumno: number;
    
    @Column('char', { length: 50, nullable: false })
    apyn_alumno: string;
    
    @Column('char', { length: 50, nullable: false })
    dom_alumno: string;
    
    @Column('int', { nullable: false })
    cod_postal: number;
    
    @Column('date', { nullable: false })
    fecha_nac_alumno: string;
    
    @Column('char', { length: 50, nullable: false })
    email_alumno: string;

    @Column('char', { length: 50, nullable: false })
    grupo_sang_alumno: string;

    @Column('char', { length: 50, nullable: false })
    tel_fijo_alumno: string;

    @Column('char', { length: 50, nullable: false })
    tel_movil_alumno: string;

    @Column('double', { nullable: false })
    dni_alumno: number;

}