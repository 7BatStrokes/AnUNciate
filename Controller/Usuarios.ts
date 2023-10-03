import { Request, Response } from "express";
import * as Models from "../Back/Models";

export const getUsuarios = async (req: Request, res: Response) => {
    
    const usuarios= await Models.usuario.findAll();
    
    res.json({usuarios});
}

export const getUsuario = async (req: Request, res: Response) => {
    
    const {id} = req.params;

    const usuario= await Models.usuario.findByPk(id);

    usuario ? res.json(usuario) : res.status(404).json({
        msg: "No existe usuario con ID"
    })
}

export const postUsuario = (req: Request, res: Response) => {
    
    const {body}= req;
    
    res.json({
        msg: "postUsuarios",
        body
    })
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