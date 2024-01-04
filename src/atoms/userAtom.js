import { atom } from "recoil";

const userAtom = atom({
    key : "this is a user atom",
    default : localStorage.getItem('user'),
})

export default userAtom;