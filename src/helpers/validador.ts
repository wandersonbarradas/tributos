import { ValidateType } from "../pages/login/login";

export const Validate = (error: string) => {
    switch (error) {
        case "Firebase: Error (auth/invalid-email).":
            return "Email invalido!";
        case "Firebase: Error (auth/wrong-password).":
            return "Senha incorreta!";
        case "Firebase: Error (auth/user-not-found).":
            return "Usuário não encontrado!";
        case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
            return "Muitas tentativas, tente novamente mais tarde!";
        case "Firebase: Error (auth/email-already-in-use).":
            return "Email já cadastrado, faça login!";
        default:
            return "Erro desconhecido";
    }
};

export const ValidateEmail = (email: string): ValidateType => {
    let regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === "") {
        return {
            status: false,
            message: "Campo email não pode ser vazio",
        };
    } else if (!regex.test(email)) {
        return {
            status: false,
            message: "E-mail digitado não é válido!",
        };
    }

    return { status: true, message: "" };
};

export const ValidatePassword = (password: string): ValidateType => {
    if (password.length < 6) {
        return {
            status: false,
            message: "Campo senha tem que ter pelo menos 6 caracteres",
        };
    }
    return { status: true, message: "" };
};

export const ValidateName = (name: string): ValidateType => {
    if (name.length < 2) {
        return {
            status: false,
            message: "Campo nome tem que ter pelo menos 2 caracteres",
        };
    }
    return { status: true, message: "" };
};

export const Validador = {
    verificar: (tableElement: HTMLTableElement) => {
        let inputs = tableElement.querySelectorAll(
            "input, select",
        ) as NodeListOf<HTMLInputElement | HTMLSelectElement>;
        Validador.limparError(inputs, tableElement);
        let send = true;
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = Validador.checagem(input);
            if (check !== true) {
                Validador.error(input, check);
                send = false;
            }
        }
        return send;
    },
    checagem: (input: HTMLInputElement | HTMLSelectElement) => {
        let rules = input.getAttribute("data-rules");
        if (rules !== null) {
            let rule = rules.split("|");
            for (let r = 0; r < rule.length; r++) {
                let rule2 = rule[r].split("=");
                switch (rule2[0]) {
                    case "required":
                        if (input.value === "") {
                            return "Campo não pode ser vazio.";
                        }
                        break;
                    case "min":
                        if (input.value.length < Number(rule2[1])) {
                            return `Campo tem que ter no mínimo ${rule2[1]} caracteres.`;
                        }
                        break;
                    case "select":
                        if (input.value === "Selecione") {
                            return "Campo tem que ser selecinado.";
                        }
                        break;
                }
            }
        }
        return true;
    },

    error: (input: HTMLInputElement | HTMLSelectElement, erro: string) => {
        input.style.borderColor = "#e74c3c";

        let divErro = document.createElement("div");
        divErro.classList.add("erro");
        divErro.innerHTML = `${erro}`;
        input.parentElement?.insertBefore(divErro, input.nextSibling);
    },

    limparError: (
        element: NodeListOf<HTMLInputElement | HTMLSelectElement>,
        formElement: HTMLTableElement,
    ) => {
        let inputs = element;
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i] as HTMLInputElement | HTMLSelectElement;
            input.style.borderColor = "";
        }
        let erro = formElement.querySelectorAll(".erro");
        for (let i = 0; i < erro.length; i++) {
            erro[i].remove();
        }
    },
    fechar: (e: HTMLDivElement) => {
        let item = e.parentElement;
        item?.remove();
    },
};
