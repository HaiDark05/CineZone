import React, { useState } from 'react';

import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, InputAdornment
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { IoSearch } from "react-icons/io5";

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

function ModalChoose({ choose, handleClosed, dataChoose, typeChoose, handleSelect, getSelectedItems }) {

    const [searchObject, setSearchObject] = useState('');
    const isSelected = (item) => getSelectedItems.includes(item);

    const filtereddata = dataChoose.filter(element =>
        element.name.toLowerCase().includes(searchObject.toLowerCase())
    );

    return (
        <div>
            <Dialog open={choose} onClose={handleClosed} PaperProps={{
                sx: {
                    width: "60vw", // Đặt chiều rộng 90% viewport
                    maxWidth: "none", // Bỏ giới hạn max-width mặc định của MUI
                    borderRadius: 2, // Bo góc đẹp hơn
                    p: 2, // Padding cho nội dung
                },
            }}>
                <DialogTitle>
                    <div className="flex items-center justify-between gap-2">
                        <span>Choose{typeChoose}</span>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Enter keywords..."
                            value={searchObject}
                            onChange={(e) => setSearchObject(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IoSearch />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </DialogTitle>
                <DialogContent>
                    <Item>
                        <div className="flex gap-3 mt-3 flex-wrap">
                            {filtereddata?.map((element, index) => (
                                typeChoose == "categories" ?
                                    <button className={`text-white rounded-lg p-2 ${isSelected(element.id) ? "bg-fuchsia-700" : "bg-orange-700"}`} onClick={() => handleSelect(element.id, typeChoose)} key={index}>
                                        {element.name}
                                    </button> :
                                    <div
                                        onClick={() => handleSelect(element.id, typeChoose)}
                                        key={index}
                                        className={`flex flex-col items-center cursor-pointer ${isSelected(element.id)
                                                ? "text-purple-500"
                                                : "text-slate-700"
                                            }`}
                                    >
                                        <img
                                            className={`h-20 w-20 rounded-full border-4 ${isSelected(element.id)
                                                    ? " border-purple-500"
                                                    : "border-white"
                                                }`}
                                            src={element.imgUrl}
                                            alt=""
                                        />
                                        <span>{element.name}</span>
                                    </div>
                            ))}
                        </div>
                    </Item>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosed} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalChoose;