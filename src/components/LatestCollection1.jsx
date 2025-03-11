import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { NavLink } from 'react-router-dom';
import { LatestCollection1Items } from './LatestCollection1Items';

export const LatestCollection1 = () => {
	const { mobiles } = useContext(ShopContext);
	const [premimumProducts, setPremimumProducts] = useState([]);

	useEffect(() => {
		if (Array.isArray(mobiles) && mobiles.length > 0) {
			setPremimumProducts(mobiles.slice(0, 4));
		}
	}, [mobiles]);

	return (
		<div className='my-10'>
			<div className='flex flex-col px-10 sm:gap-0 gap-5 sm:flex-row sm:justify-between items-center sm:items-start'>
				<h1
					data-aos='fade-right'
					className='text-3xl font-semibold text-center sm:text-left'>
					ITEMS FOR SALE
				</h1>
				<NavLink to='/collection'>
					<button
						data-aos='fade-left'
						className='cursor-pointer px-8 py-3 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110'>
						VIEW ALL
					</button>
				</NavLink>
			</div>

			<div className='mt-[80px] sm:mt-8 mb-5 flex flex-wrap gap-4 justify-center px-4 sm:px-0'>
				{premimumProducts.map((item, index) => (
					<div
						data-aos='fade-right'
						key={index}
						className='w-full sm:w-[48%] md:w-[31%] lg:w-[23%] pb-2 bg-white rounded-lg'>
						<LatestCollection1Items
							id={item._id}
							image={item.image}
							price={item.price}
							name={item.name}
							desc={item.description}
							address={item.address}
							date={item.date}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
