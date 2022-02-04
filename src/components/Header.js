import {
  AppBar,
  Container,
  createTheme,
  makeStyles,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { CryptoState } from "../CryptoContext"

const useStyles = makeStyles(()=>({
  title: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  }
}))

const Header = () => {
const classes = useStyles();

const { currency, setCurrency } = CryptoState()
console.log(currency)

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
            className={classes.title}
            variant='h6'
            >
              Teramoto Shuri
            </Typography>
            {/* コイン選択 */}
            <Select
            variant='outlined'
            style={{
              width: 100,
              height: 40,
              marginRight: 15,
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={'JPY'} >JPY</MenuItem>
              <MenuItem value={'USD'} >USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
};

export default Header
