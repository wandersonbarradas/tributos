import styled from "styled-components";

export const Container = styled.div`
    max-width: 380px;
    margin: 0 auto;

    h3 {
        font-size: 28px;
        color: #fff;
        margin: 0 0 8px 0;
        font-weight: 500;
    }

    p {
        color: #b3b3b3;
        font-weight: 300;
        margin: 0 0 24px 0;
    }

    .login-box {
        width: 100%;
        box-sizing: border-box;
        border-radius: 10px;
        padding: 20px 10px;
        background-color: #2c2c2e;
    }

    .boxUserInput {
        border-radius: 7px;
        background-color: transparent;
    }

    .box-buttom {
        width: 100%;
        text-align: center;
    }

    .submit {
        font-size: 16px;
        padding: 12px 24px;
        background-color: #009d87;
        outline: none;
        border: none;
        width: 100%;
        height: 54px;
        margin: 10px auto;
        border-radius: 5px;
        text-align: center;
        color: #fff;
        transition: all 0.3s ease;

        &:hover {
            background-color: #4ad295;
        }
    }

    .novoCadastro {
        font-size: 14px;
        margin: 0 !important;

        span {
            color: #009d87;
            cursor: pointer;
        }
    }
`;
