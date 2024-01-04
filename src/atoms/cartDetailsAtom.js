import { atom } from "recoil";

const cartAtom = atom({
    key : "this is a cart atom",
    default : {items : 0 , price : 0},
})

export default cartAtom;