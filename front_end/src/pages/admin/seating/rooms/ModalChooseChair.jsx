import React, { useContext, useState } from 'react';
import { ContextTypeChairs } from '../../../../context/TypeChairsProvider';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function ModalChooseChair({ chooseChair, handleCloseChoose, chooseTypeChair, chairChoose }) {
    const { typeChairs } = useContext(ContextTypeChairs);
    const showChooseChair = (type) => {      
        return chairChoose?.id_type_chair == type;
    };

    return (
        <div>
            <Dialog open={chooseChair} onClose={handleCloseChoose} PaperProps={{
                sx: {
                    width: "50vw", 
                    maxWidth: "none", 
                    borderRadius: 2, 
                    p: 2, 
                },
            }}>
                <DialogTitle>
                    Choose type chair
                </DialogTitle>
                <DialogContent>
                    <div className='flex justify-evenly items-center'>
                         {typeChairs.map((e,index) => (
                        <div key={index} onClick={() => chooseTypeChair(e.id)} className=''>
                            <div>
                                <img src={e.imgUrl} alt="" className={`w-14 h-14 cursor-pointer m-auto ${showChooseChair(e.id) ? "" : "opacity-50"}`} />
                            </div>
                            <p className={showChooseChair(e.id) ? "text-blue-700" : ""}>{e.name}</p>
                        </div>
                    ))}
                    </div>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseChoose} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalChooseChair;