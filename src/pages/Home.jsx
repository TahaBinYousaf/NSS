import React from 'react';
import { LatestCollection1 } from '../components/LatestCollection1';
import { LatestCollection2 } from '../components/LatestCollection2';
import { LatestCollection3 } from '../components/LatestCollection3';
import Image1 from '../assets/img2.jpeg';
import Categories from '../components/Categories';

const Home = () => {
	return (
		<div>
			<Categories></Categories>
			<LatestCollection1></LatestCollection1>
			<LatestCollection2></LatestCollection2>
			<LatestCollection3></LatestCollection3>
		</div>
	);
};

export default Home;
