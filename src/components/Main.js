import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';

import '../index.css';
import blockchain from '../images/blockchain-icon.png';

import Coin from './Coin';

const URL = 'https://api.coingecko.com/api/v3/coins/markets?';
const params = {
	vs_currency: 'usd',
	order: 'market_cap_desc',
	per_page: 9,
	page: 1,
	sparkline: true,
	price_change_percentage: '24h'
};

const Main = () => {
	const [ cryptos, setCryptos ] = useState([]);
	const [ page, setPage ] = useState(1);
	const [ isLoading, setIsLoading ] = useState(false);

	const loadCoins = async () => {
		setIsLoading(true);
		try {
			params.page = page;
			const res = await axios.get(URL, {
				params: params
			});
			const data = res.data;
			setCryptos([ ...cryptos, ...data ]);
			setPage(page + 1);
		} catch (err) {
			console.log(err);
		}
		setIsLoading(false);
	};

	useEffect(
		() => {
			const fetchData = async () => {
				setIsLoading(true);
				try {
					const res = await axios.get(URL, {
						params: params
					});
					setCryptos(res.data);
					setPage(2);
				} catch (e) {
					console.log(e);
				}
				setIsLoading(false);
			};
			fetchData();
		},
		[ setIsLoading ]
	);

	const numberOfRows = Math.ceil(cryptos.length / 3);

	return (
		<div>
			<div className="container">
				<div className="row">
					<img src={blockchain} alt="logo" height={75} style={{ marginTop: 5 }} />
					<h1 className="font-weight-normal" style={{ marginTop: 25, marginLeft: 10 }}>
						Crypto currencies
					</h1>
				</div>

				{Array(numberOfRows).fill().map((_, rowIndex) => (
					<Row key={rowIndex} style={{ marginTop: 20 }}>
						{cryptos.slice(rowIndex * 3, rowIndex * 3 + 3).map((coin) => (
							<Col xs="12" sm="4" key={coin.id}>
								<Coin data={coin} />
							</Col>
						))}
					</Row>
				))}
			</div>

			<div className="container">
				{
					<div className="text-center" style={{ marginTop: 30 }}>
						<button onClick={loadCoins} className={'button is-primary'} style={{ marginBottom: 15 }}>
							Show More Coins
						</button>
					</div>
				}
			</div>

			<div className="text-center">-- percetange change & price change are calculated within 24hr period --</div>
		</div>
	);
};

export default Main;
