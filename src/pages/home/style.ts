import styled from "styled-components";

export const Container = styled.div`
    h1 {
        font-size: 36px;
        line-height: 42px;
    }

    .inicio_main {
        margin-top: 50px;
        display: flex;
        align-items: center;
        padding: 0 30px;

        @media (max-width: 570px) {
            flex-direction: column;
            gap: 40px;
        }
    }

    .inicio_info {
        flex: 1;

        h2 {
            font-size: 32px;
            line-height: 38px;
            margin-bottom: 20px;
            span {
                color: #f57c00;
            }
        }

        p {
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 40px;
        }

        a {
            font-family: "Maven Pro", sans-serif;
            font-size: 16px;
            background-color: #f57c00;
            border-radius: 10px;
            padding: 15px 26px;
            color: #ffffff;
            cursor: pointer;
            opacity: 1;
            text-decoration: none;

            &:hover {
                opacity: 0.8;
            }
        }

        @media (max-width: 720px) {
            h2 {
                font-size: 25px;
                line-height: 28px;
            }

            p {
                font-size: 14px;
                line-height: 19px;
            }

            a {
                font-size: 14px;
            }
        }
    }

    .inicio_image {
        flex: 1;
        text-align: center;

        img {
            max-width: 400px;
        }
    }
`;
