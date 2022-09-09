import styled from "styled-components";

type Props = {
    error: boolean;
};

export const Container = styled.div<Props>`
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    overflow: hidden;
    transition: all 0.3s ease;
    background-color: #1c1c1e;

    .container {
        height: 100vh;
        max-height: 100vh;
        padding: 0 15px;
        width: 100%;
        max-width: 1140px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;

        .leftSide {
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;

            a {
                text-decoration: none;
                color: #b3b3b3;
                font-size: 10px;
                text-align: start;
            }

            img {
                width: 80%;
                border-radius: 50px;
            }
        }

        .rightSide {
            flex: 1;
        }
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
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
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
