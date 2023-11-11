import { Request, Response } from "express";
import * as Models from "../Back/Models";
import {v4 as uuidv4} from 'uuid';
import { sign, verify } from "jsonwebtoken";
import {File} from '@web-std/file';
import { Model, Op, Sequelize } from 'sequelize';

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
            let id: string= uuidv4()
            await Models.USR_MOD.create({
                USER_ID: id,
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
        return([id])
        }
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}
export async function updateUser(req: Request,  name?:string, lastname?:string, faculty?: string,city?: string) {
    try {
        let usuario: Model <any, any>= await isLoggedIn(req)
        console.log(usuario.getDataValue("USER_ID"))
        usuario.set({
            USER_NAME: name? name: usuario.getDataValue("USER_NAME"),
            USER_LASTNAME: lastname? lastname: usuario.getDataValue("USER_LASTNAME"),
            USER_FACULTY: faculty? faculty: usuario.getDataValue("USER_FACULTY"),
            USER_CITY: city? city : usuario.getDataValue("USER_CITY"),
        })
        usuario.save();
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
} 
export async function logIn(mail: string, password: string) {
    try {
        let usuario= await findUser(undefined, mail)
        if (usuario) {
            if (str2hsh(password) == usuario?.getDataValue("USER_PASSWORD")) {
                let tokens= await updateToken(usuario)
                return([tokens[0], tokens[1], await authUser(usuario.getDataValue("USER_ID"))])
            } else {
                return("Not the correct password")
            }
        } else {
            return("No user with that email")
        }
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}
export async function authUser(uuid: string) {
    try {
        const usuario= await Models.USR_MOD.findOne({
            where: {USER_ID: uuid},
            attributes: {
                exclude: 
                    ["USER_PASSWORD"]
            }
        })
        return usuario
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}
export async function isLoggedIn (req: Request) : Promise<any> {
    try { 
        const payload: any = verify(req.cookies["access_token"], "access_secret")
        const user: Model<any,any> | null= await authUser(payload.id)
        return(user)
    } catch (error) {
        console.log(error)
        return("User Unauthenticated")
    }
}
let updateToken= async function(user: Model <any,any>) {
    try {
        let access_token= sign({
            id: user.getDataValue("USER_ID")
        },"access_secret", {expiresIn: "15m"});

        let refresh_token= sign({
            id: user.getDataValue("USER_ID")
        },"refresh_secret", {expiresIn: "1w"});
        return([access_token, refresh_token])
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}
let findUser= async function(uuid?: string, mail?: string) {
    if(uuid) {
        let usuario= await Models.USR_MOD.findByPk(uuid)
        return usuario
    }
    let usuario= await Models.USR_MOD.findOne({where: {USER_MAIL: mail}})
    return usuario
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
        console.log(error)
        throw new Error(error);
    }
}
export async function updatePublication(req: Request, uuid: string, publication_title?:string, publication_description?:string, publication_price?: number, publication_quantity?: number) {
    try {
        let usuario: Model <any, any>= await isLoggedIn(req)
        if (usuario) {
            let publication= await findPublication(uuid)
            if (publication_price) {
                addDiscount(publication!, publication_price)
            }
            publication?.set({
                PUBLICATION_TITLE: publication_title? publication_title: publication.getDataValue("PUBLICATION_TITLE"),
                PUBLICATION_DESCRIPTION: publication_description? publication_description : publication.getDataValue("PUBLICATION_DESCRIPTION"),
                PUBLICATION_PRICE: publication_price? publication_price : publication.getDataValue("PUBLICATION_PRICE"),
                PUBLICATION_QUANTITY: publication_quantity? publication_quantity : publication.getDataValue("PUBLICATION_QUANTITY"),
            })
            publication?.save()
        }
        return("User is not logged In")
    } catch (error) {
        console.log(error)
        throw new Error(error)
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
        console.log(error)
        throw new Error(error)
    }
}
export async function searchPubs(offset?: number, limit?: number) {
    try {
        let pubs= await Models.PUB_MOD.findAll({
            limit: limit? limit: 3,
            offset: offset? offset: 0,
            order: [["PUBLICATION_DATE", "DESC"]],
        })
        return(pubs)
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
export async function checkDiscounted() {
    try {
        let discounted: any[] = []
        let pubs= await Models.PUB_MOD.findAll({
            where: {
                PUBLICATION_DISCOUNT: {
                [Op.ne] : null
            }
            },
            order: [["PUBLICATION_DATE", "DESC"]]
        })
        pubs.forEach((value) => {
            let price: number= value.getDataValue("PUBLICATION_PRICE")
            let reduc_price: number= value.getDataValue("DISCOUNT")
            let discount= 100-(price*100/(price+reduc_price))
            let data= `{"prev_price": "${price+reduc_price}", "price": "${price}", "discount": "${discount}"}`
            discounted.push([value, JSON.parse(data)])
        })
        return(discounted)
    } catch (error) {
        console.log(error)
        throw new Error(error) 
    }
}
export async function pubInfo(pub_id: string) {
    let publication= await Models.PUB_MOD.findByPk(pub_id)
    let images= await findImgswPub(pub_id)
    return `{"publication": "${publication}", "images": "${images}"}` 
} 
let findPublication= async function (uuid: string) {
    let publication= await Models.PUB_MOD.findByPk(uuid)
    return publication
}
let addDiscount= async function(pub: Model <any,any>, new_price: number) {
    let discount: number | null = pub.getDataValue("PUBLICATION_PRICE") - new_price
    if (discount<= 0) {
        discount= null
    }
    pub.set({
        PUBLICATION_DISCOUNT: discount
    })
    pub.save()
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
        console.log(error)
        throw new Error(error)
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
        console.log(error)
        throw new Error(error)
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
        console.log(error)
        throw new Error(error)
    }
}
export async function findCats() {
    const cats= await Models.CAT_MOD.findAll()
    return cats
}
let findCategoryID = async function (category: string) {
    try {
        let cat= await Models.CAT_MOD.findOne({
            where: {
                CATEGORY_NAME: category
            }
    })
    return (cat?.getDataValue("CATEGORY_ID"))
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

//Classes: IMAGES
let createImg= async function (img: Express.Multer.File) {
    let file = new Blob([img.buffer])  
    console.log(file.size)
    // Create new file so we can rename the file
    let blob = file?.slice(0, file.size, "image/jpeg");
    try {
        // Build the form data - You can add other input values to this i.e descriptions, make sure img is appended last
        let newFile = new File([blob as Blob], `${uuidv4()}_post.jpg`, { type: "image/jpeg" });
        let formData = new FormData();
        formData.append("imgfile", newFile);
        console.log(formData)
        fetch("http://localhost:3306/api/upload", {
        method: "POST",
        body: formData,
        })
        .then((res) => res.text()).then(loadPost)
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
    console.log("We are now here")
}
export async function addImage2DB (image_id: string, user?: string, uuid?: string,) {
    try {
        let path : string= `https://storage.googleapis.com/img-anunciate/${user}/${image_id}_post.jpg`
        user? path : path= `https://storage.googleapis.com/img-anunciate/${uuid}/${image_id}_post.jpg`
        await Models.IMG_MOD.create({
            IMAGE_ID: image_id,
            IMAGE_STR: path,
        })
        user? await Models.USR_MOD.findByPk(user).then((v) => {
            v?.set({
                USER_PHOTO: path,
            }).save()
        }) : 
        await Models.RPI_MOD.create({
            IMAGE_ID: image_id,
            PUBLICATION_ID: uuid,
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
    return
}
export function loadPost() {
    console.log("Here")
    fetch("http://localhost:3306/api/upload")
      .then((res) => res.json())
      .then((x) => {
        for (let y = 0; y < x[0].length; y++) {
          console.log("We here", x[0][y].id);
          const newimg = document.createElement("img");
          try {
            newimg.setAttribute(
                "src",
                "https://storage.googleapis.com/img-anunciate/" + x[0][y].id
              );
              newimg.setAttribute("width", "50");
              newimg.setAttribute("height", "50");
              document.getElementById("images")?.appendChild(newimg);
          } catch (error) {
            console.log(error)
            throw new Error(error)
          }
        }
      });
}
let findImagePath= async function (uuid: string) {
    let path= await Models.IMG_MOD.findByPk(uuid)
    return path!.getDataValue("IMAGE_STR")
}

//Classes: KEYWORDS
export async function createKeyword(keyword: string) {
    try {
        let key = await Models.KYW_MOD.build({
            KEYWORD_ID: uuidv4(),
            KEYWORD_WORD: keyword
            })
        key.save();
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
let findKeyID= async function (tags: Array<any>) {
    let res= await Models.KYW_MOD.findAll({
        where: {
            KEYWORD_WORD: {
                [Op.or] : tags
            },
        }
    })
    let y: any []= []
    for (let index = 0; index < res.length; index++) {
        let x= await res.at(index)!.getDataValue("KEYWORDS_ID")
        y.push(x)
    }
    if (!y[0]) {
        return null
    }
    return(y)
}

//Classes: REL_PUBSandIMGS
export async function findImgswPub(pub_id: string) {
    try {
        let PubswImgs= await Models.RPI_MOD.findAll({
            where: {
                PUBLICATION_ID: pub_id,
            }
        }).then(async (res) => {
            let y: any[] = []
            for (let i = 0; i < res.length; i++) {
            let x= await findImagePath(res.at(i)?.getDataValue("IMAGE_ID"))
            y.push(x)
            }
            return (y)
        }
        )
        return(PubswImgs)
    } catch (error) {
        console.log(error)
        throw new Error(error) 
    }
}

//Classes: REL_KEYandPUBS
export async function findPubswKeys(tags: Array<string>) {
    try {
        let tagIDs = await findKeyID(tags)
        if (!tagIDs) {
            return null
        }
        let PubswKeys: any[] = []
        await Models.RPK_MOD.findAll({
            where: {
                KEYWORDS_ID: {
                    [Op.in] : tagIDs
                }
            },
            group: ['PUBLICATION_ID'],
            having: Sequelize.literal('COUNT(DISTINCT KEYWORDS_ID) ='+tagIDs.length.toString()),
        }).then(async (res) => {
            for (let i = 0; i < res.length; i++) {
                let x= await res.at(i)?.getDataValue("PUBLICATION_ID")
                PubswKeys.push(x)
            }
        }
        )
        if (!PubswKeys[0]) {
            return null
        }
        return(PubswKeys)
    } catch (error) {
        console.log(error)
        throw new Error(error) 
    }  
}

//Classes: REL_PUBandCAT
export async function findPubswCats(category: string) {
    try {
        let pubs: Array<any>= []
        let catID: string= await findCategoryID(category)
        let pubIDs= await Models.RPC_MOD.findAll({
            where: {
                CATEGORY_ID: catID
            }
        })
        pubIDs.forEach(element => {
            pubs.push(findPublication(element.getDataValue("PUBLICATION_ID")))
        });
        return(pubs)
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}