import { Request, Response } from "express";
import * as Models from "../Back/Models";
import * as Funcs from "../Functions/Funcs";
import { sign, verify } from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

//User Management
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

//LogIn and Register
export const postLogin = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        Funcs.logIn(data.user, data.password).then((value) => {
            if (typeof(value) == "string") {
                res.status(401).json({
                    errors: [{
                        message: value,
                        extensions: {
                            code: "Funcs.logIn - Checking DB info"
                        }
                    }]
                }) 
            } else {
                res.cookie("access_token", value[0], {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24
                })
                res.cookie("refresh_token", value[1], {
                    httpOnly: true,
                    secure: true,
                    maxAge: 7000 * 60 * 60 * 24
                })
                res.status(200).send({
                    message: "Success Logging in",
                    data: {
                        access_token: value[0],
                        expires_in: 7000 * 60 * 60 * 24,
                        refresh_token: value[1]
                    }
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.status(401).json({
            errors: [{
                message: "Error al hacer Log In",
                extensions: {
                    code: "Funcs.logIn"
                }
            }]
        })
    }  
}
export const postLogOut = async (req: Request, res: Response) => {
    try {
        res.cookie("access_token", "", {maxAge: 0})
        res.cookie("refresh_token", "", {maxAge: 0})
        res.status(200).send({
            msg: "Signed Out"
        })
    } catch (error) {
        res.status(401).send({
            msg: error})
    }
}
export const getAuthenticate= async (req: Request, res: Response) => {
    try {
        const access_token= req.cookies["access_token"]
        const payload: any = verify(access_token, "access_secret")
        if(!payload) {
            return (res.status(401).send({
                message: "Unauthenticated"
            }))
        }
        const user= await Funcs.authUser(payload.id)
        user? res.status(200).send(user): res.status(401).send({
            msg: "Unauthenticated"
        })
    } catch (error) {
        return(res.status(401).send({
            msg: "Unauthenticated"
        }))
    }
}
export const refreshToken= async (req: Request, res: Response) => {
    try {
        const refresh_token= req.cookies["refresh_token"]
        const payload: any = verify(refresh_token, "refresh_secret")
        if(!payload) {
            return (res.status(401).send({
                message: "Unauthenticated"
            }))
        }
        let access_token= sign({
            id: payload.id
        },"access_secret", {expiresIn: "5m"});
        res.cookie("access_token", access_token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        })
        res.send({
            msg: "New Access Token was given"}
        )
    } catch (error) {
        return(res.status(401).send({
            msg: "Unauthenticated"
        }))
    }

}
export const postRegister = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        Funcs.createUser(data.name, data.lastname, data.mail, data.password, data.photo, data.faculty, data.city).then((value) => {
            console.log(value)
            if (typeof(value) == "string") {
                res.status(401).json({
                    msg: value,
                })
            } else {
                res.status(200).json({
                    msg: "Succesfully Created",
                });
            }
        })
    } catch (errors) {
        console.log(errors);
        res.status(401).json({
            error: errors,
            msg: "Error al hacer Register",
        })
    }  
}

//Images
export const getImage= async (req: Request, res: Response) => {
    try {
        const [files] = await Models.bucket.getFiles();
        res.send([files]);
        console.log("Success");
    } catch (error) {
        res.send("Error:" + error);
    }
}
export const uploadImage= async (req: Request, res: Response) => {
    try {
        var upload = Models.multer.fields([{name: 'image'}, {name: 'publication_id'}])
        upload(req, res, function (err) {
            if (err) {
              res.status(401).send({
                msg: "Could not upload image",
                body: err
              })
            } else {
                try {
                    if (req.files) {
                        const files= req.files as {[fieldname: string]: Express.Multer.File[]};
                        const img= files['image'][0];
                        let img_id= uuidv4()
                        let pub= req.body.publication_id
                        const blob = Models.bucket.file(`${req.body.publication_id+"/"+img_id}_post.jpg`);
                        const blobStream = blob.createWriteStream();
                        blobStream.end(img.buffer);
                        try {
                            Funcs.addImage2DB(req.body.publication_id, img_id)
                            res.status(200).send({
                                msg: "Everything went right!"
                        })
                        } catch (error) {
                            res.status(401).send({
                                msg: err
                        })
                        }
                        //createImg(req.file)
                        } else throw "error with img";
                } catch (error) {
                        res.status(401).send(error);
                }
            }
          })
    } catch (error) {
        res.send("Error:" + error);
    }
}