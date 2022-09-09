import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 160px;
    background-color: #2c2c2e;
    border-radius: 20px;
    color: #00c853;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .receita_title {
        display: flex;
        align-items: center;
        padding: 15px 20px 0 20px;

        span {
            font-weight: 700;
            font-size: 20px;
            line-height: 24px;
            color: #ffffff;
            margin-left: 8px;
        }
    }

    .receita_icon {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .receita_button {
        width: 100%;
        height: 40px;
        text-decoration: none;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        background-color: transparent;
        padding: 0 20px;
        color: #00c853;
        text-align: end;
        font-weight: 500;
        font-size: 16px;
        line-height: 40px;
        cursor: pointer;
    }
`;
