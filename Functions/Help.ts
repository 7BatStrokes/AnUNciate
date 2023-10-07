function Help(str: String) {
    let list_of_Funcs= ["str2hsh"]

    if (str== "all") {
        return(console.log(list_of_Funcs))
    } else if (str== "str2hsh") {
        return(console.log("Turns String into Hash"))
    } else if ("updateUser"){
        console.log("Updates User info, if piece of info is not being updated you can write is a undefined, ex: func(x,y,undefined,z)")

    } else if ("createPublication"){
        console.log("Creates Publication")

    } else if ("updatePublication"){
        console.log("Updates Pub info, if piece of info is not being updated you can write is a undefined, ex: func(x,y,undefined,z")
    } else if ("closePublication"){
        console.log("Will change Pub state to 0 or INACTIVE")
    }
}

export default Help;