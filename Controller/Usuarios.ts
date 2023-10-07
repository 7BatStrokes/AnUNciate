import { Request, Response } from "express";
import * as Models from "../Back/Models";

export const getUsuarios = async (req: Request, res: Response) => {
    
    const usuarios= await Models.USR_MOD.findAll();
    
    res.json({usuarios});
}

export const getUsuario = async (req: Request, res: Response) => {
    
    const {id} = req.params;

    const usuario= await Models.USR_MOD.findByPk(id);

    usuario ? res.json(usuario) : res.status(404).json({
        msg: "No existe usuario con ID: "+ id
    })
}


export const postUsuario = async (req: Request, res: Response) => {
    
    const {body}= req;

    try {
        const usuario= Models.USR_MOD.build(body);
        await usuario.save();
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear User",
        })
    }
    
}

export const putUsuario = (req: Request, res: Response) => {
    
    const {body}= req;
    const {id}= req.params;
    
    res.json({
        msg: "putUsuarios",
        body,
        id
    })
}

export const deleteUsuario = (req: Request, res: Response) => {
    
    const {id}= req.params;
    
    res.json({
        msg: "Delete Usuarios",
        id
    })
}