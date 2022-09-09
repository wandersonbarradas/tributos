import styled from "styled-components";

type ContainerType = {
    toggle: boolean;
};

export const Container = styled.aside<ContainerType>`
    height: 100vh;
    
    width: ${(props) => (props.toggle ? "260px" : "98px")};
    transition: width 320ms ease-in-out 0s;
    overflow: visible;
    position: relative;

    &:hover .toogle-aside {
        opacity: 1;
    }
    
    .toogle-aside{
        position: absolute;
        right: -12px;
        top: 85px;
        z-index: 2;
        box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
        background-color: rgb(44, 44, 46);
        transition: all 250ms ease-in-out 0s;
        visibility: visible;
        overflow: visible;
        opacity: 1;
        outline: none;
        border: 0;
        color: #FFF;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        transform: rotate(${(props) => (props.toggle ? "180deg" : "0deg")});
        z-index: 9;
        opacity: ${(props) => (props.toggle ? 0 : 1)};

        svg {
            font-size: 13px;
        }
    }
    .aside {
        background-color: #2c2c2e;
        transition: width 320ms ease-in-out 0s;
        width: ${(props) => (props.toggle ? "260px" : "98px")};
        height: 100vh;
        border-right: 1px solid rgba(255, 255, 255, 7%);
        position: fixed;
        overflow: hidden;
        overflow-y: auto;
    }

    .aside::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    .aside::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 5px;
    }

    .aside__logo {
        width: auto;
        height: 67px;
        padding: ${(props) => (props.toggle ? "18px 0 0 13px" : "18px 0 0 0")};
        font-size: 28px;
        line-height: 38px;
        font-family: "Alfa Slab One", cursive;

        span {
            display: block;
            font-size: 11px;
            margin-left: 63px;
            line-height: 1;
            font-family: "Gentium Basic", serif;
        }

        .logo_menu {
            font-family: "Alfa Slab One", cursive;
            text-align: center;
            font-size: 52px;
            margin: 0;
        }
    }
     .aside__nav {
        ul {
            margin-top: 100px;
        }
        a {
            color: #c0c0c0;
            display: flex;
            align-items: center;
            text-decoration: none;
            font-size: 16px;
            transition: all ease .3s;

            &:hover {
                background-color: #3D3D3E;
            }
        }

        .aside_nav_icon {
            min-width: 98px;
            height: 56px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
`;
