import styled from "styled-components";

type ContainerType = {
    active: string;
    modal: boolean;
};

export const Container = styled.div<ContainerType>`
    flex: 1;
    display: flex;
    flex-direction: column;
    .receita_title {
        display: flex;
        align-items: center;
        a {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #c0c0c0;
        }

        h1 {
            font-size: 36px;
            line-height: 42px;
            margin-left: 30px;
        }
    }

    .main_iptu {
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        flex: 1;

        .iptu_options {
            display: flex;
            justify-content: space-between;
            padding: 0 5px;

            @media (max-width: 550px) {
                flex-direction: column;
                gap: 20px;
            }
        }

        .btn_area {
            flex: 1;
            display: flex;
            justify-content: flex-end;

            button {
                width: 200px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 24px;
                font-weight: 600;
                font-size: 18px;
                transition: all 0.2s ease;
                cursor: pointer;
                background-color: #f57c00;
                color: #fff;
                border: 0;
                outline: 0;

                &:hover {
                    opacity: 0.8;
                }
            }
        }

        .options {
            flex: 1;
            height: 32px;
            background-color: #2c2c2e;
            border-radius: 24px;
            display: flex;
        }

        .option {
            flex: 1;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 24px;
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            transition: all 0.2s ease;
            cursor: pointer;
        }

        .option_terreno {
            background-color: ${(props) =>
                props.active === "terreno" ? "#00C853" : "transparent"};
        }
        .option_edificada {
            background-color: ${(props) =>
                props.active === "edificada" ? "#00C853" : "transparent"};
        }

        .iptu_calc_area {
            margin-top: 28px;
            background-color: #2c2c2e;
            border-radius: 10px;
            padding: 20px 0;
            flex: 1;

            .loading {
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

    .modalCal {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: ${(props) => (props.modal ? "1" : "0")};
        transition: all 0.5s ease;

        .content {
            background-color: #202124;
            width: 70%;
            height: auto;
            padding: 20px 0;
            border-radius: 15px;

            .header {
                display: flex;
                padding: 20px 30px;

                h2 {
                    flex: 1;
                    text-align: center;
                }

                span {
                    font-size: 25px;
                    cursor: pointer;
                }
            }

            .box-info {
                margin-bottom: 20px;
            }

            .tarja {
                width: 100%;
                text-align: center;
                background-color: #3c4043;
                border: 1px solid transparent;
                border-bottom-color: #5f6368;
                border-top-color: #5f6368;
                padding: 10px 0;
                font-weight: bold;
            }

            .content-info {
                margin-top: 10px;
            }

            .row {
                display: grid;
                padding: 0 10px;
            }

            .col div {
                margin-top: 5px;
                border: 1px solid #5f6368;
                padding: 5px;
                background-color: #5f6368;
                border-radius: 5px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }

            .rowImovel {
                grid-template-columns: repeat(5, 1fr);
                gap: 10px;
                width: 100%;
            }
            .rowGeral {
                grid-template-columns: repeat(6, 1fr);
                gap: 10px;
            }

            .content-info {
                display: flex;
                justify-content: space-between;
                .tableVenal {
                    width: 70%;
                    margin: 0;
                    padding: 0;

                    tr {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 10px;
                        padding: 0;
                    }

                    th {
                        padding: 0;

                        div {
                            width: 100%;
                        }
                    }
                }
                .tableResultIptu {
                    width: 30%;
                    margin: 0;
                    padding: 0 10px 0 0;

                    tr {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 10px;
                        padding: 0;
                    }

                    th {
                        padding: 0;

                        div {
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
`;
