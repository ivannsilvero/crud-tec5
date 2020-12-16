/**
 * CONTROLADOR
 * DOMINIO/api/alumno
 */

import { Request, Response } from 'express';
import { Alumnos } from '../entity/Alumnos';
import { getRepository, getConnection, Like } from 'typeorm';


/**
 * Se puede ordenar por DNI, de forma ascendente o descendente
 * RUTA: DOMINIO/api/alumnos?sort_by=dni&order=asc
 */
export const getAlumnos = async (req: Request, res: Response): Promise<Response> => {

    let alumnos;
    const { sort_by, order } = req.query;

    if ( sort_by && order ) {
        alumnos = await getRepository(Alumnos)
            .createQueryBuilder()
            .orderBy('dni_alumno', 'ASC')
            .getMany()       
    } else {
        alumnos = await getRepository(Alumnos).find();
    }

    return res.status(200).json({
        ok: true,
        alumnos
    });

}

/**
 * RUTA: {{url}}/api/alumnos/:leg_alumno
 */
export const getAlumnoByLegajo = async (req: Request, res: Response): Promise<Response> => {

    try {

        const alumno = await getRepository(Alumnos).findOne( req.params.leg_alumno );

        if ( !alumno ) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró un alumno con el legajo ${ req.params.leg_alumno }`
            });
        }
        
        return res.status(200).json({
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

/**
 * RUTA: {{url}}/api/alumnos
 */
export const createAlumnos = async (req: Request, res: Response): Promise<Response> => {

    try {

        const alumno = await getRepository(Alumnos).findOne({ where: [
            { dni_alumno: req.body.dni_alumno },
            { leg_alumno: req.body.leg_alumno }
        ] });

        if ( alumno ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un alumno con ese legajo y/o DNI'
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

/**
 * RUTA: {{url}}/api/alumnos/:leg_alumno
 */
export const updateAlumno = async (req: Request, res: Response): Promise<Response> => {
    
    const alumno = await getRepository(Alumnos).findOne( req.params.leg_alumno );

    try {
        
        if ( !alumno ) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró un alumno con el legajo ${ req.params.leg_alumno }`
            });
        }

        getRepository(Alumnos).merge(alumno, req.body);
        const result = await getRepository(Alumnos).save(alumno); 
        return res.status(200).json({
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

/**
 * RUTA: {{url}}/api/alumnos/:leg_alumno
 */
export const deleteAlumno = async (req: Request, res: Response): Promise<Response> => {

    const alumno = await getRepository(Alumnos).findOne(req.params.leg_alumno);
    
    try {

        if ( !alumno ) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró un alumno con el legajo ${ req.params.leg_alumno }`
            });
        }

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Alumnos)
            .where('leg_alumno = :leg_alumno', { leg_alumno: req.params.leg_alumno })
            .execute();
    
        return res.status(204).json({
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

/**
 * RUTA: {{url}}/api/alumnos/postal/:cod_postal
 */
export const getAlumnosByCodigoPostal = async (req: Request, res: Response): Promise<Response> => {

    const alumnos = await getRepository(Alumnos).find({ where: { cod_postal: req.params.cod_postal } });

    return res.status(200).json({
        ok: true,
        alumnos
    });
    
}

/**
 * RUTA: DOMINIO/api/alumnos/nacimiento/:fecha_nac_alumno
 */
export const getAlumnosByFechaDeNacimiento = async (req: Request, res: Response): Promise<Response> => {

    const alumnos = await getRepository(Alumnos).find({ where: { fecha_nac_alumno: Like(`%${ req.params.fecha_nac_alumno }%`) } });

    return res.status(200).json({
        ok: true,
        alumnos
    });

}

/**
 * RUTA: DOMINIO/api/alumnos/postal/:cod_postal/sangre/:grupo_sang_alumno
 */
export const getAlumnosByCiudadAndSangre = async (req: Request, res: Response): Promise<Response> => {

    const alumnos = await getRepository(Alumnos).find({ where: { cod_postal: req.params.cod_postal, grupo_sang_alumno: req.params.grupo_sang_alumno } });

    return res.status(200).json({
        ok: true,
        alumnos
    });

}

/**
 * RUTA: DOMINIO/api/alumnos/calle/:dom_alumno
 */
export const getAlumnosByCalle = async (req: Request, res: Response): Promise<Response> => {
    
    const { dom_alumno } = req.params;

    const alumnos = await getRepository(Alumnos).find({ where: { dom_alumno: Like(`${ dom_alumno }%`) } })

    return res.status(200).json({
        ok: true,
        alumnos
    });
}
