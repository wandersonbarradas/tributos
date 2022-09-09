export const formatNumber = (num: string) => {
    let numString = numberCarac(num);
    let arrNum = numString.split("").reverse();
    let numberFormat = "";
    for (let i = 0; i < arrNum.length; i++) {
        switch (i) {
            case 2:
                numberFormat += `,${arrNum[i]}`;
                break;
            case 5:
                numberFormat += `.${arrNum[i]}`;
                break;
            case 8:
                numberFormat += `.${arrNum[i]}`;
                break;
            case 11:
                numberFormat += `.${arrNum[i]}`;
                break;
            case 14:
                numberFormat += `.${arrNum[i]}`;
                break;
            default:
                numberFormat += arrNum[i];
                break;
        }
    }
    arrNum = numberFormat.split("").reverse();
    return arrNum.join("");
};

const numberCarac = (num: string) => {
    let newNumber = "";
    for (let i = 0; i < num.length; i++) {
        if (num[i] !== "," && num[i] !== ".") {
            newNumber += num[i];
        }
    }
    return newNumber;
};
