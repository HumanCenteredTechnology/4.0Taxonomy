import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";


const InfoSnippet = () => {

return (
    <Box flex={1} p={2} 
        sx={{   overflowY:'hidden',
                border: '2px solid grey',
                borderTopLeftRadius: '15px',
                borderRight: '0px',
                borderBottom: '0px',
                margin: "auto",
                display:{xs:"none", sm:"block"}
            }}
    >
        InfoSnippet
    </Box>
)

}

export default InfoSnippet;