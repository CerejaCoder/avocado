import {configTheme, loadImgProfile, exit, configureSidebarLeft, configureNavigate, loadProfile, loadButtonsProfiles, getUser} from "../../utils/utils.js";
import {listUsers} from "../../controllers/user.js";

async function loadPage(){
    configTheme();
    loadImgProfile();
    exit();
    configureSidebarLeft();
    configureNavigate();

    const users = await listUsers();

    loadProfile(getUser(users.users));
    loadButtonsProfiles();
}

loadPage();