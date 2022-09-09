import styled from "styled-components";

export const Table = styled.table`
    width: 100%;
    font-size: 14px;
    th {
        color: #fff;
    }

    tr {
        border-bottom: 1px solid rgba(81, 81, 81, 1);
    }

    thead {
        background-color: #3a3a3c;
        min-width: 100% !important;
        display: flex;

        tr {
            width: 100%;
            display: flex;

            @media (max-width: 650px) {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
            }
        }
        th {
            padding: 10px;
            flex: 1;
            font-weight: 500;
        }
    }

    tbody {
        tr {
            display: flex;
            height: 58px;
            transition: all ease 0.3s;

            &:hover {
                background-color: #3a3a3c;
            }

            @media (max-width: 650px) {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                height: 80px;
            }
        }
    }
`;
