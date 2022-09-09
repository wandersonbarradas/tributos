import styled from "styled-components";

type Props = {
    value: string;
};

export const Container = styled.div<Props>`
    position: relative;
    padding: 15px;
    background-color: transparent;
    border-bottom: 1px solid #e6edf1;

    input {
        padding: 0;
        text-align: start;
        width: 100%;
        height: 44px;
        font-size: 20px;
        color: #fff;
        border: none;
        outline: none;
        background-color: transparent;
    }

    label {
        position: absolute;
        top: ${(props) => (props.value != "" ? "-10px" : "20px")};
        left: 15px;
        padding: 10px 0;
        font-size: ${(props) => (props.value != "" ? "14px" : "16px")};
        color: ${(props) => (props.value != "" ? "#009d87" : "#b3b3b3")};
        pointer-events: none;
        transition: 0.5s;
    }

    input:focus ~ label,
    label:valid ~ label {
        top: -10px;
        color: #009d87;
        font-size: 14px;
    }
`;
