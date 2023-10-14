import * as Models from "../Back/Models";
import {v4 as uuidv4} from 'uuid';
import { sign } from "jsonwebtoken";

//String Handling
export function str2hsh(str: string): string {
    let hash = 0;
    if (str.length == 0) return hash.toString();
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }     
    return hash.toString();
}

//Classes: USER
export async function createUser(name:string, lastname:string, mail:string, password: string, photo: string, faculty: string, city: string) {
    try {
        let usuario= await findUser(undefined, mail)
        if (usuario) {
            return("User with that email already exists")
        } else {
            await Models.USR_MOD.create({
                USER_ID: uuidv4(),
                USER_NAME: name,
                USER_LASTNAME: lastname,
                USER_MAIL: mail,
                USER_PASSWORD: str2hsh(password),
                USER_PHOTO: photo,
                USER_FACULTY: faculty,
                USER_CITY: city,
                USER_CALIFICATION: 0,
                USER_CALIFICATORS: 0 ,
                USER_TOKEN: "0",
                USER_SINCE: Date.now()
        })
        }
    } catch (error) {
        return(error);
    }
}
export async function updateUser(uuid: string, password: string, name?:string, lastname?:string, photo?: string, faculty?: string,city?: string) {
    try {
        let usuario= await findUser(uuid)
        if (str2hsh(password) == usuario?.getDataValue("USER_PASSWORD")) {
            console.log(name, faculty)
            usuario.set({
                USER_NAME: name? name: usuario.getDataValue("USER_NAME"),
                USER_LASTNAME: lastname? lastname: usuario.getDataValue("USER_LASTNAME"), 
                USER_PASSWORD: str2hsh(password),
                USER_PHOTO: photo? photo: usuario.getDataValue("USER_PHOTO"),
                USER_FACULTY: faculty? faculty: usuario.getDataValue("USER_FACULTY"),
                USER_CITY: city? city : usuario.getDataValue("USER_CITY"),
            })
            usuario.save();
        }
    } catch (error) {
        console.log(error);
    }
} 
export async function logIn(mail: string, password: string) {
    try {
        let usuario= await findUser(undefined, mail)
        if (usuario) {
            if (str2hsh(password) == usuario?.getDataValue("USER_PASSWORD")) {
                let access_token= sign({
                    id: usuario.getDataValue("USER_ID")
                },"access_secret", {expiresIn: "5m"});
                let refresh_token= sign({
                    id: usuario.getDataValue("USER_ID")
                },"refresh_secret", {expiresIn: "1w"});
                return([access_token, refresh_token])
            } else {
                return("Not the correct password")
            }
        } else {
            return("No user with that email")
        }
    } catch (error) {
        return(error);
    }
}
export async function authUser(uuid: string) {
    try {
        if(uuid) {
            const usuario= await Models.USR_MOD.findOne({
                where: {USER_ID: uuid},
                attributes: {
                    exclude: 
                        ["USER_PASSWORD"]
                }
            })
            return usuario}
    } catch (error) {
        return(error);
    }
}
let findUser= async function(uuid?: string, mail?: string) {
    if(uuid) {
        const usuario= await Models.USR_MOD.findByPk(uuid)
        return usuario
    } else if (mail) {
        const usuario= await Models.USR_MOD.findOne({where: {USER_MAIL: mail}})
        return usuario
    }
}

//Classes: PUBLICATION
export async function createPublication(user_id:string, publication_title:string, publication_description:string, publication_price: number, publication_state: number, publication_quantity: number) {
    try {
        let publication = await Models.PUB_MOD.build({
            PUBLICATION_ID: uuidv4(),
            USER_ID: user_id,
            PUBLICATION_TITLE: publication_title,
            PUBLICATION_DESCRIPTION: publication_description,
            PUBLICATION_PRICE: publication_price,
            PUBLICATION_DATE: new Date().getTime(),
            PUBLICATION_STATE: publication_state,
            PUBLICATION_QUANTITY: publication_quantity,
            })
        publication.save();
    } catch (error) {
        return(error);
    }
}

export async function updatePublication(uuid: string, publication_title:string, publication_description:string, publication_price: number, publication_quantity: number) {
    try {
        let publication= await findPublication(uuid)
        publication?.set({
            PUBLICATION_TITLE: publication_title? publication_title: publication.getDataValue("PUBLICATION_TITLE"),
            PUBLICATION_DESCRIPTION: publication_description? publication_description : publication.getDataValue("PUBLICATION_DESCRIPTION"),
            PUBLICATION_PRICE: publication_price? publication_price : publication.getDataValue("PUBLICATION_PRICE"),
            PUBLICATION_QUANTITY: publication_quantity? publication_quantity : publication.getDataValue("PUBLICATION_QUANTITY"),
        })
        publication?.save()
    } catch (error) {
        console.log(error);
    }
}

export async function closePublication(uuid: string, state: number) {
    try {
        let publication= await findUser(uuid)
        publication?.set({
            PUBLICATION_STATE: state
        })
        publication?.save();     
    } catch (error) {
        console.log(error);
    }
}

let findPublication= async function(uuid: string) {
    const publication= await Models.PUB_MOD.findByPk(uuid)
    return publication
}

//Classes: COMMENTS
export async function createComment(publication_id: string, user_id: string, comment_text: string, comment_date: Date) {
    try {
        let comment = await Models.COM_MOD.build({
            COMMENT_ID: uuidv4(),
            PUBLICATION_ID: publication_id,
            USER_ID: user_id,
            COMMENT_TEXT: comment_text,
            COMMENT_DATE: Date.now(),
            })
        comment.save();
    } catch (error) {
        console.log(error);
    }
}

export async function findComments(publication_id: string) {
    const comments= await Models.COM_MOD.findAll({
        where: {
            PUBLICATION_ID: publication_id,
        }
    })
    return comments.sort()
}

//Classes: CHATS
export async function sendChatMessage(publication_id: string, user_1: string, user_2: string, chats_sender: string, chats_message: string, chats_date: Date) {
    try {
        let chat = await Models.CHT_MOD.build({
            PUBLICATION_ID: publication_id,
            USER_1: user_1,
            USER_2: user_2,
            CHATS_SENDER: chats_sender,
            CHATS_MESSAGE: chats_message,
            CHATS_DATE: new Date().getTime(),
            })
        chat.save();
    } catch (error) {
        console.log(error);
    }
}

export async function findChats(publication_id: string, user_1: string, user_2: string) {
    const chats= await Models.CHT_MOD.findAll({
        where: {
            PUBLICATION_ID: publication_id,
            USER_1: user_1||user_2,
            USER_2: user_1||user_2,
        }
    })
    return chats.sort()
}

//Classes: CATEGORY
export async function createCategory(category_name: string, category_description: string) {
    try {
        let category = await Models.CAT_MOD.build({
            CATEGORY_ID: uuidv4(),
            CATEGORY_NAME: category_name,
            CATEGORY_DESCRIPTION: category_description
            })
        category.save();
    } catch (error) {
        console.log(error);
    }
}