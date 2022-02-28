import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  makeStyles,
} from '@material-ui/core';
import Pagination from "@material-ui/lab/Pagination";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  CoinList1  } from '../config/api';
import { CryptoState } from '../CryptoContext';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

const fetchCoins = async () => {
  setLoading(true)
  const{ data }= await axios.get(CoinList1(currency));
  setCoins(data);
  setLoading(false);
}

console.log(coins);

useEffect(() => {
  fetchCoins();
},[currency]);



const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const handleSearch = () => {
  return coins.filter(
    (coin)=> (
    coin.name.includes(search)||
    coin.symbol.includes(search)
  ))
}

const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
  },
  Pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  }
}));

const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center",}}>
        <Typography
          variant='h4'
            style={{ margin: 18, }}
            >
              All Cryptos
            </Typography>

            <TextField label="Search" variant="outlined"
              style={{ marginBottom: 20, width: "100%" }}
              onChange={(e) => setSearch(e.target.value)}
            />

            <TableContainer component={Paper}>
              {
                loading ? (
                  <LinearProgress style={{ backgroundColor: "#00FFFF" }} />
                ): (
                  <Table>
                    <TableHead style={{ backgroundColor: "white"}}>
                      <TableRow>
                      {["コイン", "価格", "24時間ボリューム", "時価総額"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                      }}
                      key={head}
                      align={head === "コイン" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {handleSearch()
                      .slice((page - 1) * 10, (page - 1) * 10 + 10)
                      .map((row) => {
                        const profit = row.price_change_percentage_24h > 0;

                        return (

                          <TableRow
                          className={classes.row}
                          key={row.name}
                          >
                            <TableCell
                            component="th"
                            scope="row"
                              style={{
                                display: "flex",
                                gap: 15,
                              }}
                            >
                            <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{ display: "flex", flexDirection: "column"  }}
                            >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                            }}
                            >
                              {row.symbol}
                            </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>
                            </TableCell>
                            <TableCell align="right">
                              {symbol}{ " " }
                              {numberWithCommas(row.current_price.toFixed(2))}
                            </TableCell>
                            <TableCell
                            align="right"
                              style={{
                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                fontWeight: 500,
                              }}
                            >
                              <span>{profit && "+"} {row.price_change_percentage_24h}%</span>
                            </TableCell>
                            <TableCell
                            align="right"
                            >
                            {symbol}{ " " }
                            {numberWithCommas(
                              row.market_cap.toString().slice()
                              )}
                            </TableCell>
                          </TableRow>

                        )
                      })}
                    </TableBody>
                  </Table>
                )
              }
            </TableContainer>

            <Pagination
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            classes={{ ul: classes.Pagination }}
            count={(handleSearch()?.length / 10).toFixed(0)}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 150);
            }}
            />
      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable
