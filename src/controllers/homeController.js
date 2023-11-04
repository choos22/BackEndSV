import userService from "../services/userService"


const handleHome = (req, res) => {
    return res.render("home.ejs")
}

const handleCreateNewUser = (req, res) => {
    // console.log(req.body)
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    
   userService.createNewUser(email,password,username)

    return res.redirect("/users")
}

const handleUserPage = async(req, res) => {
    let userLisst = await userService.getUserList()
    await userService.getDeleteUser(8)
    // console.log(userLisst);
    return res.render("home.ejs" , {userLisst})

}

const handleDeleteUser = async(req, res) => {
    // console.log(">>>check dele", req.params.id);

    await userService.getDeleteUser(req.params.id)
    return res.redirect("/users")

}

const handleUpdateUser = async(req, res) => {
    //lấy email từ input có thuộc tính name="email"
    //req.body vì đang thao tác với form
    let email= req.body.email;
    let username = req.body.username
    let id = req.body.id

    await userService.updateUserInfor(email,username, id)
    return res.redirect("/users")

}

const getUpdateUser = async (req, res) => {
    let id = req.params.id
    let user = await userService.getUserByid(id)
    let userData = {}
        userData = user


    // if(user && user.length >0) {
    //     userData = user[0]
    //     console.log(userData);
    // }
    // console.log("check user",user );
    return res.render("user-update.ejs", {userData})

}


module.exports = {
    handleHome,
    handleCreateNewUser,
    handleUserPage,
    handleDeleteUser,
    getUpdateUser,
    handleUpdateUser
}