import styled from "styled-components";

export const Container = styled.div`
    h1 {
        font-size: 36px;
        line-height: 42px;
    }

    .main_receitas {
        width: 100%;
        margin: 50px 0 0 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        align-items: center;
        gap: 20px;
        flex-wrap: wrap;

        @media (max-width: 1120px) {
            grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 700px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 450px) {
            grid-template-columns: repeat(1, 1fr);
        }

        li {
            margin: 0;
            padding: 0;
            list-style: none;
        }
    }

    .main_receita {
        width: 23%;
        height: 160px;
        background-color: #2c2c2e;
        border-radius: 20px;
        color: #00c853;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

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

    .loading {
        width: 100%;
        height: 100%;
        margin: 50px 0 0 0;
        display: flex;
        align-items: center;
    }
`;
