import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import {
    getFirestore,
    collection,
    getDocs,
    setDoc,
    doc,
    query,
    addDoc,
    updateDoc,
    getDoc,
} from "firebase/firestore/lite";
import { TerrenoType } from "./types/terreno";
import { SetoresType } from "./types/setores";
import { AliquotasType } from "./types/aliquotas";
import { CadIptuType } from "./types/cadIptu";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import Cookies from "js-cookie";
export type AddUserType = {
    id: string;
    name: string;
    email: string;
    token: string;
    cadIptu?: string;
    cargo: string;
};

type dataType = {
    cadIptu: CadIptuType;
    user: string[];
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const isLogged = () => {
    let token = Cookies.get("token");
    return token;
};

export const doLogin = (token: string) => {
    Cookies.set("token", token, { expires: 999 });
};

export const doLogout = () => {
    Cookies.remove("token");
};

const apiFunction = {
    CadastrarAuth: async (email: string, password: string, name: string) => {
        let userCadstrado = {};
        let terreno: TerrenoType[] = [];
        let edificada: TerrenoType[] = [];
        let setores: SetoresType[] = [];
        let aliquotas: AliquotasType[] = [];
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const newUser = userCredential.user;
            const user = {
                id: newUser.uid,
                name: name,
                email: email,
                tipo: "padrao",
                token: (Math.random() + newUser.uid).toString(),
                cargo: "user",
            };
            const terrenoreq = (await apiFunction.getData(
                "terreno",
            )) as TerrenoType[];
            terrenoreq.forEach((item) => {
                terreno.push(item);
            });
            const edificadareq = (await apiFunction.getData(
                "edificada",
            )) as TerrenoType[];
            edificadareq.forEach((item) => {
                edificada.push(item);
            });
            const setoresreq = (await apiFunction.getData(
                "setores",
            )) as SetoresType[];
            setoresreq.forEach((item) => {
                setores.push(item);
            });
            const aliquotasreq = (await apiFunction.getData(
                "aliquotas",
            )) as AliquotasType[];
            aliquotasreq.forEach((item) => {
                aliquotas.push(item);
            });
            let cadIptu: CadIptuType = {
                terreno,
                edificada,
                setores: setores[0].setores,
                aliquotas: aliquotas[0],
            };
            await apiFunction.addUser(user);
            await apiFunction.addCadIptu(cadIptu, user);
            userCadstrado = await apiFunction.getLogin(email, password);
        } catch (error: any) {
            return error?.message;
        }
        return userCadstrado;
    },

    addUser: async (u: AddUserType) => {
        await setDoc(
            doc(db, "users", u.id),
            {
                name: u.name,
                email: u.email,
                token: u.token,
                cargo: u.cargo,
            },
            { merge: true },
        );
    },

    getLogin: async (email: string, password: string) => {
        let userLogado: AddUserType;
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const ref = doc(db, "users", userCredential.user.uid);
            const user = await getDoc(ref);
            const dados = user.data() as AddUserType;
            if (dados) {
                dados.id = userCredential.user.uid;
                userLogado = dados;
                return userLogado;
            }
        } catch (error: any) {
            return error?.message;
        }
    },

    getDocUser: async (collectionData: string, idDoc: string) => {
        let cad: CadIptuType | null = null;
        const ref = doc(db, collectionData, idDoc);
        const docRef = await getDoc(ref);
        const dados = docRef.data() as dataType;
        cad = dados.cadIptu;
        return cad;
    },

    getToken: async (token: string) => {
        let userLogado = {} as AddUserType;
        const q = query(collection(db, "users"));
        const results = await getDocs(q);
        results.forEach((doc) => {
            let data = doc.data();
            if (data.token === token) {
                userLogado = {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    token: data.token,
                    cadIptu: data.cadIptu,
                    cargo: data.cargo,
                };
            }
        });
        return userLogado;
    },

    getData: async (collectionData: string) => {
        const dataCol = collection(db, collectionData);
        const dataSnapshot = await getDocs(dataCol);
        const dataList = dataSnapshot.docs.map((doc) => doc.data());
        return dataList;
    },
    getReceitas: async () => {
        const receitasCol = collection(db, "receitas");
        const receitaSnapshot = await getDocs(receitasCol);
        const receitasList = receitaSnapshot.docs.map((doc) => doc.data());
        return receitasList;
    },
    addCadIptu: async (cadIptu: CadIptuType, user: AddUserType) => {
        let newDoc = await addDoc(collection(db, "iptus"), {
            cadIptu,
            user: [user.id],
        });
        await updateDoc(doc(db, "users", user.id), {
            cadIptu: newDoc.id,
        });
    },
};

export default apiFunction;
