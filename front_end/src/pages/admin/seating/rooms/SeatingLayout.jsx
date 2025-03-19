import { Grid, Paper, styled } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { getOjectById } from '../../../../utils/FunctionConvert';
import { ContextTypeChairs } from '../../../../context/TypeChairsProvider';
import { chairDefault } from '../../../../utils/Containts';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

function SeatingLayout({ row }) {
    const [grid, setGrid] = useState([]);
    const { typeChairs } = useContext(ContextTypeChairs);
    useEffect(() => {
        generateGrid();
    }, [row]);
    const generateGrid = () => {
        const rows = parseInt(row.rows);
        const cols = parseInt(row.cols);
        setGrid(Array.from({ length: rows }, () => Array(cols).fill("")));
    };

    const showImgChair = (rowd, col) => {
        const result = row.list_chair.find(e => e.row == rowd & e.col == col);

        return result?.id_type_chair ? getOjectById(typeChairs, result?.id_type_chair)?.imgUrl : false;
    }
    return (
        <Grid item>
            <Item sx={{ display: "flex" }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${row.cols},1fr)`,
                    gap: '3px'
                }}>
                    {row.cols &&
                        grid.flat().map((element, index) => {
                            const rowIndex = Math.floor(index / row.cols);
                            const colIndex = index % row.cols;
                            const key = `${rowIndex}-${colIndex}`;

                            return (
                                <div key={key} className="relative">
                                    <img
                                        className={`w-3 h-3 cursor-pointer ${showImgChair(rowIndex, colIndex) ? "" : "opacity-0"}` }
                                        src={showImgChair(rowIndex, colIndex)}
                                        alt={`Chair ${key}`}
                                    />
                                </div>
                            );
                        })}
                </div>
            </Item>
        </Grid>

    );
}

export default SeatingLayout;