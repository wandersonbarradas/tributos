import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .bar {
        display: inline-block;
        width: 3px;
        height: 20px;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 10px;
        animation: scale-up4 1s linear infinite;
    }

    .bar:nth-child(2) {
        height: 35px;
        margin: 0 5px;
        animation-delay: 0.25s;
    }

    .bar:nth-child(3) {
        animation-delay: 0.5s;
    }

    @keyframes scale-up4 {
        20% {
            background-color: #ffff;
            transform: scaleY(1.5);
        }

        40% {
            transform: scaleY(1);
        }
    }
`;
