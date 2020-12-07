/**
 * CONTROLADOR
 * DOMINIO/api/alumno
 */

import { Request, Response } from 'express';
import { Alumnos } from '../entity/Alumnos';
import { getRepository } from 'typeorm';

export const getAlumnos = async (_: Request, res: Response):Promise<Response> => {

    const alumnos = await getRepository(Alumnos).find();

    return res.status(201).json({
        ok: true,
        alumnos
    });

}

export const getAlumno = async (req: Request, res: Response):Promise<Response> => {

    try {

        const alumno = await getRepository(Alumnos).findOne( req.params.leg_alumno );

        if ( !alumno ) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró un alumno con el legajo ${ req.params.leg_alumno }`
            });
        }
        
        return res.status(201).json({
            ok: true,
            alumno
        });   
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });  
    }


} 

export const createAlumnos = async (req: Request, res: Response):Promise<Response> => {

    try {

        const alumno = await getRepository(Alumnos).findOne( req.body.dni_alumno );

        if ( alumno ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un alumno con ese DNI'
            });
        }

        const newAlumno = getRepository(Alumnos).create(req.body);

        await getRepository(Alumnos).save(newAlumno);

        return res.status(201).json({
            ok: true,
            alumno: newAlumno
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });  
    }

}

export const updateAlumno = async (req: Request, res: Response):Promise<Response> => {
    
    const alumno = await getRepository(Alumnos).findOne( req.params.leg_alumno );

    try {
        
        if ( !alumno ) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró un alumno con el id ${ req.params.leg_alumno }`
            });
        }

        getRepository(Alumnos).merge(alumno, req.body);
        const result = await getRepository(Alumnos).save(alumno); 
        return res.status(201).json({
            ok: true,
            msg: 'Alumno actualizado exitosamente',
            result
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }

}

export const deleteAlumno = async (req: Request, res: Response):Promise<Response> => {

    const alumno = await getRepository(Alumnos).findOne(req.params.leg_alumno);
    
    try {
        
        if ( !alumno ) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró un alumno con el id ${ req.params.leg_alumno }`
            });
        }
    
        await getRepository(Alumnos).delete(req.params.leg_alumno)
    
        return res.status(201).json({
            ok: true,
            msg: 'Alumnos borrado exitosamente'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }

}