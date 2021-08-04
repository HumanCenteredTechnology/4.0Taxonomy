import { createTheme } from "@material-ui/core/styles";

export default createTheme({ 
    overrides: {
        MuiTextField: {
            root: {
                fontSize: "5px"
            }
        }
    }
})