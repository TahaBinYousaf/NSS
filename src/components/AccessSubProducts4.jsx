import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { LatestCollection4Items } from './LatestCollection4Items';

export const AccessSubProducts4 = ({ category }) => {
	const { services } = useContext(ShopContext);
	const [related, setRelated] = useState([]);

	useEffect(() => {
		if (services.length > 0) {
			const filteredProducts = services.filter(
				(item) => item.category === category
			);
			setRelated(filteredProducts);
		}
	}, [services, category]);

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
				className='grid mt-10  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6'>
				{related.map((item) => (
					<LatestCollection4Items
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
