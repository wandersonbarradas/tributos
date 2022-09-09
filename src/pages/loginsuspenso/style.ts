import { PropaneSharp } from "@mui/icons-material";
import styled from "styled-components";

type ContainerProps = {
    error: boolean;
};

export const Container = styled.div<ContainerProps>`
    width: 100%;
    height: 100vh;
    position: absolute;
    z-index: 10;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
    transition: all 0.5s ease;

    .login_close {
        position: fixed;
        top: 40px;
        right: 100px;
        z-index: 20;
        padding: 10px;
        text-align: end;
        cursor: pointer;
    }

    .cardMain {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 45%;
        height: 450px;
        backdrop-filter: blur(5px) saturate(193%);
        background-color: rgba(17, 25, 40, 0.79);
        border-radius: 12px;
        border: 1px solid rgba(209, 213, 219, 0.3);
        position: relative;
        overflow: hidden;
    }

    /* From uiverse.io by @alexruix */
    .card {
        width: 60%;
        padding: 1.9rem 1.2rem;
        text-align: center;
        background: #2a2b38;
        border-radius: 10px;
    }

    /*Inputs*/
    .field {
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        background-color: #1f2029;
        border-radius: 4px;
        padding: 0.5em 1em;
    }

    .input-icon {
        height: 1em;
        width: 1em;
        fill: #ffeba7;
    }

    .input-field {
        background: none;
        border: none;
        outline: none;
        width: 100%;
        color: #d3d3d3;
    }

    /*Text*/
    .title {
        margin-bottom: 1rem;
        font-size: 1.5em;
        font-weight: 500;
        color: #f5f5f5;
    }

    /*Buttons*/
    .btn {
        margin: 1rem;
        border: none;
        border-radius: 4px;
        font-weight: bold;
        font-size: 0.8em;
        text-transform: uppercase;
        padding: 0.6em 1.2em;
        background-color: #ffeba7;
        color: #5e6681;
        box-shadow: 0 8px 24px 0 rgb(255 235 167 / 20%);
        transition: all 0.3s ease-in-out;
    }

    .btn-link {
        color: #f5f5f5;
        display: block;
        font-size: 0.75em;
        background-color: transparent;
        transition: color 0.3s ease-out;
        outline: none;
        border: none;
    }

    /*Hover & focus*/
    .field input:focus::placeholder {
        opacity: 0;
        transition: opacity 0.3s;
    }

    .btn:hover {
        background-color: #5e6681;
        color: #ffeba7;
        box-shadow: 0 8px 24px 0 rgb(16 39 112 / 20%);
    }

    .btn-link:hover {
        color: #ffeba7;
    }

    .auth_error {
        position: absolute;
        width: 100%;
        top: ${(props) => (props.error ? "0" : "-50px")};
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all ease 0.5s;

        .error_content {
            text-align: center;
            background-color: #e74c3c;
            border-radius: 5px;
            width: 50%;
            padding: 16px 10px;
            position: relative;

            span {
                position: absolute;
                top: -3px;
                right: 10px;
                padding: 5px;
                cursor: pointer;
            }
        }
    }
`;
