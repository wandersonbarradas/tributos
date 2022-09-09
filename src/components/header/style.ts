import styled from "styled-components";

type Props = {
    drop: boolean;
};

export const Container = styled.header<Props>`
    width: 100%;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 28px;
    position: relative;

    .header_user {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px 10px;

        span {
            text-transform: capitalize;
        }

        .header_icon {
            width: 28px;
            height: 28px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 8px;
        }

        .header_elipse_icon {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: solid 1px #c0c0c0;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
    }

    .header_login_area {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;

        .entrar {
            padding: 8px 12px;
            border-radius: 8px;
            color: #fff;
            background-color: transparent;
            border: solid 1px #f57c00;
            cursor: pointer;
            outline: none;
            background-color: transparent;
            font-weight: bold;
            text-decoration: none;

            &: hover {
                background-color: #f57c00;
            }
        }
    }

    .menu_drop {
        width: 140px;
        overflow: hidden;
        height: ${(props) => (props.drop ? "auto" : 0)};
        border-radius: 10px;
        background-color: #2c2c2e;
        position: absolute;
        top: 80px;
        right: 40px;
        transition: all 0.1s ease;

        ul,
        li {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        ul {
            padding: 10px 0;
        }

        li {
            padding: 5px 15px;
            cursor: pointer;

            &:hover {
                background-color: #3d3d3e;
            }
        }
    }
`;
