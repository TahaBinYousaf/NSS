import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { LatestCollection6Items } from './LatestCollection6Items';

export const AccessSubProducts6 = ({ category }) => {
	const {  animals } = useContext(ShopContext);
	const [related, setRelated] = useState([]);

	useEffect(() => {
		if (animals.length > 0) {
			const filteredProducts = animals.filter(
				(item) => item.category === category
			);
			setRelated(filteredProducts);
		}
	}, [animals, category]);

	return (
		<div className='my-15'>
			<div>
				<h1
					data-aos='fade-right'
					className=' text-3xl font-semibold sm:text-left'>
					RELATED <span className='text-black'>PRODUCTS</span>
				</h1>
			</div>
			<div
				data-aos='fade-right'
				className='grid mt-10  grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-4 gap-y-6'>
				{related.map((item) => (
					<LatestCollection6Items
						key={item._id}
						id={item._id}
						image={item.image}
						price={item.price}
						name={item.name}
						desc={item.description}
						address={item.address}
						date={item.date}
					/>
				))}
			</div>
		</div>
	);
};
