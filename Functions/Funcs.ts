import * as Models from "../Back/Models";
import {v4 as uuidv4} from 'uuid';

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
export async function createUser(name:string, lastname:string, mail:string, password: string, photo: string, faculty: string,city: string) {
    try {
        let usuario = await Models.USR_MOD.findOrCreate({
            where: { USER_MAIL: mail},
            defaults: {
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
            }
        })
    } catch (error) {
        console.log(error);
    }
} // createUser("David", "Garcia", "davidgar@outlook.com", "12345678", "none", "Ingenieria", "Bogota")

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
} //updateUser("e67a6b85-ce46-49ef-a8da-57a2bb3ff1e2", "I-am-the-Knight08", "Bruno", "Diaz", undefined, undefined, "Palmira")

let findUser= async function(uuid?: string, mail?: string) {
    if(uuid) {
        const usuario= await Models.USR_MOD.findByPk(uuid)
        return usuario
    } else if (mail) {
        const usuario= await Models.USR_MOD.findOne({where: {USER_MAIL: mail}})
        return usuario
    }
}

//Classe: PUBLICATION
export async function createPublication(user_id:string, publication_title:string, publication_description:string, publication_price: number, publication_date: Date, publication_state: boolean,publication_quantity: number) {
    try {
        let usuario = await Models.PUB_MOD.build({
            PUBLICATION_ID: uuidv4(),
            USER_ID: user_id,
            PUBLICATION_TITLE: publication_title,
            PUBLICATION_DESCRIPTION: publication_description,
            PUBLICATION_PRICE: publication_price,
            PUBLICATION_DATE: Date.now(),
            PUBLICATION_STATE: publication_state,
            PUBLICATION_QUANTITY: publication_quantity,
            })
        usuario.save();
    } catch (error) {
        console.log(error);
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