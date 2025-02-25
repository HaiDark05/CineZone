import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ModalDelete({openDeleted,setOpenDeleted,handleDelete}) {
    
    return (
        <React.Fragment>
        <Dialog
            open={openDeleted}
            onClose={() => setOpenDeleted(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Modal Delete"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure want to delete this ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDeleted(false)}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus sx={{color: "red"}}>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
    );
}

export default ModalDelete;