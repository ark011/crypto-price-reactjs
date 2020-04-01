import React from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { round } from '../utils/format';

const options = {
	legend: {
		display: false
	},
	scales: {
		yAxes: [
			{
				id: 'y',
				display: false,
				gridLines: {
					display: false
				}
			}
		],
		xAxes: [
			{
				id: 'x',
				display: false,
				gridLines: {
					display: false
				}
			}
		]
	},
	responsive: true,
	maintainAspectRatio: false
};

function renderChart(priceline) {
	return {
		labels: Array(priceline.length).fill(0),
		datasets: [
			{
				backgroundColor: 'rgba(0,0,0,0)',
				borderColor: 'hsla(201, 100%, 50%, 1)',
				borderCapStyle: 'round',
				lineTension: 1,
				xAxisId: 'x',
				yAxisID: 'y',
				pointRadius: 0,
				pointHoverRadius: 6,
				fill: true,
				showLine: true,
				data: priceline
			}
		]
	};
}

const Coin = ({
	data: {
		sparkline_in_7d: { price: priceline },
		name,
		current_price,
		image,
		price_change_percentage_24h_in_currency,
		price_change_24h
	}
}) => {
	return (
		<div>
			<Card bg={'light'}>
				<CardHeader tag="h6">{name}</CardHeader>
				<CardBody>
					<CardTitle>
						<img src={image} alt="Coin" style={{ height: 50 }} />
						<span className="float-right" style={{ margin: 0 }}>
							${current_price} <br />{' '}
							<span
								className={price_change_percentage_24h_in_currency > 0 ? 'text-success' : 'text-danger'}
							>
								{round(price_change_percentage_24h_in_currency)}% ${round(price_change_24h)}
							</span>
						</span>
					</CardTitle>
					<CardText>
						<Line data={renderChart(priceline)} options={options} />
					</CardText>
				</CardBody>
			</Card>
		</div>
	);
};

export default Coin;
